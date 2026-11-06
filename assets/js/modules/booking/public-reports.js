(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const timeLabel = (value) => value ? String(value).slice(0, 5) : '';
  const state = { month: new Date(new Date().getFullYear(), new Date().getMonth(), 1), rows: [], selectedTech: 'all' };
  const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dateISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const dateLabel = (value) => {
    if (!value) return '';
    const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(year, month - 1, day));
  };
  const monthLabel = (date) => new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(date);
  const safeAvatar = (value) => {
    const url = String(value || '').trim();
    return url.startsWith('https://') || /^data:image\/(png|jpeg|webp|gif|avif);base64,/i.test(url) ? url : '';
  };
  const initials = (name) => String(name || '?').trim().split(/\s+/).slice(-2).map((part) => part[0] || '').join('').toUpperCase();
  const avatar = (name, url, size = 'h-11 w-11') => safeAvatar(url)
    ? `<span aria-label="Ảnh ${escapeHtml(name)}" class="${size} relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-xs font-bold text-slate-600">${escapeHtml(initials(name))}<img src="${escapeHtml(safeAvatar(url))}" alt="" loading="lazy" class="absolute inset-0 h-full w-full rounded-full border border-slate-200 object-cover" onerror="this.remove()"></span>`
    : `<span aria-hidden="true" class="${size} grid shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">${escapeHtml(initials(name))}</span>`;
  const isBooking = (row) => !!row.booking_date && !!row.status;

  function showError(message) {
    $('report-message').textContent = message;
    $('report-message').className = 'text-center text-xs text-rose-700';
    $('report-engineers').innerHTML = '<p class="p-3 text-sm text-slate-500">Chưa tải được danh sách kỹ sư.</p>';
    $('report-schedule').innerHTML = `<p class="p-5 text-sm text-rose-700">${escapeHtml(message)}</p>`;
  }

  function render() {
    const allRows = state.rows;
    const engineers = [...new Map(allRows.map((row) => [row.tech_id, { id: row.tech_id, name: row.engineer_name, avatar: row.engineer_avatar }])).values()]
      .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    const visibleRows = allRows.filter(isBooking);
    const filtered = state.selectedTech === 'all' ? visibleRows : visibleRows.filter((row) => row.tech_id === state.selectedTech);
    const filteredEngineers = state.selectedTech === 'all' ? engineers : engineers.filter((engineer) => engineer.id === state.selectedTech);
    const approved = filtered.filter((row) => row.status === 'APPROVED').length;
    const pending = filtered.filter((row) => row.status === 'PENDING').length;

    $('month-label').textContent = monthLabel(state.month);
    $('summary-engineers').textContent = String(filteredEngineers.length);
    $('summary-shifts').textContent = String(filtered.length);
    $('summary-approved').textContent = String(approved);
    $('summary-pending').textContent = String(pending);
    $('schedule-heading').textContent = state.selectedTech === 'all' ? 'Lịch các ca trong tháng' : `Lịch của ${filteredEngineers[0]?.name || 'kỹ sư'}`;
    $('engineer-filter-reset').classList.toggle('hidden', state.selectedTech === 'all');

    const engineerList = $('report-engineers');
    if (!engineers.length) {
      engineerList.innerHTML = '<p class="p-3 text-sm text-slate-500">Chưa có kỹ sư đang hoạt động.</p>';
    } else {
      engineerList.innerHTML = engineers.map((engineer) => {
        const shifts = visibleRows.filter((row) => row.tech_id === engineer.id);
        const active = state.selectedTech === engineer.id;
        return `<button type="button" data-tech-id="${escapeHtml(engineer.id)}" aria-pressed="${active}" class="flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition ${active ? 'border-blue-400 bg-blue-50 ring-1 ring-blue-200' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}">
          ${avatar(engineer.name, engineer.avatar)}
          <span class="min-w-0 flex-1"><span class="block truncate text-sm font-bold text-slate-800">${escapeHtml(engineer.name)}</span><span class="mt-0.5 block text-[11px] text-slate-500">${shifts.length} ca trong tháng</span></span>
          <span class="shrink-0 text-slate-400" aria-hidden="true">›</span>
        </button>`;
      }).join('');
      engineerList.querySelectorAll('[data-tech-id]').forEach((button) => button.addEventListener('click', () => {
        state.selectedTech = state.selectedTech === button.dataset.techId ? 'all' : button.dataset.techId;
        render();
      }));
    }

    const schedule = $('report-schedule');
    if (!filtered.length) {
      schedule.innerHTML = `<p class="p-5 text-sm text-slate-500">${state.selectedTech === 'all' ? 'Không có ca làm việc trong tháng này.' : 'Kỹ sư chưa có ca trong tháng này.'}</p>`;
      return;
    }
    filtered.sort((a, b) => a.booking_date.localeCompare(b.booking_date) || String(a.start_time).localeCompare(String(b.start_time)) || a.engineer_name.localeCompare(b.engineer_name, 'vi'));
    schedule.innerHTML = filtered.map((row) => {
      const dateRange = row.end_date && row.end_date !== row.booking_date ? `${dateLabel(row.booking_date)} – ${dateLabel(row.end_date)}` : dateLabel(row.booking_date);
      const approvedStatus = row.status === 'APPROVED';
      return `<article class="flex items-center gap-3 px-4 py-3.5 sm:px-5">
        ${avatar(row.engineer_name, row.engineer_avatar, 'h-10 w-10')}
        <div class="min-w-0 flex-1"><p class="truncate text-sm font-bold">${escapeHtml(row.engineer_name)}</p><p class="mt-1 text-xs text-slate-600">${dateRange} · ${timeLabel(row.start_time)}–${timeLabel(row.end_time)}</p></div>
        <span class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${approvedStatus ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${approvedStatus ? 'Đã duyệt' : 'Chờ duyệt'}</span>
      </article>`;
    }).join('');
  }

  async function loadMonth() {
    const from = dateISO(monthStart(state.month));
    const to = dateISO(monthEnd(state.month));
    $('month-label').textContent = monthLabel(state.month);
    $('report-message').textContent = 'Đang tải lịch…';
    $('report-message').className = 'text-center text-xs text-slate-500';
    try {
      const client = window.SupabaseConfig?.getClient();
      if (!client) throw new Error('Không kết nối được Supabase.');
      const { data, error } = await client.rpc('get_public_engineer_schedule_report', { p_from: from, p_to: to });
      if (error) {
        if (error.code === 'PGRST202' || /schema cache|could not find the function/i.test(error.message || '')) {
          throw new Error('Supabase chưa có hàm báo cáo. Cần áp dụng migration báo cáo lịch tháng.');
        }
        throw new Error('Không tải được dữ liệu lịch. Hãy thử lại sau.');
      }
      state.rows = Array.isArray(data) ? data : [];
      if (!state.rows.some((row) => row.tech_id === state.selectedTech)) state.selectedTech = 'all';
      render();
      $('report-message').textContent = `Đã tải dữ liệu tháng ${monthLabel(state.month)}.`;
      $('report-message').className = 'text-center text-xs text-slate-500';
    } catch (error) {
      showError(error?.message || 'Không tải được dữ liệu lịch.');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('month-previous').addEventListener('click', () => { state.month.setMonth(state.month.getMonth() - 1); loadMonth(); });
    $('month-next').addEventListener('click', () => { state.month.setMonth(state.month.getMonth() + 1); loadMonth(); });
    $('engineer-filter-reset').addEventListener('click', () => { state.selectedTech = 'all'; render(); });
    loadMonth();
  });
})();
