(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const state = {
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    rows: [],
    detailsByBookingId: new Map(),
    selectedTech: 'all',
    viewMode: 'grid',
    requestId: 0,
    detailRequestId: 0
  };
  const pad = (n) => String(n).padStart(2, '0');
  const monthStart = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dateISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const dateLabel = (value) => {
    if (!value) return 'Chưa cập nhật';
    const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(year, month - 1, day));
  };
  const monthLabel = (date) => `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
  const timeLabel = (value) => value ? String(value).slice(0, 5) : '';
  const isBooking = (row) => Boolean(row && row.booking_id && row.booking_date && row.status);
  const isSameDay = (row, day) => {
    const bStart = String(row.booking_date || '').slice(0, 10);
    const bEnd = String(row.end_date || row.booking_date || '').slice(0, 10);
    return bStart <= day && bEnd >= day;
  };

  const getFallbackAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'KS')}&background=1D4ED8&color=fff&bold=true`;

  function getEngineers() {
    const map = new Map();
    state.rows.forEach((row) => {
      if (row && row.tech_id && !map.has(row.tech_id)) {
        const engName = row.engineer_name || row.tech_id;
        map.set(row.tech_id, {
          id: row.tech_id,
          name: engName,
          avatar: row.engineer_avatar || getFallbackAvatar(engName)
        });
      }
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  function getAllUniqueBookings() {
    const map = new Map();
    state.rows.filter(isBooking).forEach((row) => {
      if (!map.has(row.booking_id)) {
        const cachedDetail = state.detailsByBookingId.get(row.booking_id);
        map.set(row.booking_id, {
          ...row,
          booking_date: String(row.booking_date || '').slice(0, 10),
          end_date: String(row.end_date || row.booking_date || '').slice(0, 10),
          work_title: row.work_title || cachedDetail?.work_title || '',
          work_location: row.work_location || cachedDetail?.work_location || '',
          work_notes: row.work_notes || cachedDetail?.work_notes || ''
        });
      }
    });
    return [...map.values()];
  }

  function getFilteredRows() {
    return getAllUniqueBookings().filter((row) => state.selectedTech === 'all' || row.tech_id === state.selectedTech);
  }

  function showError(message) {
    $('report-message').textContent = message;
    $('report-message').className = 'text-xs font-medium text-rose-700';
    $('engineer-filters').innerHTML = '';
    $('calendar-grid').innerHTML = `<div class="col-span-7 p-6 text-center text-xs text-rose-700">${escapeHtml(message)}</div>`;
  }

  function renderEngineerFilters(engineers, allMonthBookings) {
    const filters = $('engineer-filters');
    if (!engineers.length) {
      filters.innerHTML = '<span class="text-xs text-slate-500">Chưa có kỹ sư đang hoạt động.</span>';
      return;
    }
    const isAll = state.selectedTech === 'all';
    const allButton = `
      <button type="button" data-tech-id="all" aria-pressed="${isAll}"
              class="hidden lg:inline-flex h-9 px-3.5 rounded-full text-xs font-bold font-condensed uppercase tracking-wider transition-all items-center gap-1.5 shrink-0 cursor-pointer border ${
                isAll
                  ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200/90'
              }"
              title="Xem lịch tất cả kỹ sư">
        <span>Tất cả</span>
        <span class="px-1.5 py-0.5 rounded-full text-[10px] leading-none ${isAll ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">${allMonthBookings.length}</span>
      </button>
    `;
    const engineerButtons = engineers.map((engineer) => {
      const active = state.selectedTech === engineer.id;
      const isDimmed = !isAll && !active;
      const shiftCount = allMonthBookings.filter((row) => row.tech_id === engineer.id).length;
      const shortName = String(engineer.name || '').trim().split(/\s+/).slice(-2).join(' ');
      const avatarSrc = engineer.avatar || getFallbackAvatar(engineer.name);
      const fallbackSrc = getFallbackAvatar(engineer.name);
      return `
        <button type="button" data-tech-id="${escapeHtml(engineer.id)}"
                aria-label="${escapeHtml(engineer.name)} · ${shiftCount} ca"
                aria-pressed="${active}"
                title="${escapeHtml(engineer.name)} (${shiftCount} ca trong tháng) • Nhấn để lọc"
                class="relative w-10 h-10 lg:w-auto lg:h-9 p-0.5 lg:pl-1.5 lg:pr-3 lg:py-0 rounded-full transition-all shrink-0 inline-flex items-center justify-center lg:justify-start gap-2 cursor-pointer border ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600 ring-2 ring-brand-600 ring-offset-1 lg:ring-0 shadow-xs'
                    : isDimmed
                      ? 'bg-white text-slate-600 border-slate-200/80 opacity-50 hover:opacity-90 lg:opacity-100 lg:hover:bg-slate-100'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200/90 shadow-2xs'
                }">
          <img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(engineer.name)}"
               onerror="this.onerror=null;this.src='${escapeHtml(fallbackSrc)}'"
               class="w-9 h-9 lg:w-6 lg:h-6 rounded-full object-cover shrink-0 ${active ? 'ring-1 ring-white/40' : ''}" />
          <span class="hidden lg:inline text-xs font-semibold whitespace-nowrap">${escapeHtml(shortName)}</span>
          <span class="hidden lg:inline-flex px-1.5 py-0.5 rounded-full text-[10px] font-condensed font-bold leading-none ${
            active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }">${shiftCount}</span>
          <span class="lg:hidden absolute -bottom-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-condensed font-bold leading-none flex items-center justify-center border border-white shadow-2xs ${
            active
              ? 'bg-accent-600 text-white'
              : shiftCount > 0
                ? 'bg-brand-600 text-white'
                : 'bg-slate-200 text-slate-600'
          }">${shiftCount}</span>
        </button>
      `;
    }).join('');
    filters.innerHTML = allButton + engineerButtons;
    filters.querySelectorAll('[data-tech-id]').forEach((button) => button.addEventListener('click', () => {
      const clickedId = button.dataset.techId;
      state.selectedTech = (clickedId !== 'all' && state.selectedTech === clickedId) ? 'all' : clickedId;
      render();
    }));
  }

  function statusBadge(status) {
    const approved = status === 'APPROVED';
    return `<span class="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-condensed uppercase tracking-wider font-bold border ${approved ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-amber-50 text-amber-700 border-amber-200'}"><span class="h-1.5 w-1.5 rounded-full ${approved ? 'bg-accent-600' : 'bg-amber-500'}"></span>${approved ? 'Đã duyệt' : 'Chờ duyệt'}</span>`;
  }

  function openDialog() {
    const dialog = $('schedule-detail-dialog');
    if (!dialog.open) dialog.showModal();
  }

  async function openEventDetail(row) {
    if (!row) return;
    const requestId = ++state.detailRequestId;
    const bStart = String(row.booking_date || '').slice(0, 10);
    const bEnd = String(row.end_date || row.booking_date || '').slice(0, 10);
    $('detail-title').textContent = row.work_title || 'Chi tiết ca trực';
    $('detail-subtitle').textContent = `${row.engineer_name} · ${dateLabel(bStart)}${bEnd !== bStart ? ` → ${dateLabel(bEnd)}` : ''}`;
    $('detail-content').innerHTML = '<p role="status" class="rounded-xl bg-slate-50 px-3 py-4 text-center text-xs text-slate-500">Đang tải chi tiết ca…</p>';
    openDialog();
    try {
      let detail = state.detailsByBookingId.get(row.booking_id);
      if (!detail) {
        const client = window.SupabaseConfig?.getClient();
        if (!client) throw new Error('Không kết nối được Supabase.');
        const { data, error } = await client.rpc('get_public_engineer_booking_detail', { p_booking_id: row.booking_id });
        if (requestId !== state.detailRequestId) return;
        if (error) throw error;
        detail = Array.isArray(data) ? data[0] : data;
        if (detail) state.detailsByBookingId.set(row.booking_id, detail);
      }
      if (!detail) throw new Error('Ca này không còn khả dụng.');
      const dStart = String(detail.booking_date || bStart).slice(0, 10);
      const dEnd = String(detail.end_date || dStart).slice(0, 10);
      $('detail-title').textContent = detail.work_title || row.work_title || 'Ca làm việc';
      $('detail-subtitle').textContent = `${detail.engineer_name} · ${dateLabel(dStart)}${dEnd !== dStart ? ` → ${dateLabel(dEnd)}` : ''}`;
      $('detail-content').innerHTML = `<div class="divide-y divide-slate-100 text-xs">
        <div class="grid grid-cols-1 gap-4 pb-3.5 sm:grid-cols-2">
          <section>
            <h3 class="font-condensed mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Kỹ sư phụ trách</h3>
            <p class="text-sm font-bold text-slate-900">${escapeHtml(detail.engineer_name)}</p>
          </section>
          <section>
            <div class="mb-1.5 flex items-center justify-between gap-2"><h3 class="font-condensed text-[11px] font-bold uppercase tracking-wider text-slate-400">Thời gian thực hiện</h3>${statusBadge(detail.status)}</div>
            <p class="font-condensed text-sm font-bold text-slate-900">${dateLabel(dStart)}${dEnd !== dStart ? ` → ${dateLabel(dEnd)}` : ''}</p>
            ${timeLabel(detail.start_time) ? `<p class="mt-1 text-xs text-slate-500">${timeLabel(detail.start_time)}${detail.end_time ? ` – ${timeLabel(detail.end_time)}` : ''}</p>` : ''}
          </section>
        </div>
        <div class="py-3">
          <span class="font-condensed text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Địa điểm thực hiện</span>
          <p class="break-words font-semibold text-slate-800">${escapeHtml(detail.work_location || 'Chưa cập nhật')}</p>
        </div>
        <section class="pt-3">
          <h3 class="font-condensed text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Ghi chú công việc</h3>
          <p class="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-600">${escapeHtml(detail.work_notes || 'Không có ghi chú')}</p>
        </section>
      </div>`;
    } catch (error) {
      if (requestId === state.detailRequestId) {
        const message = error?.code === 'PGRST202' || /schema cache|could not find the function/i.test(error?.message || '')
          ? 'Cơ sở dữ liệu chưa có RPC chi tiết lịch. Hãy chạy migration public_engineer_schedule_monthly_details.'
          : 'Không tải được chi tiết ca. Hãy kiểm tra kết nối rồi thử lại.';
        $('detail-content').innerHTML = `<p role="alert" class="rounded-xl bg-rose-50 px-3 py-3 text-xs text-rose-700">${escapeHtml(message)}</p>`;
      }
    }
  }

  function setViewMode(mode) {
    state.viewMode = mode === 'list' ? 'list' : 'grid';
    const btnGrid = $('btn-pub-view-grid');
    const btnList = $('btn-pub-view-list');
    const matrixWrap = $('public-calendar-matrix-wrap');
    if (btnGrid && btnList) {
      if (state.viewMode === 'list') {
        btnList.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold font-condensed uppercase tracking-wider bg-white text-slate-900 shadow-2xs transition-all cursor-pointer flex items-center gap-1';
        btnGrid.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold font-condensed uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1';
      } else {
        btnGrid.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold font-condensed uppercase tracking-wider bg-white text-slate-900 shadow-2xs transition-all cursor-pointer flex items-center gap-1';
        btnList.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold font-condensed uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1';
      }
    }
    if (matrixWrap) {
      matrixWrap.classList.toggle('hidden', state.viewMode === 'list');
    }
    renderAgenda(getFilteredRows());
  }

  // FULL MONTH CALENDAR MATRIX WITH MULTI-DAY CONTINUOUS LANE RIBBONS (100% MATCH WITH INDEX.HTML, NO AVATARS)
  function renderCalendar(engineers, visibleRows) {
    const grid = $('calendar-grid');
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = monthEnd(state.month).getDate();
    const todayStr = dateISO(new Date());

    $('month-label').textContent = monthLabel(state.month);

    // Monday-based offset (Monday is 0, Sunday is 6)
    const startDayOfWeek = firstDayOfMonth.getDay();
    const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const gridStartDate = new Date(year, month, 1 - startOffset);
    const numWeeks = Math.ceil((startOffset + daysInMonth) / 7);
    const totalDays = numWeeks * 7;

    const allDates = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(gridStartDate);
      d.setDate(gridStartDate.getDate() + i);
      const dStr = dateISO(d);
      allDates.push({
        dateObj: d,
        dateStr: dStr,
        dayNum: d.getDate(),
        monthNum: d.getMonth() + 1,
        isSunday: d.getDay() === 0,
        isToday: dStr === todayStr,
        isCurrentMonth: d.getMonth() === month,
        globalIndex: i
      });
    }

    let html = '';

    for (let w = 0; w < numWeeks; w++) {
      const weekDays = allDates.slice(w * 7, (w + 1) * 7);
      const weekDateStrs = weekDays.map((d) => d.dateStr);

      const weekBookings = visibleRows.filter((b) => {
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;
        return bStart <= weekDateStrs[6] && bEnd >= weekDateStrs[0];
      });

      weekBookings.sort((a, b) => {
        const aStart = a.booking_date;
        const aEnd = a.end_date || a.booking_date;
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;
        const aDuration = (new Date(aEnd) - new Date(aStart)) / 86400000;
        const bDuration = (new Date(bEnd) - new Date(bStart)) / 86400000;
        if (bDuration !== aDuration) return bDuration - aDuration;
        return aStart.localeCompare(bStart);
      });

      const laneOccupancy = [];
      const bookingLaneMap = new Map();

      weekBookings.forEach((b) => {
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;
        const coveredDayIndices = [];
        weekDateStrs.forEach((dStr, idx) => {
          if (bStart <= dStr && bEnd >= dStr) coveredDayIndices.push(idx);
        });

        let laneIndex = 0;
        while (true) {
          if (!laneOccupancy[laneIndex]) laneOccupancy[laneIndex] = new Set();
          const hasConflict = coveredDayIndices.some((dayIdx) => laneOccupancy[laneIndex].has(dayIdx));
          if (!hasConflict) {
            coveredDayIndices.forEach((dayIdx) => laneOccupancy[laneIndex].add(dayIdx));
            bookingLaneMap.set(b.booking_id, laneIndex);
            break;
          }
          laneIndex++;
        }
      });

      const maxLanes = Math.max(laneOccupancy.length, 1);

      weekDays.forEach((dayInfo, dayIdx) => {
        const dateStr = dayInfo.dateStr;
        const isToday = dayInfo.isToday;
        const isSunday = dayInfo.isSunday;
        const dayNum = dayInfo.dayNum;
        const monthNum = dayInfo.monthNum;
        const showMonthTag = dayInfo.globalIndex === 0 || dayNum === 1;

        const dayBookings = weekBookings.filter((b) => isSameDay(b, dateStr));
        const laneToBooking = new Map();
        dayBookings.forEach((b) => {
          const lane = bookingLaneMap.get(b.booking_id);
          if (lane !== undefined) laneToBooking.set(lane, b);
        });

        let cellMaxLane = -1;
        for (let l = 0; l < maxLanes; l++) {
          if (laneToBooking.has(l)) cellMaxLane = l;
        }

        html += `
          <div class="min-h-[78px] sm:min-h-[126px] p-1 sm:p-1.5 flex flex-col justify-start gap-0.5 sm:gap-1 transition-all relative ${
            isToday
              ? 'bg-brand-50/25 ring-1 ring-inset ring-brand-400 z-10'
              : dayInfo.isCurrentMonth
                ? 'bg-white hover:bg-slate-50/70'
                : 'bg-slate-50/40'
          }">
            <!-- Date Number (Top-left aligned, matching index.html) -->
            <div class="h-5 sm:h-6 flex items-center justify-between px-0.5 select-none mb-0.5">
              ${isToday ? `
                <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold font-condensed shadow-2xs">
                  ${dayNum}
                </span>
              ` : `
                <span class="px-1 rounded-md flex items-center justify-center text-[11px] sm:text-xs font-condensed ${
                  !dayInfo.isCurrentMonth
                    ? 'text-slate-300 font-normal'
                    : isSunday
                      ? 'text-burgundy-800 font-bold'
                      : 'text-slate-700 font-bold'
                }">
                  ${showMonthTag ? `<span class="sm:hidden">${dayNum}/${monthNum}</span><span class="hidden sm:inline">${dayNum} thg ${monthNum}</span>` : dayNum}
                </span>
              `}
            </div>

            <!-- Shifts Container with Fixed Height Lanes (Continuous Multi-Day Ribbons, No Avatars) -->
            <div class="flex-1 flex flex-col gap-1 relative">
              ${cellMaxLane >= 0 ? Array.from({ length: cellMaxLane + 1 }).map((_, laneIdx) => {
                const b = laneToBooking.get(laneIdx);
                if (!b) {
                  return `<div class="h-6 sm:h-8 w-full invisible pointer-events-none"></div>`;
                }

                const isApproved = b.status === 'APPROVED';
                const bStart = b.booking_date;
                const bEnd = b.end_date || b.booking_date;
                const isStart = bStart === dateStr;
                const isEnd = bEnd === dateStr;
                const isSingleDay = isStart && isEnd;
                const techShortName = String(b.engineer_name || b.tech_id || '').trim().split(/\s+/).slice(-2).join(' ');
                const titleText = b.work_title || '';

                const isFirstCol = dayIdx === 0;
                const isLastCol = dayIdx === 6;

                const baseBg = isApproved ? 'bg-accent-600 hover:bg-accent-700' : 'bg-orange-500 hover:bg-orange-600';
                const borderColor = isApproved ? 'border-accent-500/60' : 'border-orange-400/60';

                const extendRight = !isLastCol && !isEnd;
                const extendLeft = !isFirstCol && !isStart;
                const tooltip = `${b.engineer_name || ''}${titleText ? `: ${titleText}` : ''} (${bStart}${!isSingleDay ? ` đến ${bEnd}` : ''}) • ${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}`;

                if (isSingleDay) {
                  return `
                    <div data-booking-id="${escapeHtml(b.booking_id)}"
                         class="h-6 sm:h-8 w-full px-1.5 sm:px-2 rounded-lg ${baseBg} border ${borderColor} text-white transition-all flex items-center justify-between gap-1 shadow-2xs cursor-pointer"
                         title="${escapeHtml(tooltip)}">
                      <div class="flex items-center gap-1 min-w-0">
                        <span class="text-[10px] sm:text-xs font-bold font-condensed tracking-tight text-white truncate leading-none select-none">${escapeHtml(techShortName)}</span>
                        ${titleText ? `<span class="hidden sm:inline text-[10px] text-white/90 truncate font-sans">• ${escapeHtml(titleText)}</span>` : ''}
                      </div>
                    </div>
                  `;
                } else if (isStart || (isFirstCol && !isEnd)) {
                  const isWeekContinuation = isFirstCol && !isStart;
                  const rightMargin = extendRight ? 'w-[calc(100%+0.25rem+2px)] sm:w-[calc(100%+0.375rem+2px)] -mr-[calc(0.25rem+2px)] sm:-mr-[calc(0.375rem+2px)] rounded-r-none border-r-0' : 'w-full mr-0 rounded-r-lg border-r';
                  return `
                    <div data-booking-id="${escapeHtml(b.booking_id)}"
                         class="h-6 sm:h-8 ${rightMargin} px-1.5 sm:px-2 rounded-l-lg ${baseBg} border-y border-l ${borderColor} text-white flex items-center gap-1 z-20 shadow-2xs transition-all cursor-pointer"
                         title="${escapeHtml(tooltip)}">
                      <span class="text-[10px] sm:text-xs font-bold font-condensed tracking-tight text-white truncate leading-none select-none">
                        ${isWeekContinuation ? `↳ ${escapeHtml(techShortName)}` : escapeHtml(techShortName)}
                      </span>
                      ${titleText ? `<span class="hidden sm:inline text-[10px] text-white/90 truncate font-sans">• ${escapeHtml(titleText)}</span>` : ''}
                    </div>
                  `;
                } else if (isEnd || (isLastCol && !isStart)) {
                  const leftMargin = extendLeft ? 'w-[calc(100%+0.25rem+2px)] sm:w-[calc(100%+0.375rem+2px)] -ml-[calc(0.25rem+2px)] sm:-ml-[calc(0.375rem+2px)] rounded-l-none border-l-0' : 'w-full ml-0 rounded-l-lg border-l';
                  return `
                    <div data-booking-id="${escapeHtml(b.booking_id)}"
                         class="h-6 sm:h-8 ${leftMargin} px-1.5 rounded-r-lg ${baseBg} border-y border-r ${borderColor} text-white flex items-center justify-end z-20 shadow-2xs transition-all cursor-pointer"
                         title="${escapeHtml(tooltip)}">
                    </div>
                  `;
                } else {
                  let spanClass = 'w-full rounded-none border-x-0';
                  if (extendLeft && extendRight) {
                    spanClass = 'w-[calc(100%+0.5rem+4px)] sm:w-[calc(100%+0.75rem+4px)] -ml-[calc(0.25rem+2px)] sm:-ml-[calc(0.375rem+2px)] -mr-[calc(0.25rem+2px)] sm:-mr-[calc(0.375rem+2px)] rounded-none border-x-0';
                  } else if (extendLeft) {
                    spanClass = 'w-[calc(100%+0.25rem+2px)] sm:w-[calc(100%+0.375rem+2px)] -ml-[calc(0.25rem+2px)] sm:-ml-[calc(0.375rem+2px)] mr-0 rounded-none border-l-0 border-r';
                  } else if (extendRight) {
                    spanClass = 'w-[calc(100%+0.25rem+2px)] sm:w-[calc(100%+0.375rem+2px)] ml-0 -mr-[calc(0.25rem+2px)] sm:-mr-[calc(0.375rem+2px)] rounded-none border-l border-r-0';
                  }
                  return `
                    <div data-booking-id="${escapeHtml(b.booking_id)}"
                         class="h-6 sm:h-8 ${spanClass} ${baseBg} border-y ${borderColor} text-white flex items-center justify-center z-20 shadow-2xs transition-all cursor-pointer"
                         title="${escapeHtml(tooltip)}">
                    </div>
                  `;
                }
              }).join('') : `
                <div class="flex-1 min-h-[24px] sm:min-h-[32px]"></div>
              `}
            </div>
          </div>
        `;
      });
    }

    grid.innerHTML = html;
    grid.querySelectorAll('[data-booking-id]').forEach((el) => {
      el.addEventListener('click', () => {
        const bId = el.dataset.bookingId;
        const found = visibleRows.find((r) => r.booking_id === bId);
        if (found) openEventDetail(found);
      });
    });
  }

  function renderAgenda(visibleRows) {
    const container = $('public-agenda-container');
    if (!container) return;

    const sorted = [...visibleRows].sort((a, b) => (a.booking_date || '').localeCompare(b.booking_date || ''));
    const visibilityClass = state.viewMode === 'list' ? 'block' : 'block lg:hidden';

    if (!sorted.length) {
      container.className = `${visibilityClass} border-t border-slate-200/80 bg-white`;
      container.innerHTML = `
        <div class="py-8 px-4 text-center">
          <p class="text-xs font-semibold text-slate-500">Chưa có ca trực nào trong ${monthLabel(state.month)}.</p>
        </div>
      `;
      return;
    }

    const grouped = {};
    sorted.forEach((row) => {
      const d = row.booking_date;
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(row);
    });

    const weekdayShort = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    container.className = `${visibilityClass} border-t border-slate-200/80 bg-white`;
    container.innerHTML = `
      <div class="px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
        <span class="font-condensed text-xs font-bold uppercase tracking-wider text-slate-700">Danh sách chi tiết lịch trực trong tháng</span>
        <span class="font-condensed text-xs font-bold text-brand-600">${sorted.length} ca</span>
      </div>
      <div class="divide-y divide-slate-100">
        ${Object.keys(grouped).map((dateStr) => {
          const items = grouped[dateStr];
          const [y, m, d] = dateStr.split('-').map(Number);
          const dateObj = new Date(y, m - 1, d);
          const dow = weekdayShort[dateObj.getDay()];
          const isSun = dateObj.getDay() === 0;
          return `
            <div class="p-3.5 sm:px-5 flex items-start gap-3.5">
              <div class="w-12 flex-shrink-0 text-center pt-0.5">
                <span class="block text-[10px] font-condensed font-bold uppercase tracking-wider ${isSun ? 'text-burgundy-800' : 'text-slate-400'}">${dow}</span>
                <span class="block text-lg font-condensed font-black leading-tight ${isSun ? 'text-burgundy-800' : 'text-slate-900'}">${pad(d)}/${pad(m)}</span>
              </div>
              <div class="flex-1 min-w-0 space-y-2">
                ${items.map((row) => {
                  const isMulti = row.end_date && row.end_date !== row.booking_date;
                  return `
                    <div data-agenda-booking="${escapeHtml(row.booking_id)}" class="p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-colors cursor-pointer flex items-center justify-between gap-3">
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <p class="text-xs font-bold text-slate-900 truncate">${escapeHtml(row.work_title || 'Ca làm việc')}</p>
                          ${isMulti ? `<span class="text-[10px] font-condensed font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">→ ${dateLabel(row.end_date)}</span>` : ''}
                        </div>
                        <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                          <span class="font-semibold text-slate-700">${escapeHtml(row.engineer_name)}</span>
                          ${row.work_location ? `<span>•</span><span class="truncate">${escapeHtml(row.work_location)}</span>` : ''}
                        </div>
                      </div>
                      ${statusBadge(row.status)}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('[data-agenda-booking]').forEach((el) => {
      el.addEventListener('click', () => {
        const bId = el.dataset.agendaBooking;
        const found = visibleRows.find((r) => r.booking_id === bId);
        if (found) openEventDetail(found);
      });
    });
  }

  function render() {
    const engineers = getEngineers();
    const allMonthBookings = getAllUniqueBookings();
    const visibleRows = getFilteredRows();
    const selectedEngineers = state.selectedTech === 'all' ? engineers : engineers.filter((engineer) => engineer.id === state.selectedTech);
    const approved = visibleRows.filter((row) => row.status === 'APPROVED').length;
    const pending = visibleRows.filter((row) => row.status === 'PENDING').length;
    $('summary-engineers').textContent = String(selectedEngineers.length);
    $('summary-shifts').textContent = String(visibleRows.length);
    $('summary-approved').textContent = String(approved);
    $('summary-pending').textContent = String(pending);
    renderEngineerFilters(engineers, allMonthBookings);
    renderCalendar(engineers, visibleRows);
    renderAgenda(visibleRows);
  }

  async function enrichMissingWorkTitles(client) {
    const uniqueIds = [...new Set(
      state.rows
        .filter((r) => r && r.booking_id && !r.work_title && !state.detailsByBookingId.has(r.booking_id))
        .map((r) => r.booking_id)
    )];
    if (!uniqueIds.length) return;
    await Promise.all(
      uniqueIds.map(async (bId) => {
        try {
          const { data } = await client.rpc('get_public_engineer_booking_detail', { p_booking_id: bId });
          const detail = Array.isArray(data) ? data[0] : data;
          if (detail) state.detailsByBookingId.set(bId, detail);
        } catch (_) {
          // Ignore individual detail fetch errors
        }
      })
    );
  }

  async function loadMonth() {
    const requestId = ++state.requestId;
    const from = dateISO(monthStart(state.month));
    const to = dateISO(monthEnd(state.month));
    $('month-label').textContent = monthLabel(state.month);
    $('report-message').textContent = 'Đang tải lịch…';
    $('report-message').className = 'text-xs text-slate-500';
    if (window.SystemLoader) {
      window.SystemLoader.show('Đang tải dữ liệu lịch trực…', `Đang đồng bộ lịch và báo cáo ${monthLabel(state.month)} từ máy chủ…`);
    }
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

      // Enrich work_title & work_location so calendar ribbons display the exact task title (e.g. "trong tan • 1234")
      await enrichMissingWorkTitles(client);
      if (requestId !== state.requestId) return;

      render();
      $('report-message').textContent = `Đồng bộ thời gian thực • ${monthLabel(state.month)}`;
      $('report-message').className = 'text-xs text-slate-500';
    } catch (error) {
      if (requestId === state.requestId) showError(error?.message || 'Không tải được dữ liệu lịch.');
    } finally {
      if (window.SystemLoader) window.SystemLoader.hide();
    }
  }

  function renderAuthenticatedHeader(displayName) {
    const authArea = $('public-header-auth-area');
    if (!authArea) return;
    authArea.replaceChildren();

    if (displayName) {
      const badge = el('div', 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-50 border border-accent-200 text-[11px] font-semibold text-accent-800');
      badge.append(
        el('span', 'w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0'),
        el('span', 'truncate max-w-[160px]', displayName)
      );
      authArea.appendChild(badge);
    }

    const backLink = el('a', 'shrink-0 h-9 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 px-3.5 text-xs font-bold font-condensed uppercase tracking-wider text-white transition shadow-xs');
    backLink.href = 'index.html';
    backLink.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      <span>Về Bảng Điều Khiển</span>
    `;
    authArea.appendChild(backLink);
  }

  async function syncHeaderAuthState() {
    try {
      const isLoggedOut = localStorage.getItem('k_workspace_logged_out') === 'true';
      if (!isLoggedOut) {
        const rawSession = localStorage.getItem('k_workspace_session');
        if (rawSession) {
          const parsed = JSON.parse(rawSession);
          if (parsed && parsed.email) {
            renderAuthenticatedHeader(parsed.full_name || parsed.email);
          }
        }
      }

      const client = window.SupabaseConfig?.getClient();
      if (client?.auth && !isLoggedOut) {
        const { data: { session } = {} } = await client.auth.getSession();
        if (session?.user?.email) {
          const metaName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || '';
          let cachedName = '';
          try {
            const rawSession = localStorage.getItem('k_workspace_session');
            if (rawSession) cachedName = JSON.parse(rawSession)?.full_name || '';
          } catch (_) {}
          renderAuthenticatedHeader(cachedName || metaName || session.user.email);
        }
      }
    } catch (_) {
      // Keep default guest login button if session check fails
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncHeaderAuthState();
    $('month-previous').addEventListener('click', () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1); loadMonth(); });
    $('month-next').addEventListener('click', () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1); loadMonth(); });
    $('month-today').addEventListener('click', () => { state.month = new Date(new Date().getFullYear(), new Date().getMonth(), 1); state.selectedTech = 'all'; loadMonth(); });
    $('btn-pub-view-grid')?.addEventListener('click', () => setViewMode('grid'));
    $('btn-pub-view-list')?.addEventListener('click', () => setViewMode('list'));
    $('detail-close').addEventListener('click', () => $('schedule-detail-dialog').close());
    $('schedule-detail-dialog').addEventListener('click', (event) => { if (event.target === $('schedule-detail-dialog')) $('schedule-detail-dialog').close(); });
    loadMonth();
  });
})();
