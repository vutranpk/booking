#!/bin/sh
# Chạy MỘT LẦN trên máy chủ (và chạy lại mỗi khi sửa vanhanh-deploy.sh):
#   sudo sh /opt/vanhanh/deploy/ci/setup-server.sh
set -eu
[ "$(id -u)" -eq 0 ] || { echo "Cần chạy bằng root/sudo"; exit 1; }
HERE="$(cd "$(dirname "$0")" && pwd)"
id gitlab-runner >/dev/null 2>&1 || { echo "Chưa có user gitlab-runner. Cài GitLab Runner trước."; exit 1; }
install -o root -g root -m 0755 "$HERE/vanhanh-deploy.sh" /usr/local/sbin/vanhanh-deploy
SUDOERS=/etc/sudoers.d/gitlab-runner-vanhanh
echo 'gitlab-runner ALL=(root) NOPASSWD: /usr/local/sbin/vanhanh-deploy' > "$SUDOERS.tmp"
chmod 0440 "$SUDOERS.tmp"
visudo -cf "$SUDOERS.tmp" >/dev/null
mv "$SUDOERS.tmp" "$SUDOERS"
rm -f /home/gitlab-runner/.bash_logout
echo "Đã cài /usr/local/sbin/vanhanh-deploy và quyền sudo cho gitlab-runner."
