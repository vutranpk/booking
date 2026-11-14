# ---------- Stage "test": kiểm tra cú pháp JS và đủ file (CI: docker build --target test .) ----------
FROM node:22-alpine AS test
WORKDIR /src
COPY index.html login.html public-reports.html reset-password.html template-report.html robots.txt ./
COPY assets ./assets
COPY images ./images
RUN find assets -name '*.js' -print -exec node --check {} \; \
 && for f in index.html login.html public-reports.html reset-password.html template-report.html images/favicon.png images/logo-full.png; do \
      test -s "$f" || { echo "Thiếu file: $f"; exit 1; }; \
    done \
 && echo "Kiểm tra OK"

# ---------- Stage chạy thật: nginx không chạy bằng root ----------
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx index.html login.html public-reports.html reset-password.html template-report.html robots.txt /usr/share/nginx/html/
COPY --chown=nginx:nginx assets /usr/share/nginx/html/assets
COPY --chown=nginx:nginx images /usr/share/nginx/html/images
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
