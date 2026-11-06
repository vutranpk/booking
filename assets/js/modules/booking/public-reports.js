(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const state = { month: new Date(new Date().getFullYear(), new Date().getMonth(), 1), rows: [], selectedTech: 'all', requestId: 0, detailRequestId: 0 };
  const pad = (n) => String(n).padStart(2, '0');
  const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dateISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const dateLabel = (value) => {
    if (!value) return 'Chưa cập nhật';
    const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(year, month - 1, day));
  };
  const monthLabel = (date) => new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(date);
  const timeLabel = (value) => value ? String(value).slice(0, 5) : '';
  const safeAvatar = (value) => {
    const url = String(value || '').trim();
    return url.startsWith('https://') || /^data:image\/(png|jpeg|webp|gif|avif);base64,/i.test(url) ? url : '';
  };
  const initials = (name) => String(name || '?').trim().split(/\s+/).slice(-2).map((part) => part[0] || '').join('').toUpperCase();
  const avatar = (name, url, size = 'h-7 w-7') => safeAvatar(url)
    ? `<span aria-label="Ảnh ${escapeHtml(name)}" class="${size} relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-[9px] font-bold text-slate-600">${escapeHtml(initials(name))}<img src="${escapeHtml(safeAvatar(url))}" alt="" loading="lazy" class="absolute inset-0 h-full w-full rounded-full border border-slate-200 object-cover" onerror="this.remove()"></span>`
    : `<span aria-hidden="true" class="${size} grid shrink-0 place-items-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600">${escapeHtml(initials(name))}</span>`;
  const isBooking = (row) => !!row.booking_date && !!row.status;
  const isSameDay = (row, day) => row.booking_date <= day && (row.end_date || row.booking_date) >= day;

  function getEngineers() {
    return [...new Map(state.rows.map((row) => [row.tech_id, { id: row.tech_id, name: row.engineer_name, avatar: row.engineer_avatar }])).values()]
      .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  function getFilteredRows() {
    return state.rows.filter(isBooking).filter((row) => state.selectedTech === 'all' || row.tech_id === state.selectedTech);
  }

  function showError(message) {
    $('report-message').textContent = message;
    $('report-message').className = 'min-h-4 text-center text-[11px] text-rose-700';
    $('engineer-filters').innerHTML = '';
    $('calendar-grid').innerHTML = `<div class="col-span-7 p-5 text-center text-sm text-rose-700">${escapeHtml(message)}</div>`;
  }

  function renderEngineerFilters(engineers, visibleRows) {
    const filters = $('engineer-filters');
    if (!engineers.length) {
      filters.innerHTML = '<span class="text-xs text-slate-500">Chưa có kỹ sư đang hoạt động.</span>';
      return;
    }
    const allButton = `<button type="button" data-tech-id="all" aria-pressed="${state.selectedTech === 'all'}" class="shrink-0 rounded-full px-3.5 py-2 text-[10px] font-bold transition ${state.selectedTech === 'all' ? 'bg-[#213664] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">Tất cả kỹ sư</button>`;
    const engineerButtons = engineers.map((engineer) => {
      const active = state.selectedTech === engineer.id;
      const shiftCount = visibleRows.filter((row) => row.tech_id === engineer.id).length;
      return `<button type="button" data-tech-id="${escapeHtml(engineer.id)}" aria-label="${escapeHtml(engineer.name)} · ${shiftCount} ca" aria-pressed="${active}" title="${escapeHtml(engineer.name)} · ${shiftCount} ca" class="grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${active ? 'ring-2 ring-blue-400 ring-offset-2' : 'opacity-90 hover:opacity-100'}">${avatar(engineer.name, engineer.avatar, 'h-10 w-10')}</button>`;
    }).join('');
    filters.innerHTML = allButton + engineerButtons;
    filters.querySelectorAll('[data-tech-id]').forEach((button) => button.addEventListener('click', () => {
      state.selectedTech = button.dataset.techId;
      render();
    }));
  }

  function statusBadge(status) {
    const approved = status === 'APPROVED';
    return `<span class="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${approved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}"><span class="h-1.5 w-1.5 rounded-full ${approved ? 'bg-emerald-600' : 'bg-amber-500'}"></span>${approved ? 'Đã duyệt' : 'Chờ duyệt'}</span>`;
  }

  function openDialog() {
    const dialog = $("schedule-detail-dialog");
    if (!dialog.open) dialog.showModal();
  }

  async function openEventDetail(row) {
    const requestId = ++state.detailRequestId;
    $('detail-title').textContent = row.work_title || 'Chi tiết công việc';
    $('detail-subtitle').textContent = `${row.engineer_name} · ${dateLabel(row.booking_date)}`;
    $('detail-content').innerHTML = '<p role="status" class="rounded-xl bg-slate-50 px-3 py-4 text-center text-sm text-slate-500">Đang tải chi tiết ca…</p>';
    openDialog();
    try {
      const client = window.SupabaseConfig?.getClient();
      if (!client) throw new Error('Không kết nối được Supabase.');
      const { data, error } = await client.rpc('get_public_engineer_booking_detail', { p_booking_id: row.booking_id });
      if (requestId !== state.detailRequestId) return;
      if (error) throw error;
      const detail = Array.isArray(data) ? data[0] : data;
      if (!detail) throw new Error('Ca này không còn khả dụng.');
      $('detail-title').textContent = detail.work_title || row.work_title || 'Ca làm việc';
      $('detail-subtitle').textContent = `${detail.engineer_name} · ${dateLabel(detail.booking_date)}`;
      $('detail-content').innerHTML = `<div class="space-y-3 text-sm">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <section class="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
            <h3 class="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Kỹ sư phụ trách</h3>
            <div class="flex min-w-0 items-center gap-3">
              ${avatar(detail.engineer_name, detail.engineer_avatar, 'h-10 w-10')}
              <strong class="min-w-0 truncate text-xs text-slate-900">${escapeHtml(detail.engineer_name)}</strong>
            </div>
          </section>
          <section class="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5">
            <div class="mb-2.5 flex items-center justify-between gap-2"><h3 class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Thời gian thực hiện</h3>${statusBadge(detail.status)}</div>
            <div class="px-0.5">
              <p class="font-bold text-slate-900">${dateLabel(detail.booking_date)}${detail.end_date && detail.end_date !== detail.booking_date ? ` → ${dateLabel(detail.end_date)}` : ''}</p>
              <p class="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-600">${timeLabel(detail.start_time) || 'Chưa cập nhật'}${detail.end_time ? `–${timeLabel(detail.end_time)}` : ''}</p>
            </div>
          </section>
        </div>
        <div class="space-y-2 px-1 py-1.5 text-xs">
          <p class="flex gap-2"><span class="shrink-0 font-semibold text-slate-500">Địa điểm:</span><span class="break-words font-medium text-slate-800">${escapeHtml(detail.work_location || 'Chưa cập nhật')}</span></p>
        </div>
        <section class="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
          <h3 class="text-xs font-bold text-slate-700">Ghi chú công việc</h3>
          <p class="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-slate-600">${escapeHtml(detail.work_notes || 'Không có ghi chú')}</p>
        </section>
      </div>`;
    } catch (error) {
      if (requestId === state.detailRequestId) {
        const message = error?.code === 'PGRST202' || /schema cache|could not find the function/i.test(error?.message || '')
          ? 'Cơ sở dữ liệu chưa có RPC chi tiết lịch. Hãy chạy migration public_engineer_schedule_monthly_details.'
          : 'Không tải được chi tiết ca. Hãy kiểm tra kết nối rồi thử lại.';
        $('detail-content').innerHTML = `<p role="alert" class="rounded-xl bg-rose-50 px-3 py-3 text-sm text-rose-700">${escapeHtml(message)}</p>`;
      }
    }
  }
  function openDayDetails(day, dayRows) {
    if (!dayRows.length) return;
    if (dayRows.length === 1) return openEventDetail(dayRows[0]);
    $('detail-title').textContent = `Lịch ngày ${dateLabel(day)}`;
    $('detail-subtitle').textContent = `${dayRows.length} ca làm việc`;
    $('detail-content').innerHTML = `<div class="space-y-2">${dayRows.map((row, index) => `<button type="button" data-event-index="${index}" class="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">${avatar(row.engineer_name, row.engineer_avatar, 'h-9 w-9')}<span class="min-w-0 flex-1"><span class="block truncate text-sm font-bold">${escapeHtml(row.work_title || 'Ca làm việc')}</span><span class="mt-1 block text-[11px] text-slate-500">${escapeHtml(row.engineer_name)} · ${timeLabel(row.start_time)}${row.end_time ? `–${timeLabel(row.end_time)}` : ''}</span></span>${statusBadge(row.status)}</button>`).join('')}</div>`;
    $('detail-content').querySelectorAll('[data-event-index]').forEach((button) => button.addEventListener('click', () => openEventDetail(dayRows[Number(button.dataset.eventIndex)])));
    openDialog();
  }

  function renderCalendar(engineers, visibleRows) {
    const grid = $('calendar-grid');
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const count = monthEnd(state.month).getDate();
    const totalCells = Math.ceil((offset + count) / 7) * 7;
    const today = dateISO(new Date());
    $('month-label').textContent = monthLabel(state.month);

    grid.innerHTML = Array.from({ length: totalCells }, (_, cell) => {
      const dayNumber = cell - offset + 1;
      const date = new Date(year, month, dayNumber);
      const day = dateISO(date);
      const inMonth = dayNumber >= 1 && dayNumber <= count;
      const dayRows = inMonth ? visibleRows.filter((row) => isSameDay(row, day)).sort((a, b) => String(a.start_time).localeCompare(String(b.start_time))) : [];
      const isToday = inMonth && day === today;
      const dateStyle = isToday ? 'bg-blue-600 text-white' : (inMonth ? 'text-slate-800' : 'text-slate-300');
      const eventDots = dayRows.slice(0, 4).map((row) => `<span title="${row.status === 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'}" class="h-1.5 w-1.5 rounded-full ${row.status === 'APPROVED' ? 'bg-emerald-600' : 'bg-amber-500'}"></span>`).join('');
      const desktopEvents = dayRows.slice(0, 3).map((row) => {
        const approved = row.status === 'APPROVED';
        const tone = approved ? 'bg-[#34752b] hover:bg-[#2f6928]' : 'bg-[#f97316] hover:bg-[#ea6a0c]';
        const statusIcon = approved
          ? '<svg class="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 10 3.2 3.2L15.5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          : '<svg class="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m6 8 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        const time = `${timeLabel(row.start_time)}${row.end_time ? `–${timeLabel(row.end_time)}` : ''}`;
        return `<button type="button" data-event-id="${visibleRows.indexOf(row)}" aria-label="${escapeHtml(row.engineer_name)} · ${time} · ${approved ? 'Đã duyệt' : 'Chờ duyệt'} · Xem chi tiết" class="hidden h-8 w-full min-w-0 items-center gap-1.5 overflow-hidden rounded-full px-1.5 text-left text-white shadow-sm transition ${tone} sm:flex" title="${escapeHtml(row.engineer_name)} · ${time} · ${approved ? 'Đã duyệt' : 'Chờ duyệt'}"><span class="shrink-0 rounded-full bg-white p-0.5">${avatar(row.engineer_name, row.engineer_avatar, 'h-6 w-6')}</span><span class="min-w-0 flex-1 truncate text-[9px] font-bold">${escapeHtml(row.engineer_name)}</span><span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black/10">${statusIcon}</span></button>`;
      }).join('');
      const extra = dayRows.length > 3 ? `<button type="button" data-day-details="${day}" class="hidden pl-1 text-left text-[9px] font-semibold text-slate-600 hover:underline sm:block">+${dayRows.length - 3} ca</button>` : '';
      const mobileCount = dayRows.length ? `<span class="mt-0.5 flex items-center justify-center gap-0.5 sm:hidden">${eventDots}<span class="ml-0.5 text-[8px] font-bold text-slate-500">${dayRows.length}</span></span>` : '';
      return `<div class="relative min-h-[58px] border-b border-r border-slate-100 p-0.5 sm:min-h-[98px] sm:p-1.5 ${inMonth ? 'bg-white' : 'bg-slate-50'}">
        <button type="button" data-day="${day}" ${dayRows.length ? '' : 'disabled'} aria-label="${dayRows.length ? `${dayRows.length} ca ngày ${dateLabel(day)}` : dateLabel(day)}" class="flex h-7 min-w-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold disabled:cursor-default sm:h-7 sm:w-7 sm:justify-center ${dateStyle} ${isToday ? 'ring-2 ring-blue-100' : ''}">${inMonth ? dayNumber : `<span class="text-slate-300">${date.getDate()}</span>`}</button>
        ${mobileCount}
        <div class="mt-0.5 hidden space-y-0.5 sm:block">${desktopEvents}${extra}</div>
        ${dayRows.length ? `<button type="button" data-day-details="${day}" class="absolute inset-0 z-0 sm:hidden" aria-label="Xem ${dayRows.length} ca ngày ${dateLabel(day)}"></button>` : ''}
      </div>`;
    }).join('');
    grid.querySelectorAll('[data-event-id]').forEach((button) => button.addEventListener('click', () => openEventDetail(visibleRows[Number(button.dataset.eventId)])));
    grid.querySelectorAll('[data-day-details]').forEach((button) => button.addEventListener('click', () => {
      const day = button.dataset.dayDetails;
      openDayDetails(day, visibleRows.filter((row) => isSameDay(row, day)));
    }));
  }

  function render() {
    const engineers = getEngineers();
    const visibleRows = getFilteredRows();
    const selectedEngineers = state.selectedTech === 'all' ? engineers : engineers.filter((engineer) => engineer.id === state.selectedTech);
    const approved = visibleRows.filter((row) => row.status === 'APPROVED').length;
    const pending = visibleRows.filter((row) => row.status === 'PENDING').length;
    $('summary-engineers').textContent = String(selectedEngineers.length);
    $('summary-shifts').textContent = String(visibleRows.length);
    $('summary-approved').textContent = String(approved);
    $('summary-pending').textContent = String(pending);
    renderEngineerFilters(engineers, visibleRows);
    renderCalendar(engineers, visibleRows);
  }

  async function loadMonth() {
    const requestId = ++state.requestId;
    const from = dateISO(monthStart(state.month));
    const to = dateISO(monthEnd(state.month));
    $('month-label').textContent = monthLabel(state.month);
    $('report-message').textContent = 'Đang tải lịch…';
    $('report-message').className = 'min-h-4 text-center text-[11px] text-slate-500';
    try {
      const client = window.SupabaseConfig?.getClient();
      if (!client) throw new Error('Không kết nối được Supabase.');
      const { data, error } = await client.rpc('get_public_engineer_schedule_report', { p_from: from, p_to: to });
      if (requestId !== state.requestId) return;
      if (error) {
        if (error.code === 'PGRST202' || /schema cache|could not find the function/i.test(error.message || '')) throw new Error('Supabase chưa có migration chi tiết lịch tháng.');
        throw new Error('Không tải được dữ liệu lịch. Hãy thử lại sau.');
      }
      state.rows = Array.isArray(data) ? data : [];
      if (state.rows.length && !Object.prototype.hasOwnProperty.call(state.rows[0], 'booking_id')) throw new Error('Cần áp dụng migration chi tiết lịch tháng trên Supabase.');
      if (state.selectedTech !== 'all' && !state.rows.some((row) => row.tech_id === state.selectedTech)) state.selectedTech = 'all';
      render();
      $('report-message').textContent = `Đã tải lịch tháng ${monthLabel(state.month)}.`;
      $('report-message').className = 'min-h-4 text-center text-[11px] text-slate-500';
    } catch (error) {
      if (requestId === state.requestId) showError(error?.message || 'Không tải được dữ liệu lịch.');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('month-previous').addEventListener('click', () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1); loadMonth(); });
    $('month-next').addEventListener('click', () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1); loadMonth(); });
    $('month-today').addEventListener('click', () => { state.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1); state.selectedTech = 'all'; loadMonth(); });
    $('detail-close').addEventListener('click', () => $('schedule-detail-dialog').close());
    $('schedule-detail-dialog').addEventListener('click', (event) => { if (event.target === $('schedule-detail-dialog')) $('schedule-detail-dialog').close(); });
    loadMonth();
  });
})();
