#!/bin/sh
# Script deploy dùng cho GitLab CI trên máy chủ 192.168.10.28.
# Cài bằng deploy/ci/setup-server.sh vào /usr/local/sbin/vanhanh-deploy (chủ sở hữu root).
#
#   vanhanh-deploy test   <thư-mục-build-CI> <commit>   build stage test
#   vanhanh-deploy deploy <commit>                       cập nhật code -> build -> chạy -> kiểm tra healthy
#   vanhanh-deploy rollback                              quay về image của lần deploy trước
set -eu

APP_DIR=/opt/vanhanh
BUILDS_ROOT=/home/gitlab-runner/builds
IMAGE=vanhanh-web
SERVICE=web
HEALTH_TIMEOUT=120

die() { echo "LỖI: $*" >&2; exit 1; }
log() { echo ">>> $*"; }
check_sha() { case "${1:-}" in ''|*[!0-9a-f]*) die "Mã commit không hợp lệ: '${1:-}'" ;; esac; }
dc() { docker compose --project-directory "$APP_DIR" -f "$APP_DIR/compose.yml" "$@"; }

wait_healthy() {
  waited=0
  while [ "$waited" -lt "$HEALTH_TIMEOUT" ]; do
    cid="$(dc ps -q "$SERVICE" 2>/dev/null || true)"
    st="none"
    [ -n "$cid" ] && st="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$cid" 2>/dev/null || echo none)"
    case "$st" in
      healthy)   log "$SERVICE: healthy"; return 0 ;;
      unhealthy) log "$SERVICE: unhealthy"; return 1 ;;
    esac
    sleep 3; waited=$((waited + 3))
    echo "    chờ healthy... (${waited}s, trạng thái: $st)"
  done
  return 1
}

cmd="${1:-}"
case "$cmd" in
  test)
    src="$(realpath "${2:-/nonexistent}" 2>/dev/null)" || die "Không thấy thư mục build"
    case "$src" in "$BUILDS_ROOT"/*) ;; *) die "Thư mục build phải nằm trong $BUILDS_ROOT" ;; esac
    check_sha "${3:-}"
    tag="$IMAGE:test-$3"
    rc=0
    docker build --target test -t "$tag" "$src" || rc=$?
    docker rmi "$tag" >/dev/null 2>&1 || true
    [ "$rc" -eq 0 ] || die "Test thất bại"
    log "Test OK"
    ;;

  deploy)
    check_sha "${2:-}"; sha="$2"
    [ -d "$APP_DIR/.git" ] || die "$APP_DIR chưa được cài (git clone lần đầu)."
    cd "$APP_DIR"
    log "Cập nhật mã nguồn lên commit $sha"
    git -C "$APP_DIR" fetch --quiet origin
    git -C "$APP_DIR" checkout --quiet --force --detach "$sha"
    docker image inspect "$IMAGE:latest" >/dev/null 2>&1 && docker tag "$IMAGE:latest" "$IMAGE:previous"
    log "Build image"
    dc build "$SERVICE"
    docker tag "$IMAGE:latest" "$IMAGE:$sha"
    log "Khởi động lại"
    dc up -d
    if wait_healthy; then
      docker image prune -f >/dev/null 2>&1 || true
      log "Deploy thành công: $sha"
    else
      dc logs "$SERVICE" --tail 40 || true
      if docker image inspect "$IMAGE:previous" >/dev/null 2>&1; then
        log "Không healthy, tự quay về image trước"
        docker tag "$IMAGE:previous" "$IMAGE:latest"
        dc up -d --no-build
        wait_healthy || true
      fi
      die "Deploy $sha thất bại (đã quay về bản trước nếu có)"
    fi
    ;;

  rollback)
    cd "$APP_DIR"
    docker image inspect "$IMAGE:previous" >/dev/null 2>&1 || die "Không có image bản trước"
    docker tag "$IMAGE:previous" "$IMAGE:latest"
    dc up -d --no-build
    wait_healthy || die "Bản trước cũng không healthy"
    log "Rollback xong"
    ;;

  *) echo "Cách dùng: $0 test <dir> <sha> | deploy <sha> | rollback" >&2; exit 2 ;;
esac
