// K-Workspace Service Worker (PWA & Push Notifications)
// Version: 20261127.02

const CACHE_NAME = 'k-workspace-v2';
const CORE_SHELL_URLS = [
  './',
  './index.html',
  './login.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(CORE_SHELL_URLS.map((u) => cache.add(u))))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ==========================================
// 1. SYSTEM PUSH NOTIFICATIONS (Web Push API)
// ==========================================
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (_) {
      data = { title: 'Thông Báo Ca Trực K-Workspace', body: event.data.text() };
    }
  }

  const title = data.title || 'Thông Báo Ca Trực K-Workspace';
  const options = {
    body: data.body || 'Bạn có thông tin cập nhật mới về lịch trực.',
    icon: data.icon || 'images/symbol.png',
    badge: data.badge || 'images/favicon.png',
    tag: data.tag || 'kcoffee-shift-' + Date.now(),
    renotify: true,
    vibrate: [200, 100, 200],
    data: {
      url: data.url || 'index.html',
      booking_id: data.booking_id || null,
      timestamp: Date.now()
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ==========================================
// 2. CLIENT MESSAGING (In-App & Realtime Bridge)
// ==========================================
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    const notifOptions = {
      icon: 'images/symbol.png',
      badge: 'images/favicon.png',
      vibrate: [200, 100, 200],
      ...options
    };
    self.registration.showNotification(title || 'K-Workspace', notifOptions);
  } else if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ==========================================
// 3. NOTIFICATION CLICK HANDLING
// Khi kỹ sư chạm vào thông báo trên điện thoại
// ==========================================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const notifData = event.notification.data || {};
  const targetUrl = notifData.url || 'index.html';
  const bookingId = notifData.booking_id;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 1. Nếu có tab/app đang mở, focus vào tab đó và mở modal chi tiết task
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if (bookingId) {
            client.postMessage({ type: 'OPEN_BOOKING_MODAL', bookingId });
          }
          return;
        }
      }

      // 2. Nếu chưa mở tab nào, mở cửa sổ mới
      if (clients.openWindow) {
        const finalUrl = bookingId ? `${targetUrl}?booking=${encodeURIComponent(bookingId)}` : targetUrl;
        return clients.openWindow(finalUrl);
      }
    })
  );
});

// ==========================================
// 4. NETWORK-FIRST SHELL CACHE (PWA WebAPK & Offline Resilience)
// ==========================================
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (_) {
    return;
  }

  // Bypass cross-origin APIs (Supabase REST/Realtime, CDNs, chrome-extension)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(req, { ignoreSearch: true });
        if (cached) return cached;
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return Response.error();
      })
  );
});

