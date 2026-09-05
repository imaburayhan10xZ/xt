
        // ============================================================
        // TOAST SYSTEM
        // ============================================================
        function showToast(message, type = 'info', title = '', duration = 4000) {
            const container = document.getElementById('toast-container');
            if (!container) return;
            const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
            const titles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
                <div class="toast-content">
                    <div class="toast-title">${title || titles[type] || 'Notification'}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close" aria-label="Close">✕</button>
            `;
            toast.querySelector('.toast-close').addEventListener('click', () => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            });
            container.appendChild(toast);
            if (duration > 0) {
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.classList.add('removing');
                        setTimeout(() => toast.remove(), 300);
                    }
                }, duration);
            }
            return toast;
        }

        // ============================================================
        // PARTICLE BACKGROUND
        // ============================================================
        (function particleBg() {
            const canvas = document.getElementById('particle-bg-canvas');
            const ctx = canvas.getContext('2d');
            let w, h;
            const dots = [];
            const count = 80;
            let particleAnimId = null;
            let isRunning = false;

            function resize() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);
            for (let i = 0; i < count; i++) {
                dots.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: 1 + Math.random() * 2.5,
                    hue: 200 + Math.random() * 60,
                });
            }

            function draw() {
                if (!isRunning) return;
                ctx.clearRect(0, 0, w, h);
                for (const d of dots) {
                    d.x += d.vx;
                    d.y += d.vy;
                    if (d.x < 0 || d.x > w) d.vx *= -1;
                    if (d.y < 0 || d.y > h) d.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${d.hue}, 80%, 70%, 0.4)`;
                    ctx.shadowColor = `hsla(${d.hue}, 80%, 70%, 0.15)`;
                    ctx.shadowBlur = 10;
                    ctx.fill();
                }
                for (let i = 0; i < dots.length; i++) {
                    for (let j = i + 1; j < dots.length; j++) {
                        const dx = dots[i].x - dots[j].x;
                        const dy = dots[i].y - dots[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            const alpha = (1 - dist / 150) * 0.2;
                            ctx.beginPath();
                            ctx.moveTo(dots[i].x, dots[i].y);
                            ctx.lineTo(dots[j].x, dots[j].y);
                            ctx.strokeStyle = `hsla(220, 80%, 70%, ${alpha})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
                ctx.shadowBlur = 0;
                particleAnimId = requestAnimationFrame(draw);
            }

            function startParticles() {
                if (isRunning) return;
                isRunning = true;
                const animEnabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
                if (animEnabled) { canvas.style.display = 'block';
                    draw(); } else { isRunning = false;
                    canvas.style.display = 'none'; }
            }

            function stopParticles() {
                isRunning = false;
                if (particleAnimId) { cancelAnimationFrame(particleAnimId);
                    particleAnimId = null; }
                ctx.clearRect(0, 0, w, h);
                canvas.style.display = 'none';
            }
            window._particleStart = startParticles;
            window._particleStop = stopParticles;
            const animEnabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
            if (animEnabled) startParticles();
            else stopParticles();
        })();

        // ============================================================
        // MATRIX BACKGROUND
        // ============================================================
        (function initMatrix() {
            let canvas = document.getElementById('matrix-canvas');
            if (!canvas) {
                const c = document.createElement('canvas');
                c.id = 'matrix-canvas';
                c.style.cssText =
                    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.2;';
                document.body.prepend(c);
                canvas = c;
            }
            const ctx = canvas.getContext('2d');
            let w, h, columns, drops, fontSize = 14,
                chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}:<>?";
            let matrixAnimId = null;
            let isRunning = false;

            function resize() {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
                columns = Math.floor(w / fontSize);
                drops = Array(columns).fill(1);
            }
            resize();
            window.addEventListener('resize', resize);

            function drawMatrix() {
                if (!isRunning) return;
                ctx.fillStyle = 'rgba(10,14,23,0.08)';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#0f0';
                ctx.font = fontSize + 'px monospace';
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillStyle = `rgba(0,255,0,${0.05 + Math.random()*0.15})`;
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
                matrixAnimId = requestAnimationFrame(drawMatrix);
            }

            function startMatrix() {
                if (isRunning) return;
                isRunning = true;
                const animEnabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
                if (animEnabled) { canvas.style.display = 'block';
                    drawMatrix(); } else { isRunning = false;
                    canvas.style.display = 'none'; }
            }

            function stopMatrix() {
                isRunning = false;
                if (matrixAnimId) { cancelAnimationFrame(matrixAnimId);
                    matrixAnimId = null; }
                ctx.clearRect(0, 0, w, h);
                canvas.style.display = 'none';
            }
            window._matrixStart = startMatrix;
            window._matrixStop = stopMatrix;
            const animEnabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
            if (animEnabled) startMatrix();
            else stopMatrix();
        })();

        // ============================================================
        // STORAGE & STATE
        // ============================================================
        const STORE_PREFIX = 'DUDE_I_AM_GAMER_MEMO_';
        const TRASH_PREFIX = 'DUDE_I_AM_GAMER_TRASH_';
        const CURRENT_USER_KEY = 'DUDE_CURRENT_USER';
        const USERS_LIST_KEY = 'DUDE_USERS_LIST';
        const DRIVE_CLIENT_ID_KEY = 'GOOGLE_DRIVE_CLIENT_ID';

        const supabaseConfig = window.DUDE_SUPABASE_CONFIG || {};
        const supabaseClient = window.supabase && supabaseConfig.url && !supabaseConfig.url.includes('YOUR_') && supabaseConfig.anonKey && !supabaseConfig.anonKey.includes('YOUR_') ?
            window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey) : null;
        let authUser = null;
        let users = ['owner'];

        function getStoreKey(username) { return STORE_PREFIX + username; }

        function getTrashKey(username) { return TRASH_PREFIX + username; }

        function loadClientsForUser(username) {
            const data = localStorage.getItem(getStoreKey(username));
            let parsed = JSON.parse(data || '[]');
            return parsed.map(x => ({ ...x, panelTypes: x.panelTypes?.length ? x.panelTypes : (x.panelType ? [x.panelType] :
                    []) }));
        }

        function saveClientsForUser(username, clientsData) {
            localStorage.setItem(getStoreKey(username), JSON.stringify(clientsData));
        }

        function loadTrashForUser(username) {
            const data = localStorage.getItem(getTrashKey(username));
            return JSON.parse(data || '[]');
        }

        function saveTrashForUser(username, trashData) {
            localStorage.setItem(getTrashKey(username), JSON.stringify(trashData));
        }

        let currentUser = localStorage.getItem(CURRENT_USER_KEY) || 'owner';
        let clients = [];
        let trashItems = [];

        async function loadCloudData() {
            if (!supabaseClient || !authUser) return false;
            const { data, error } = await supabaseClient.from('clients').select('id,data,is_trashed,deleted_at').eq('user_id', authUser.id);
            if (error) throw error;
            clients = (data || []).filter(row => !row.is_trashed).map(row => ({ ...(row.data || {}), id: row.id }));
            trashItems = (data || []).filter(row => row.is_trashed).map(row => ({ ...(row.data || {}), id: row.id, deletedAt: row.deleted_at || row.data?.deletedAt }));
            currentUser = authUser.id;
            localStorage.setItem(CURRENT_USER_KEY, currentUser);
            return true;
        }

        async function persist() {
            updateTrashCount();
            if (!supabaseClient || !authUser) return;
            const rows = [
                ...clients.map(client => ({ id: client.id, user_id: authUser.id, data: client, is_trashed: false, deleted_at: null })),
                ...trashItems.map(item => ({ id: item.id, user_id: authUser.id, data: item, is_trashed: true, deleted_at: item.deletedAt || new Date().toISOString() }))
            ];
            if (rows.length) {
                const { error } = await supabaseClient.from('clients').upsert(rows, { onConflict: 'id' });
                if (error) throw error;
            }
        }

        async function deleteCloudRecord(id) {
            if (!supabaseClient || !authUser) return;
            const { error } = await supabaseClient.from('clients').delete().eq('id', id).eq('user_id', authUser.id);
            if (error) throw error;
        }

        // ============================================================
        // HELPERS
        // ============================================================
        const $ = id => document.getElementById(id);
        const today = () => new Date().toISOString().slice(0, 10);

        function esc(v) { return String(v ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;',
                '"': '&quot;', "'": '&#039;' } [m])) }

        function money(v) {
            const symbol = getCurrencySymbol();
            try { return symbol + Number(v || 0).toLocaleString(undefined, { minimumFractionDigits: 0 }); } catch (
            e) { return symbol + (Number(v || 0)).toFixed(0); }
        }

        function getCurrencySymbol() {
            const val = localStorage.getItem('DUDE_I_AM_GAMER_CURRENCY') || '৳|BDT|Bangladesh';
            return val.split('|')[0] || '৳';
        }

        function getCurrencyDisplay() {
            const val = localStorage.getItem('DUDE_I_AM_GAMER_CURRENCY') || '৳|BDT|Bangladesh';
            const parts = val.split('|');
            return `${parts[0]} (${parts[1]} - ${parts[2]})`;
        }

        function addPeriod(date, unit, amount) { let d = new Date(date + 'T00:00:00');
            amount = Number(amount) || 0; if (unit === 'day') d.setDate(d.getDate() + amount); if (unit === 'month') d
                .setMonth(d.getMonth() + amount); if (unit === 'year') d.setFullYear(d.getFullYear() + amount); return d
                .toISOString().slice(0, 10); }

        function calcExpiry(limit, start, custom) { if (custom) return custom; if (limit === 'permanent') return 'Permanent';
            if (!start) return ''; if (limit === 'custom') return addPeriod(start, $('customUnit')?.value || 'day', $(
                'customAmount')?.value || 1); if (limit === 'day') return addPeriod(start, 'day', 1); if (limit ===
                'weekly') return addPeriod(start, 'day', 7); if (limit === 'monthly') return addPeriod(start, 'month',
                1); if (limit === 'yearly') return addPeriod(start, 'year', 1); return ''; }

        function billingMonths() { return $('billingCycle')?.value === 'quarterly' ? 3 : $('billingCycle')?.value ===
            'monthly' ? 1 : 0 }

        function calcNextBilling(start) { let months = billingMonths(); if (!start || !months) return '—'; return addPeriod(
                start, 'month', months) }

        function panelList(x) { return x.panelTypes?.length ? x.panelTypes : (x.panelType ? [x.panelType] : []) }

        function countdown(e) { if (!e || e === 'Permanent') return ['∞ Permanent', false]; let ms = new Date(e +
                'T23:59:59').getTime() - Date.now(); if (ms <= 0) return ['EXPIRED', true]; let s = Math.floor(ms /
                1000),
                d = Math.floor(s / 86400),
                h = Math.floor(s % 86400 / 3600),
                m = Math.floor(s % 3600 / 60),
                sec = s % 60; return [`${d}d ${h}h ${m}m ${sec}s`, false] }

        function tag(t) { return '<span class="tag ' + String(t).toLowerCase().replaceAll(' ', '-') + '">' + esc(t) +
                '</span>' }

        function loanMini(x) {
            const due = Number(x.due) || 0;
            let arr = (x.kistis || []).filter(k => !k.paid).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            if (due <= 0) return '<div class="loan-mini"><span class="clear">FULL PAID • ' + money(0) + ' due</span></div>';
            if (x.loanMode !== 'schedule' || !arr.length) return '<div class="loan-mini">Remaining: ' + money(due) +
                '</div>';
            let k = arr[0],
                d = countdownDate(k.date);
            return '<div class="loan-mini"><span class="next">Next Kisti: ' + money(k.amount) + ' • ' + d +
                '</span><br>Remaining: ' + money(due) + '</div>';
        }

        function countdownDate(date) { if (!date) return 'date not set'; let ms = new Date(date + 'T23:59:59').getTime() -
                Date.now(); if (ms <= 0) return 'DUE NOW'; let sec = Math.floor(ms / 1000),
                d = Math.floor(sec / 86400),
                h = Math.floor(sec % 86400 / 3600),
                m = Math.floor(sec % 3600 / 60); return d + 'd ' + h + 'h ' + m + 'm'; }

        function renderKistis(arr) {
            const box = $('kistiList');
            if (!box) return;
            arr = arr || [];
            box.innerHTML = arr.map((k, i) => {
                const amount = Number(k.amount) || 0;
                const date = k.date || '';
                const note = k.note || '';
                const paid = !!k.paid;
                return `<div class="kisti-row">
              <input class="mini kAmt" data-i="${i}" type="number" min="0" value="${amount}">
              <input class="mini kDate" data-i="${i}" type="date" value="${esc(date)}">
              <input class="mini kNote" data-i="${i}" value="${esc(note)}" placeholder="Note">
              <label class="kisti-status">
                <input class="kPaid" data-i="${i}" type="checkbox" ${paid?'checked':''}> Paid
              </label>
              <button type="button" class="btn danger small remove-kisti" data-i="${i}">×</button>
            </div>`;
            }).join('') || '<div class="sub">No kisti added yet.</div>';
            box.querySelectorAll('.remove-kisti').forEach(btn => {
                btn.addEventListener('click', function() { const i = parseInt(this.dataset.i);
                    removeKisti(i); });
            });
            document.querySelectorAll('.kAmt,.kDate,.kNote,.kPaid').forEach(el => {
                el.addEventListener('input', syncKistisFromUI);
            });
        }

        function getKistisFromUI() {
            const rows = document.querySelectorAll('.kAmt');
            const kistis = [];
            rows.forEach((input, i) => {
                const dateEl = document.querySelector(`.kDate[data-i="${i}"]`);
                const noteEl = document.querySelector(`.kNote[data-i="${i}"]`);
                const paidEl = document.querySelector(`.kPaid[data-i="${i}"]`);
                kistis.push({
                    amount: Number(input.value) || 0,
                    date: dateEl ? dateEl.value : '',
                    note: noteEl ? noteEl.value : '',
                    paid: paidEl ? paidEl.checked : false,
                });
            });
            return kistis;
        }

        function syncKistisFromUI() {
            if (window.currentKistis) window.currentKistis = getKistisFromUI();
            updateKistiPreview(window.currentKistis || []);
        }

        function updateKistiPreview(arr) {
            let open = (arr || []).filter(k => !k.paid && Number(k.amount) > 0 && k.date).sort((a, b) => a.date.localeCompare(
                b.date));
            const due = Number($('due').value) || 0;
            if (due <= 0) { $('nextKistiPreview').value = 'FULL PAID'; return; }
            $('nextKistiPreview').value = open.length ? ('Next: ' + money(open[0].amount) + ' • ' + countdownDate(open[0]
                .date)) : 'Add a kisti date';
        }

        function removeKisti(i) {
            window.currentKistis = (window.currentKistis || []).filter((_, j) => j !== i);
            renderKistis(window.currentKistis);
            updateKistiPreview(window.currentKistis);
        }

        function addKisti() {
            let a = Number($('newKistiAmount').value) || 0,
                d = $('newKistiDate').value,
                n = $('newKistiNote').value.trim();
            if (!a || !d) { showToast('Enter kisti amount and due date.', 'warning', 'Missing Info'); return; }
            window.currentKistis = window.currentKistis || [];
            window.currentKistis.push({ amount: a, date: d, note: n, paid: false });
            window.currentKistis.sort((x, y) => x.date.localeCompare(y.date));
            $('newKistiAmount').value = '';
            $('newKistiDate').value = '';
            $('newKistiNote').value = '';
            renderKistis(window.currentKistis);
            updateKistiPreview(window.currentKistis);
            showToast('Kisti added successfully!', 'success', 'Added');
        }

        // ============================================================
        // DROPDOWN
        // ============================================================
        function toggleDropdown(id) {
            const wrap = $(id);
            if (!wrap) return;
            const panel = wrap.querySelector('.dropdown-panel');
            const isOpen = panel.classList.contains('open');
            document.querySelectorAll('.multi-select-wrap .dropdown-panel').forEach(p => p.classList.remove('open'));
            document.querySelectorAll('.multi-select-wrap').forEach(w => w.classList.remove('open'));
            if (!isOpen) { panel.classList.add('open');
                wrap.classList.add('open'); }
        }

        function updateDropdownDisplay(id, optionClass, valueAttr, displayMap) {
            const wrap = $(id);
            if (!wrap) return;
            const selected = wrap.querySelectorAll(optionClass + ':checked');
            const display = wrap.querySelector('.selected-display');
            const placeholder = display.querySelector('.placeholder');
            display.querySelectorAll('.chip').forEach(c => c.remove());
            if (selected.length === 0) { if (placeholder) placeholder.style.display = 'inline'; return; }
            if (placeholder) placeholder.style.display = 'none';
            selected.forEach(chk => {
                const chip = document.createElement('span');
                chip.className = 'chip';
                const label = displayMap ? (displayMap[chk.value] || chk.value) : chk.value;
                chip.innerHTML = esc(label) + ' <span class="remove" data-value="' + esc(chk.value) + '">×</span>';
                chip.querySelector('.remove').addEventListener('click', function(e) {
                    e.stopPropagation();
                    const val = this.dataset.value;
                    const cb = wrap.querySelector(optionClass + '[value="' + val + '"]');
                    if (cb) { cb.checked = false;
                        updateDropdownDisplay(id, optionClass, valueAttr, displayMap); }
                    if (id === 'panelDropdown') updatePanelFeesFromDropdown();
                    if (id === 'contactDropdown') updateContactsFromDropdown();
                });
                display.insertBefore(chip, display.querySelector('.dropdown-arrow'));
            });
        }

        function updatePanelFeesFromDropdown() { updatePanelFees();
            calcPayment(false); }

        function updateContactsFromDropdown() {
            window._selectedContacts = Array.from(document.querySelectorAll('.contact-option:checked')).map(c => c.value);
        }

        document.addEventListener('click', function(e) {
            document.querySelectorAll('.multi-select-wrap .dropdown-panel.open').forEach(panel => {
                const wrap = panel.closest('.multi-select-wrap');
                if (wrap && !wrap.contains(e.target)) {
                    panel.classList.remove('open');
                    wrap.classList.remove('open');
                }
            });
        });

        // ============================================================
        // INVOICE CUSTOMIZATION (A to Z)
        // ============================================================
        function getInvoiceSettings() {
            return {
                title: localStorage.getItem('DUDE_INV_TITLE') || 'INVOICE',
                prefix: localStorage.getItem('DUDE_INV_PREFIX') || 'INV',
                header: localStorage.getItem('DUDE_INV_HEADER') || '',
                footer: localStorage.getItem('DUDE_INV_FOOTER') || '',
                showQR: localStorage.getItem('DUDE_INV_SHOW_QR') !== '0',
                showSeal: localStorage.getItem('DUDE_INV_SHOW_SEAL') !== '0',
                showCompany: localStorage.getItem('DUDE_INV_SHOW_COMPANY') !== '0',
                showPayment: localStorage.getItem('DUDE_INV_SHOW_PAYMENT') !== '0',
                showTax: localStorage.getItem('DUDE_INV_SHOW_TAX') !== '0',
                taxRate: parseFloat(localStorage.getItem('DUDE_INV_TAX_RATE')) || 0,
                notes: localStorage.getItem('DUDE_INV_NOTES') || '',
                numberFormat: localStorage.getItem('DUDE_INV_NUMBER_FORMAT') || 'prefix-date-counter',
                currencyPosition: localStorage.getItem('DUDE_INV_CURRENCY_POSITION') || 'prefix',
                colorTheme: localStorage.getItem('DUDE_INV_COLOR_THEME') || 'default',
            };
        }

        function generateInvoiceNumber() {
            let counter = parseInt(localStorage.getItem('DUDE_I_AM_GAMER_INV_COUNTER') || '0') + 1;
            localStorage.setItem('DUDE_I_AM_GAMER_INV_COUNTER', String(counter));
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            const prefix = localStorage.getItem('DUDE_INV_PREFIX') || 'INV';
            const format = localStorage.getItem('DUDE_INV_NUMBER_FORMAT') || 'prefix-date-counter';
            const counterStr = String(counter).padStart(4, '0');
            const dateStr = `${y}${m}${d}`;
            switch (format) {
                case 'prefix-counter':
                    return `${prefix}-${counterStr}`;
                case 'date-counter':
                    return `${dateStr}-${counterStr}`;
                default:
                    return `${prefix}-${dateStr}-${counterStr}`;
            }
        }

        function generateInvoiceHTML(x) {
            const invSettings = getInvoiceSettings();
            const c = countdown(x.expiry);
            const invNum = generateInvoiceNumber();
            const logo = localStorage.getItem('DUDE_I_AM_GAMER_LOGO') || '';
            const company = localStorage.getItem('DUDE_I_AM_GAMER_SITE_NAME') || 'X-TREME CORPORATION';
            const address = localStorage.getItem('DUDE_I_AM_GAMER_ADDRESS') || '';
            const phone = localStorage.getItem('DUDE_I_AM_GAMER_PHONE') || '';
            const email = localStorage.getItem('DUDE_I_AM_GAMER_EMAIL') || '';
            const symbol = getCurrencySymbol();
            const currencyPos = invSettings.currencyPosition || 'prefix';
            const taxRate = invSettings.taxRate || 0;
            const showTax = invSettings.showTax;
            const taxAmount = (Number(x.finalPrice) || 0) * (taxRate / 100);
            const totalDue = (Number(x.due) || 0) + (Number(x.feeDue) || 0) + taxAmount;

            const colorTheme = invSettings.colorTheme || 'default';
            let themeColors = {
                accent: 'var(--accent)',
                seal: 'var(--seal-color)'
            };
            if (colorTheme === 'blue') themeColors = { accent: '#3498db', seal: '#2980b9' };
            if (colorTheme === 'gold') themeColors = { accent: '#f1c40f', seal: '#f39c12' };
            if (colorTheme === 'green') themeColors = { accent: '#2ecc71', seal: '#27ae60' };
            if (colorTheme === 'red') themeColors = { accent: '#e74c3c', seal: '#c0392b' };
            if (colorTheme === 'purple') themeColors = { accent: '#9b59b6', seal: '#8e44ad' };
            if (colorTheme === 'monochrome') themeColors = { accent: '#333', seal: '#555' };

            const qrData =
                `INV: ${invNum} | Client: ${x.name} | Total: ${symbol}${totalDue.toFixed(2)}`;
            const qrSrc =
                `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
            let sealText = 'DUE',
                sealClass = 'due';
            if (totalDue <= 0) { sealText = 'PAID';
                sealClass = 'paid'; } else if ((Number(x.paid) || 0) > 0 && totalDue > 0) { sealText = 'PARTIAL';
                sealClass = 'partial'; }

            const showQR = invSettings.showQR;
            const showSeal = invSettings.showSeal;
            const showCompany = invSettings.showCompany;
            const showPayment = invSettings.showPayment;
            const invTitle = invSettings.title || 'INVOICE';
            const invHeaderMsg = invSettings.header || '';
            const invFooterMsg = invSettings.footer || '';
            const invNotes = invSettings.notes || '';

            const fmtMoney = (v) => {
                const val = Number(v || 0).toFixed(2);
                return currencyPos === 'prefix' ? symbol + val : val + symbol;
            };

            let companyDetailsHtml = '';
            if (showCompany) {
                companyDetailsHtml = `
              <div class="company-details">
                <strong>${esc(invTitle)}</strong><br>
                <span class="invoice-number">${invNum}</span><br>
                ${address ? esc(address)+'<br>':''}
                ${phone ? '📞 '+esc(phone)+'<br>':''}
                ${email ? '✉ '+esc(email):''}
              </div>`;
            } else {
                companyDetailsHtml = `
              <div class="company-details">
                <strong>${esc(invTitle)}</strong><br>
                <span class="invoice-number">${invNum}</span>
              </div>`;
            }

            let paymentRowsHtml = '';
            if (showPayment) {
                paymentRowsHtml = `
              <div class="row"><span class="label">Main Price</span><span class="value">${fmtMoney(x.price)}</span></div>
              <div class="row"><span class="label">Discount</span><span class="value">${fmtMoney(x.discount)}</span></div>
              <div class="row"><span class="label">Final Price</span><span class="value">${fmtMoney(x.finalPrice)}</span></div>
              <div class="row"><span class="label">Paid / Advance</span><span class="value">${fmtMoney(x.paid)}</span></div>
              <div class="row"><span class="label">Main Due / Loan</span><span class="value">${fmtMoney(x.due)}</span></div>
              <div class="row"><span class="label">Separate Fee</span><span class="value">${fmtMoney(x.monthlyFee||0)}</span></div>
              <div class="row"><span class="label">Fee Paid</span><span class="value">${fmtMoney(x.feePaid||0)}</span></div>
              <div class="row"><span class="label">Fee Due</span><span class="value">${fmtMoney(x.feeDue||0)}</span></div>`;
                if (showTax && taxRate > 0) {
                    paymentRowsHtml +=
                        `<div class="row"><span class="label">Tax (${taxRate}%)</span><span class="value">${fmtMoney(taxAmount)}</span></div>`;
                }
                paymentRowsHtml +=
                    `<div class="row total-row"><span>TOTAL DUE</span><span>${fmtMoney(totalDue)}</span></div>`;
            } else {
                paymentRowsHtml = `
              <div class="row"><span class="label">Total Due</span><span class="value">${fmtMoney(totalDue)}</span></div>`;
            }

            const sealHtml = showSeal ? `<div class="seal ${sealClass}" style="border-color:${themeColors.seal};color:${themeColors.seal};text-shadow:0 0 20px ${themeColors.seal};box-shadow:0 0 30px ${themeColors.seal};">${sealText}</div>` :
                '';
            const qrHtml = showQR ? `<div class="qr-area"><img src="${qrSrc}" alt="QR Code"></div>` : '';
            const headerMsgHtml = invHeaderMsg ?
                `<div style="text-align:center;font-size:calc(var(--font-size-base)*0.85);color:var(--text-muted);margin-bottom:10px;">${esc(invHeaderMsg)}</div>` :
                '';
            const footerMsgHtml = invFooterMsg ?
                `<div style="margin-top:8px;font-size:calc(var(--font-size-base)*0.78);color:var(--text-muted);text-align:center;">${esc(invFooterMsg)}</div>` :
                '';
            const notesHtml = invNotes ?
                `<div style="margin-top:8px;font-size:calc(var(--font-size-base)*0.78);color:var(--text-muted);border-top:1px solid var(--border-color);padding-top:8px;">${esc(invNotes)}</div>` :
                '';

            return `<div class="invoice-box" style="border-color:${themeColors.accent};">
            ${sealHtml}
            <div class="invoice-header" style="border-bottom-color:${themeColors.accent};">
              <div class="logo-area">
                ${logo ? `<img src="${logo}" alt="Logo">` : ''}
                <div>
                  <strong style="font-size:calc(var(--font-size-base)*1.3);color:${themeColors.accent};">${esc(company)}</strong>
                  <div style="font-size:calc(var(--font-size-base)*0.7);color:var(--text-muted);">${esc(localStorage.getItem('DUDE_I_AM_GAMER_SITE_SUBTITLE')||'')}</div>
                </div>
              </div>
              ${companyDetailsHtml}
            </div>
            ${headerMsgHtml}
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:calc(var(--font-size-base)*0.85);">
              <div><span class="label">Date:</span> ${esc(x.date)}</div>
              <div><span class="label">Due:</span> ${c[0]}</div>
            </div>
            <div style="background:var(--bg-card); padding:8px 12px; border-radius:var(--border-radius); margin-bottom:10px; border:1px solid var(--border-color);">
              <div><span class="label">Client:</span> <strong>${esc(x.name)}</strong> ${x.sid ? ' (SID: '+esc(x.sid)+')' : ''}</div>
              <div><span class="label">Phone:</span> ${esc(x.phone||'—')}</div>
              <div><span class="label">Panel:</span> ${panelList(x).map(tag).join(' ')}</div>
              <div><span class="label">Key:</span> ${esc(x.key)}</div>
            </div>
            ${paymentRowsHtml}
            ${x.note ? `<div style="margin-top:8px;font-size:calc(var(--font-size-base)*0.78);color:var(--text-muted);">Note: ${esc(x.note)}</div>` : ''}
            ${notesHtml}
            ${qrHtml}
            ${footerMsgHtml}
            <div class="invoice-footer">
              Generated by ${esc(company)} • ${new Date().toLocaleString()}
            </div>
          </div>`;
        }

        function printInvoice(id) {
            let x = clients.find(a => a.id === id);
            if (!x) { showToast('Client not found', 'error', 'Error'); return; }
            let win = window.open('', '_blank', 'width=800,height=900');
            if (!win) { showToast('Please allow popups for invoice printing.', 'warning', 'Popup Blocked'); return; }
            const html = generateInvoiceHTML(x);
            win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${esc(x.name)}</title>
            <style>
              *{box-sizing:border-box;margin:0;padding:0;}
              :root{${Object.entries(getComputedStyle(document.documentElement)).filter(([k])=>k.startsWith('--')).map(([k,v])=>`${k}:${v};`).join('')}}
              body{background:var(--bg-primary);color:var(--text-primary);font:var(--font-size-base) var(--font-family);padding:30px;display:flex;justify-content:center;}
              .invoice-box{max-width:700px;width:100%;background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--border-radius);padding:20px;position:relative;overflow:hidden;}
              .invoice-box .seal{position:absolute;top:20%;right:10%;transform:rotate(-25deg);font-size:calc(var(--font-size-base)*3);font-weight:900;font-family:var(--font-family);text-transform:uppercase;padding:0.2em 0.5em;border:6px double var(--seal-color);border-radius:12px;color:var(--seal-color);opacity:0.25;pointer-events:none;text-shadow:0 0 20px var(--seal-color);box-shadow:0 0 30px var(--seal-color);letter-spacing:3px;background:rgba(255,255,255,0.1);backdrop-filter:blur(2px);mix-blend-mode:multiply;z-index:10;}
              .invoice-box .seal.paid{border-color:#4caf50;color:#4caf50;text-shadow:0 0 20px #4caf50;box-shadow:0 0 30px #4caf50;}
              .invoice-box .seal.partial{border-color:#ff9800;color:#ff9800;text-shadow:0 0 20px #ff9800;box-shadow:0 0 30px #ff9800;}
              .invoice-box .seal.due{border-color:var(--seal-color);color:var(--seal-color);text-shadow:0 0 20px var(--seal-color);box-shadow:0 0 30px var(--seal-color);}
              .invoice-header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--accent);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:10px;}
              .invoice-header .logo-area{display:flex;align-items:center;gap:12px;}
              .invoice-header .logo-area img{max-height:50px;max-width:100px;}
              .invoice-header .company-details{text-align:right;font-size:calc(var(--font-size-base)*0.78);line-height:1.5;color:var(--text-muted);}
              .invoice-header .company-details strong{color:var(--text-primary);}
              .row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border-color);font-size:calc(var(--font-size-base)*0.85);}
              .row .label{color:var(--text-muted);}
              .row .value{font-weight:bold;color:var(--text-primary);}
              .total-row{font-size:calc(var(--font-size-base)*1.3);font-weight:bold;color:var(--accent);border-bottom:2px solid var(--accent);padding-top:8px;margin-top:4px;}
              .qr-area{display:flex;justify-content:flex-end;margin-top:12px;border-top:1px solid var(--border-color);padding-top:12px;}
              .qr-area img{max-width:100px;max-height:100px;}
              .invoice-footer{margin-top:14px;font-size:calc(var(--font-size-base)*0.7);color:var(--text-muted);text-align:center;border-top:1px solid var(--border-color);padding-top:10px;}
              .invoice-number{font-size:calc(var(--font-size-base)*1);font-weight:bold;color:var(--accent);}
              .tag{display:inline-block;border:1px solid var(--border-color);border-radius:2px;padding:2px 6px;font-size:calc(var(--font-size-base)*0.65);margin:1px;font-family:var(--font-family);}
              button{display:none;}
              @media print{body{background:white;color:black;}.invoice-box{background:white;border-color:#ccc;}.row{border-color:#ddd;}.total-row{color:#333;border-color:#333;}.invoice-header .company-details strong{color:#000;}.tag{border-color:#999;color:#333;}.invoice-number{color:#000;}.invoice-footer{color:#555;}.invoice-header .company-details{color:#333;}.row .label{color:#555;}.row .value{color:#000;}.invoice-box .seal{opacity:0.4 !important;border-color:#666 !important;color:#666 !important;box-shadow:none !important;text-shadow:none !important;}}
            </style>
            </head><body>${html}</body></html>`);
            win.document.close();
            setTimeout(() => { win.print(); }, 800);
        }

        // ============================================================
        // INVOICE PDF DOWNLOAD (using html2pdf)
        // ============================================================
        function downloadInvoice(id) {
            let x = clients.find(a => a.id === id);
            if (!x) { showToast('Client not found', 'error', 'Error'); return; }
            const html = generateInvoiceHTML(x);
            const container = document.createElement('div');
            container.innerHTML = html;
            container.style.padding = '20px';
            container.style.background = 'var(--bg-primary)';
            document.body.appendChild(container);

            const invoiceEl = container.querySelector('.invoice-box');
            if (!invoiceEl) {
                showToast('Invoice element not found.', 'error', 'Error');
                document.body.removeChild(container);
                return;
            }

            // Temporarily override background for PDF generation
            const originalBg = invoiceEl.style.background;
            invoiceEl.style.background = '#ffffff';
            invoiceEl.style.color = '#000000';
            invoiceEl.querySelectorAll('.label').forEach(el => el.style.color = '#555555');
            invoiceEl.querySelectorAll('.value').forEach(el => el.style.color = '#000000');
            invoiceEl.querySelectorAll('.company-details strong').forEach(el => el.style.color = '#000000');
            invoiceEl.querySelectorAll('.invoice-number').forEach(el => el.style.color = '#000000');
            invoiceEl.querySelectorAll('.tag').forEach(el => { el.style.color = '#333';
                el.style.borderColor = '#999'; });
            invoiceEl.querySelectorAll('.seal').forEach(el => { el.style.opacity = '0.4';
                el.style.borderColor = '#666';
                el.style.color = '#666';
                el.style.textShadow = 'none';
                el.style.boxShadow = 'none'; });

            const opt = {
                margin: 0.5,
                filename: `Invoice-${x.name}-${today()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().from(invoiceEl).set(opt).save().then(() => {
                document.body.removeChild(container);
                showToast('Invoice PDF downloaded successfully!', 'success', 'Download');
            }).catch((err) => {
                console.error('PDF generation error:', err);
                document.body.removeChild(container);
                showToast('Failed to generate PDF: ' + err.message, 'error', 'Error');
            });
        }

        // ============================================================
        // MORE SECTION
        // ============================================================
        function toggleMore() {
            const body = document.getElementById('moreBody');
            const icon = document.getElementById('moreToggleIcon');
            body.classList.toggle('open');
            icon.classList.toggle('open');
        }

        function updateMoreStats() {
            const total = clients.length;
            const active = clients.filter(x => !countdown(x.expiry)[1]).length;
            const paid = clients.reduce((s, x) => s + (Number(x.paid) || 0), 0);
            const due = clients.reduce((s, x) => s + (Number(x.due) || 0) + (Number(x.feeDue) || 0), 0);
            const pending = clients.filter(x => (Number(x.due) || 0) > 0 || (Number(x.feeDue) || 0) > 0).length;
            const now = new Date();
            const monthStart = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-01';
            const monthPaid = clients.filter(x => x.date >= monthStart).reduce((s, x) => s + (Number(x.paid) || 0), 0);
            const panelCount = {};
            clients.forEach(x => {
                (panelList(x) || []).forEach(p => { panelCount[p] = (panelCount[p] || 0) + 1; });
            });
            let topPanel = '—',
                topCount = 0;
            for (const [p, c] of Object.entries(panelCount)) { if (c > topCount) { topCount = c;
                    topPanel = p; } }
            let nextExpiry = '—';
            const sorted = clients.slice().filter(x => x.expiry && x.expiry !== 'Permanent').sort((a, b) => a.expiry
                .localeCompare(b.expiry));
            if (sorted.length > 0) { const c = countdown(sorted[0].expiry);
                nextExpiry = sorted[0].name + ' (' + c[0] + ')'; }
            document.getElementById('moreRevenue').textContent = money(monthPaid);
            document.getElementById('moreGrowth').textContent = total > 0 ? Math.round((active / total) * 100) + '%' : '0%';
            document.getElementById('moreActive').textContent = active;
            document.getElementById('morePending').textContent = pending;
            document.getElementById('moreTopPanel').textContent = topPanel + (topCount > 0 ? ' (' + topCount + ')' : '');
            document.getElementById('moreNextExpiry').textContent = nextExpiry;
        }

        // ============================================================
        // SELECT ALL / BULK DELETE
        // ============================================================
        function toggleAllCheckboxes() {
            const checked = document.getElementById('selectAll').checked;
            document.querySelectorAll('.client-checkbox').forEach(cb => cb.checked = checked);
            updateDeleteButtonState();
        }

        function toggleAllTrashCheckboxes() {
            const checked = document.getElementById('selectAllTrash').checked;
            document.querySelectorAll('.trash-checkbox').forEach(cb => cb.checked = checked);
            updateTrashBulkState();
        }

        function updateSelectAllState() {
            const checkboxes = document.querySelectorAll('.client-checkbox');
            const checked = document.querySelectorAll('.client-checkbox:checked');
            const selectAll = document.getElementById('selectAll');
            if (selectAll) { selectAll.checked = checkboxes.length > 0 && checked.length === checkboxes.length; }
            updateDeleteButtonState();
        }

        function updateDeleteButtonState() {
            const checked = document.querySelectorAll('.client-checkbox:checked');
            const btn = document.getElementById('deleteSelectedBtn');
            if (btn) {
                btn.disabled = checked.length === 0;
                btn.textContent = `🗑 Delete Selected (${checked.length})`;
                if (checked.length === 0) { btn.classList.remove('primary');
                    btn.classList.add('danger'); } else { btn.classList.add('primary');
                    btn.classList.remove('danger'); }
            }
        }

        function updateTrashBulkState() {
            const checked = document.querySelectorAll('.trash-checkbox:checked');
            const restoreBtn = document.getElementById('restoreSelectedTrashBtn');
            const delBtn = document.getElementById('deleteSelectedTrashBtn');
            if (restoreBtn) {
                restoreBtn.disabled = checked.length === 0;
                restoreBtn.textContent = `↩ Restore (${checked.length})`;
            }
            if (delBtn) {
                delBtn.disabled = checked.length === 0;
                delBtn.textContent = `🗑 Delete (${checked.length})`;
            }
        }

        // ============================================================
        // TRASH SYSTEM
        // ============================================================
        function moveToTrash(client) {
            const trashed = { ...client, deletedAt: new Date().toISOString() };
            trashItems.push(trashed);
            showToast(`Client "${client.name}" moved to trash.`, 'warning', 'Trashed');
        }

        function restoreFromTrash(id) {
            const idx = trashItems.findIndex(t => t.id === id);
            if (idx === -1) { showToast('Item not found in trash.', 'error', 'Error'); return; }
            const item = trashItems[idx];
            const { deletedAt, ...client } = item;
            clients.push(client);
            trashItems.splice(idx, 1);
            persist();
            showToast(`Client "${client.name}" restored from trash.`, 'success', 'Restored');
            render();
        }

        async function permanentDelete(id) {
            const idx = trashItems.findIndex(t => t.id === id);
            if (idx === -1) { showToast('Item not found in trash.', 'error', 'Error'); return; }
            const name = trashItems[idx].name;
            if (!confirm(`Permanently delete "${name}" from trash? This cannot be undone.`)) return;
            try { await deleteCloudRecord(id); } catch (error) { showToast('Could not delete from cloud: ' + error.message, 'error', 'Delete Failed'); return; }
            trashItems.splice(idx, 1);
            persist();
            showToast(`"${name}" permanently deleted.`, 'info', 'Deleted');
            render();
        }

        async function emptyTrash() {
            if (trashItems.length === 0) { showToast('Trash is already empty.', 'info', 'Empty'); return; }
            if (!confirm(`Empty trash? ${trashItems.length} item(s) will be permanently deleted.`)) return;
            try { await Promise.all(trashItems.map(item => deleteCloudRecord(item.id))); } catch (error) { showToast('Could not empty cloud trash: ' + error.message, 'error', 'Delete Failed'); return; }
            trashItems = [];
            persist();
            showToast('Trash emptied permanently.', 'info', 'Empty');
            render();
        }

        function restoreAllTrash() {
            if (trashItems.length === 0) { showToast('Trash is empty.', 'info', 'Restore'); return; }
            if (!confirm(`Restore all ${trashItems.length} item(s) from trash?`)) return;
            trashItems.forEach(item => {
                const { deletedAt, ...client } = item;
                clients.push(client);
            });
            trashItems = [];
            persist();
            showToast('All items restored from trash.', 'success', 'Restore All');
            render();
        }

        function restoreSelectedTrash() {
            const checked = document.querySelectorAll('.trash-checkbox:checked');
            if (checked.length === 0) { showToast('No items selected.', 'warning', 'Select First'); return; }
            if (!confirm(`Restore ${checked.length} selected item(s) from trash?`)) return;
            const ids = Array.from(checked).map(cb => cb.dataset.id);
            const toRestore = [];
            const remaining = [];
            trashItems.forEach(item => {
                if (ids.includes(item.id)) {
                    const { deletedAt, ...client } = item;
                    clients.push(client);
                    toRestore.push(item.id);
                } else {
                    remaining.push(item);
                }
            });
            trashItems = remaining;
            persist();
            showToast(`Restored ${toRestore.length} item(s) from trash.`, 'success', 'Restore Selected');
            render();
        }

        async function deleteSelectedTrash() {
            const checked = document.querySelectorAll('.trash-checkbox:checked');
            if (checked.length === 0) { showToast('No items selected.', 'warning', 'Select First'); return; }
            if (!confirm(`Permanently delete ${checked.length} selected item(s) from trash?`)) return;
            const ids = Array.from(checked).map(cb => cb.dataset.id);
            try { await Promise.all(ids.map(id => deleteCloudRecord(id))); } catch (error) { showToast('Could not delete selected cloud records: ' + error.message, 'error', 'Delete Failed'); return; }
            const remaining = trashItems.filter(item => !ids.includes(item.id));
            const deleted = trashItems.length - remaining.length;
            trashItems = remaining;
            persist();
            showToast(`Permanently deleted ${deleted} item(s).`, 'info', 'Deleted');
            render();
        }

        function updateTrashCount() {
            const count = trashItems.length;
            const el = document.getElementById('trashCountNav');
            if (el) {
                el.textContent = count;
                el.style.display = count > 0 ? 'inline-block' : 'none';
            }
            const info = document.getElementById('trashCountInfo');
            if (info) info.textContent = count + ' item' + (count !== 1 ? 's' : '');
        }

        // ============================================================
        // CLIENT CRUD
        // ============================================================
        function resetForm() {
            $('clientForm').reset();
            $('editId').value = '';
            $('date').value = today();
            $('startDate').value = today();
            $('limit').value = 'monthly';
            $('billingCycle').value = 'monthly';
            $('feeStartDate').value = '';
            $('price').value = 0;
            $('monthlyFee').value = 0;
            $('discount').value = 0;
            $('paid').value = 0;
            $('feePaid').value = 0;
            $('loanMode').value = 'off';
            window.currentKistis = [];
            renderKistis([]);
            document.querySelectorAll('.panel-option, .contact-option').forEach(c => c.checked = false);
            updateDropdownDisplay('panelDropdown', '.panel-option', 'value');
            updateDropdownDisplay('contactDropdown', '.contact-option', 'value');
            window._selectedContacts = [];
            updateCustomUI();
            updatePanelFees();
            calcPayment(false);
            updateExpiry();
        }

        function openAdd() { resetForm();
            $('modalTitle').textContent = 'Add Client';
            $('clientModal').classList.add('show') }

        function closeClient() { $('clientModal').classList.remove('show') }

        function editClient(id) {
            let x = clients.find(a => a.id === id);
            if (!x) return;
            resetForm();
            $('modalTitle').textContent = 'Edit Client';
            $('editId').value = x.id;
            $('date').value = x.date;
            $('name').value = x.name;
            $('sid').value = x.sid || '';
            $('phone').value = x.phone || '';
            const panels = panelList(x);
            document.querySelectorAll('.panel-option').forEach(c => c.checked = panels.includes(c.value));
            updateDropdownDisplay('panelDropdown', '.panel-option', 'value');
            const contacts = x.contacts || [];
            document.querySelectorAll('.contact-option').forEach(c => c.checked = contacts.includes(c.value));
            updateDropdownDisplay('contactDropdown', '.contact-option', 'value');
            window._selectedContacts = contacts;
            updatePanelFees(x.panelFees || {});
            $('key').value = x.key;
            $('contactDetails').value = x.contactDetails || '';
            $('limit').value = x.limit;
            $('startDate').value = x.startDate || '';
            $('customExpiry').value = x.customExpiry || '';
            $('customAmount').value = x.customAmount || 2;
            $('customUnit').value = x.customUnit || 'day';
            $('billingCycle').value = x.billingCycle || 'one_time';
            $('monthlyFee').value = x.monthlyFee || 0;
            $('feePaid').value = x.feePaid || 0;
            $('feeStartDate').value = x.feeStartDate || '';
            $('price').value = x.price || 0;
            $('discount').value = x.discount || 0;
            $('paid').value = x.paid || 0;
            $('note').value = x.note || '';
            $('loanMode').value = x.loanMode || 'off';
            window.currentKistis = JSON.parse(JSON.stringify(x.kistis || []));
            renderKistis(window.currentKistis);
            updateCustomUI();
            const symbol = getCurrencySymbol();
            document.querySelectorAll('#priceCurrencySymbol, #discountCurrencySymbol, #paidCurrencySymbol, #monthlyFeeCurrencySymbol, #feePaidCurrencySymbol')
                .forEach(el => { if (el) el.textContent = symbol; });
            calcPayment();
            updateExpiry();
            $('clientModal').classList.add('show');
        }

        function getSelectedPanels() { return Array.from(document.querySelectorAll('.panel-option:checked')).map(c => c
            .value); }

        function getSelectedContacts() { return Array.from(document.querySelectorAll('.contact-option:checked')).map(c => c
                .value); }

        function saveClient(e) {
            e.preventDefault();
            let pts = getSelectedPanels();
            if (!pts.length) { showToast('Select at least one panel type.', 'warning', 'Missing Panel'); return; }
            let id = $('editId').value || (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random()
                .toString(36).slice(2));
            let x = {
                id,
                date: $('date').value,
                name: $('name').value.trim(),
                sid: $('sid').value.trim(),
                phone: $('phone').value.trim(),
                panelTypes: pts,
                panelType: pts[0],
                panelFees: panelFeeMap(),
                key: $('key').value.trim(),
                contacts: getSelectedContacts(),
                contactDetails: $('contactDetails').value.trim(),
                limit: $('limit').value,
                startDate: $('startDate').value,
                customAmount: Number($('customAmount').value) || 1,
                customUnit: $('customUnit').value,
                customExpiry: $('customExpiry').value,
                expiry: $('expiry').value,
                billingCycle: $('billingCycle').value,
                monthlyFee: Number($('monthlyFee').value) || 0,
                feePaid: Number($('feePaid').value) || 0,
                feeDue: Number($('feeDue').value) || 0,
                feeStartDate: $('feeStartDate').value,
                nextBilling: $('nextBilling').value,
                price: Number($('price').value) || 0,
                discount: Number($('discount').value) || 0,
                paid: Number($('paid').value) || 0,
                finalPrice: Number($('finalPrice').value) || 0,
                due: Number($('due').value) || 0,
                loanMode: $('loanMode').value,
                kistis: getKistisFromUI(),
                note: $('note').value.trim()
            };
            let i = clients.findIndex(a => a.id === id);
            if (i >= 0) clients[i] = x;
            else clients.push(x);
            persist();
            closeClient();
            render();
            showToast(`Client "${x.name}" saved successfully!`, 'success', 'Saved');
        }

        function deleteClient(id) {
            let x = clients.find(a => a.id === id);
            if (!x) return;
            if (confirm('Move "' + x.name + '" to trash?')) {
                moveToTrash(x);
                clients = clients.filter(a => a.id !== id);
                persist();
                render();
            }
        }

        function viewDetail(id) {
            let x = clients.find(a => a.id === id),
                c = countdown(x.expiry);
            $('detailTitle').textContent = x.name + ' — Full Details';
            $('detailBody').innerHTML = `<div class="detailgrid">
            <div class="card"><small>Date</small><b>${esc(x.date)}</b></div><div class="card"><small>SID</small><b>${esc(x.sid||'—')}</b></div><div class="card"><small>Phone</small><b>${esc(x.phone||'—')}</b></div>
            <div class="card"><small>Panel / Combo</small><b>${panelList(x).map(tag).join('')}</b></div><div class="card"><small>Key</small><b>${esc(x.key)}</b></div><div class="card"><small>Limit</small><b>${esc(x.limit)}</b></div>
            <div class="card"><small>Expiry</small><b>${esc(x.expiry)}</b></div><div class="card"><small>Countdown</small><b class="${c[1]?'bad':'ok'}">${c[0]}</b></div><div class="card"><small>Main Payment / Loan</small><b>${money(x.paid)} paid / ${money(x.due)} due</b></div>
            <div class="card"><small>Separate Fee</small><b>${x.billingCycle==='quarterly'?'Every 3 Months (OBB Update)':x.billingCycle==='monthly'?'Monthly':'Off'} • ${money(x.monthlyFee||0)}</b></div>
            <div class="card"><small>Fee Paid / Due</small><b>${money(x.feePaid||0)} paid / ${money(x.feeDue||0)} due</b></div>
            <div class="card"><small>Next Fee / OBB</small><b>${esc(x.nextBilling||'—')}</b></div></div>
            <div class="section">Contacts</div><div class="notice">${(x.contacts||[]).map(tag).join('')||'No contacts selected'}</div>
            <div class="section">Contact Details</div><div class="notice">${esc(x.contactDetails||'—')}</div>
            <div class="section">Loan / Kisti Schedule</div><div class="notice">${(x.kistis||[]).length?x.kistis.map((k,i)=>`<div style="padding:6px 0;border-bottom:1px solid var(--border-color);">Kisti ${i+1}: <b>${money(k.amount)}</b> • ${esc(k.date||'—')} • ${k.paid?'<span class="kisti-paid">PAID</span>':'<span class="kisti-due">DUE</span>'}${k.note?' • '+esc(k.note):''}</div>`).join(''):'No kisti schedule added.'}</div>
            <div class="section">Payment Breakdown</div><div class="notice">Main: ${money(x.finalPrice)} • Main Paid: ${money(x.paid)} • Main Due/Loan: ${money(x.due)}<br>Separate Fee: ${money(x.monthlyFee||0)} • Fee Paid: ${money(x.feePaid||0)} • Fee Due: ${money(x.feeDue||0)}</div>
            <div class="section">Note</div><div class="notice">${esc(x.note||'—')}</div>
            <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
              <button class="btn primary" onclick="printInvoice('${x.id}')">🖨 Print Invoice</button>
              <button class="btn primary" onclick="downloadInvoice('${x.id}')">⬇ Download PDF</button>
            </div>`;
            $('detailModal').classList.add('show')
        }

        function closeDetail() { $('detailModal').classList.remove('show') }

        // ============================================================
        // UI HELPERS
        // ============================================================
        function updateCustomUI() { document.querySelectorAll('.customOnly').forEach(e => e.classList.toggle('hidden', $(
                'limit').value !== 'custom')) }

        function panelFeeMap() {
            let o = {};
            document.querySelectorAll('.panelFee').forEach(i => { if (i.dataset.panel) o[i.dataset.panel] = Number(i
                    .value) || 0; });
            return o;
        }

        function updatePanelFees(existing = {}) {
            let box = $('panelFees');
            if (!box) return;
            let current = panelFeeMap();
            existing = { ...current, ...existing };
            let selected = getSelectedPanels();
            box.innerHTML = selected.map(t =>
                    `<label style="display:flex;align-items:center;gap:5px"><span>${esc(t)}</span><input class="panelFee" data-panel="${esc(t)}" type="number" min="0" value="${Number(existing[t]||0)}" placeholder="${getCurrencySymbol()}" style="width:90px"></label>`
                    ).join('') ||
                '<span class="sub">Select 2+ panels for a combo. Fees will be added together.</span>';
            document.querySelectorAll('.panelFee').forEach(i => i.addEventListener('input', () => { calcPayment(
                    false); }));
        }

        function updateExpiry() { updateCustomUI();
            $('expiry').value = calcExpiry($('limit').value, $('startDate').value, $('customExpiry').value);
            calcPayment(false) }

        function calcPayment(manual = true) {
            let f = Math.max(0, (Number($('price').value) || 0) - (Number($('discount').value) || 0));
            $('finalPrice').value = f;
            let mainDue = Math.max(0, f - (Number($('paid').value) || 0));
            $('due').value = mainDue;
            updateKistiPreview(window.currentKistis || []);
            $('loanStatus').value = mainDue > 0 ? 'LOAN / MAIN DUE: ' + money(mainDue) : 'CLEARED — Fee can start';
            let fee = Number($('monthlyFee').value) || 0,
                feePaid = Number($('feePaid').value) || 0,
                months = billingMonths();
            let feeDue = 0;
            if (mainDue <= 0 && months > 0 && fee > 0) { feeDue = Math.max(0, fee - feePaid); }
            $('feeDue').value = feeDue;
            if (mainDue > 0) { $('feeStatus').value = 'LOCKED — clear main payment first';
                $('nextBilling').value = '—'; } else if (months === 0 || fee <= 0) { $('feeStatus').value =
                    'OFF — no separate recurring fee';
                $('nextBilling').value = '—'; } else { if (!$('feeStartDate').value) $('feeStartDate').value = today();
                $('feeStatus').value = feeDue > 0 ? 'FEE DUE: ' + money(feeDue) : 'FEE PAID / ACTIVE';
                $('nextBilling').value = calcNextBilling($('feeStartDate').value); }
        }

        // ============================================================
        // THEME
        // ============================================================
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('DUDE_I_AM_GAMER_THEME', theme);
            document.querySelectorAll('.theme-selector button, .theme-option').forEach(btn => {
                btn.classList.toggle('active-theme', btn.dataset.theme === theme);
            });
            const particleCanvas = document.getElementById('particle-bg-canvas');
            if (particleCanvas) {
                if (theme === 'particles') { particleCanvas.style.display = 'block'; } else { particleCanvas.style
                        .display = 'none'; }
            }
            const hackingThemes = ['dark', 'matrix', 'hacker', 'cyberpunk', 'gaming', 'retro'];
            const scanlines = document.querySelector('.scanlines');
            const glitch = document.querySelector('.glitch-overlay');
            if (scanlines && glitch) {
                if (hackingThemes.includes(theme)) { scanlines.style.display = 'block';
                    glitch.style.display = 'block'; } else { scanlines.style.display = 'none';
                    glitch.style.display = 'none'; }
            }
            const canvas = document.getElementById('matrix-canvas');
            if (canvas) {
                if (['light', 'material', 'solarized', 'cute', 'glassy', 'abstract', 'monochrome', 'ocean', 'sunset',
                        'forest', 'lavender', 'aurora'
                    ].includes(theme)) { canvas.style.opacity = '0'; } else if (theme === 'matrix') { canvas.style
                        .opacity = '0.4'; } else { canvas.style.opacity = '0.25'; }
            }
        }

        function loadTheme() { let theme = localStorage.getItem('DUDE_I_AM_GAMER_THEME') || 'dark';
            applyTheme(theme); }

        // ============================================================
        // FONT CONTROLS
        // ============================================================
        function applyFontFamily(family) {
            if (family) { document.documentElement.style.setProperty('--font-family', family);
                localStorage.setItem('DUDE_I_AM_GAMER_FONT_FAMILY', family);
                const sel = $('fontFamilySelect'); if (sel) sel.value = family; }
        }

        function applyFontSize(size) {
            if (size) { document.documentElement.setAttribute('data-font-size', size);
                localStorage.setItem('DUDE_I_AM_GAMER_FONT_SIZE', size);
                const sel = $('fontSizeSelect'); if (sel) sel.value = size; }
        }

        function loadFonts() {
            const family = localStorage.getItem('DUDE_I_AM_GAMER_FONT_FAMILY') || "'Inter','Courier New',monospace";
            const size = localStorage.getItem('DUDE_I_AM_GAMER_FONT_SIZE') || 'medium';
            applyFontFamily(family);
            applyFontSize(size);
        }

        // ============================================================
        // LOGO
        // ============================================================
        function loadLogo() {
            const logo = localStorage.getItem('DUDE_I_AM_GAMER_LOGO');
            const preview = $('logoPreview');
            if (logo) { preview.src = logo;
                preview.style.display = 'block'; } else { preview.src = '';
                preview.style.display = 'none'; }
        }

        function handleLogoUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(ev) {
                const dataUrl = ev.target.result;
                localStorage.setItem('DUDE_I_AM_GAMER_LOGO', dataUrl);
                $('logoPreview').src = dataUrl;
                $('logoPreview').style.display = 'block';
                showToast('Logo uploaded successfully!', 'success', 'Logo Updated');
            };
            reader.readAsDataURL(file);
        }

        function removeLogo() {
            localStorage.removeItem('DUDE_I_AM_GAMER_LOGO');
            $('logoPreview').src = '';
            $('logoPreview').style.display = 'none';
            $('logoUpload').value = '';
            showToast('Logo removed.', 'info', 'Logo Removed');
        }

        // ============================================================
        // CURRENCY
        // ============================================================
        function loadCurrency() {
            const val = localStorage.getItem('DUDE_I_AM_GAMER_CURRENCY') || '৳|BDT|Bangladesh';
            const parts = val.split('|');
            const sel = $('currencySelect');
            if (sel) { for (const opt of sel.options) { if (opt.value === val) { sel.value = val; break; } } }
            $('currencyDisplay').textContent = getCurrencyDisplay();
            render();
        }

        function saveCurrency() { const sel = $('currencySelect'); if (sel) { localStorage.setItem(
                    'DUDE_I_AM_GAMER_CURRENCY', sel.value);
                $('currencyDisplay').textContent = getCurrencyDisplay();
                render(); } }

        // ============================================================
        // ANIMATION TOGGLE
        // ============================================================
        function toggleAnimations(enabled) {
            const body = document.body;
            const status = document.getElementById('animStatus');
            const toggle = document.getElementById('animationsToggle');
            if (enabled === undefined) { enabled = toggle ? toggle.checked : true; }
            if (enabled) {
                body.classList.remove('no-animations');
                localStorage.setItem('DUDE_I_AM_GAMER_ANIMATIONS', 'true');
                if (status) status.textContent = 'ON';
                if (typeof window._particleStart === 'function') window._particleStart();
                if (typeof window._matrixStart === 'function') window._matrixStart();
                const theme = localStorage.getItem('DUDE_I_AM_GAMER_THEME') || 'dark';
                applyTheme(theme);
                showToast('Animations enabled', 'success', 'Animations');
            } else {
                body.classList.add('no-animations');
                localStorage.setItem('DUDE_I_AM_GAMER_ANIMATIONS', 'false');
                if (status) status.textContent = 'OFF';
                if (typeof window._particleStop === 'function') window._particleStop();
                if (typeof window._matrixStop === 'function') window._matrixStop();
                const scanlines = document.querySelector('.scanlines');
                const glitch = document.querySelector('.glitch-overlay');
                if (scanlines) scanlines.style.display = 'none';
                if (glitch) glitch.style.display = 'none';
                showToast('Animations disabled', 'info', 'Animations');
            }
            if (toggle && toggle.checked !== enabled) { toggle.checked = enabled; }
        }

        function loadAnimationsState() {
            const enabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
            const toggle = document.getElementById('animationsToggle');
            if (toggle) toggle.checked = enabled;
            toggleAnimations(enabled);
        }

        // ============================================================
        // BLUR TOGGLE
        // ============================================================
        function toggleBlur() {
            const input = document.getElementById('googleClientIdInput');
            const btn = document.getElementById('blurToggleBtn');
            if (!input || !btn) return;
            const isBlurred = input.classList.contains('blurred');
            if (isBlurred) { input.classList.remove('blurred');
                btn.textContent = '👁️ Blur';
                btn.classList.remove('primary');
                btn.classList.add('small'); } else { input.classList.add('blurred');
                btn.textContent = '👁️ Unblur';
                btn.classList.add('primary'); }
        }

        // ============================================================
        // DRIVE AUTO SYNC
        // ============================================================
        let driveAutoSyncInterval = null;
        let driveAutoSyncEnabled = false;

        function startDriveAutoSync() {
            if (driveAutoSyncInterval) { clearTimeout(driveAutoSyncInterval);
                driveAutoSyncInterval = null; }
            driveAutoSyncEnabled = true;
            localStorage.setItem('DRIVE_AUTO_SYNC', 'true');
            const statusEl = document.getElementById('driveAutoSyncStatus');
            if (statusEl) statusEl.textContent = 'On (1s)';
            const toggle = document.getElementById('driveAutoSyncToggle');
            if (toggle) toggle.checked = true;
        }

        function stopDriveAutoSync(persistState = true, silent = false) {
            if (driveAutoSyncInterval) { clearTimeout(driveAutoSyncInterval);
                driveAutoSyncInterval = null; }
            driveAutoSyncEnabled = false;
            if (persistState) localStorage.setItem('DRIVE_AUTO_SYNC', 'false');
            const statusEl = document.getElementById('driveAutoSyncStatus');
            if (statusEl) statusEl.textContent = 'Off';
            const toggle = document.getElementById('driveAutoSyncToggle');
            if (toggle) toggle.checked = false;
            if (!silent) showToast('Drive Auto Sync disabled', 'info', 'Auto Sync');
        }

        function loadDriveAutoSyncState() {
            const stored = localStorage.getItem('DRIVE_AUTO_SYNC');
            const enabled = stored === null ? true : stored === 'true';
            if (stored === null) localStorage.setItem('DRIVE_AUTO_SYNC', 'true');
            const toggle = document.getElementById('driveAutoSyncToggle');
            if (toggle) toggle.checked = enabled;
            const statusEl = document.getElementById('driveAutoSyncStatus');
            if (statusEl) statusEl.textContent = enabled ? 'On (1s)' : 'Off';
            if (enabled) { driveAutoSyncEnabled = true; if (isConnected && accessToken) startDriveAutoSync(); } else {
                driveAutoSyncEnabled = false; }
        }

        // ============================================================
        // DRIVE AUTO RESTORE
        // ============================================================
        let driveAutoRestoreInterval = null;
        let driveAutoRestoreEnabled = false;

        function startDriveAutoRestore() {
            if (driveAutoRestoreInterval) clearInterval(driveAutoRestoreInterval);
            driveAutoRestoreEnabled = true;
            driveAutoRestoreInterval = setInterval(async () => {
                if (!isConnected || !accessToken) return;
                try { await checkAndAutoRestore(); } catch (e) { console.warn('Auto restore check failed:', e); }
            }, 10000);
            localStorage.setItem('DRIVE_AUTO_RESTORE', 'true');
            const statusEl = document.getElementById('driveAutoRestoreStatus');
            if (statusEl) statusEl.textContent = 'On (10s)';
            const toggle = document.getElementById('driveAutoRestoreToggle');
            if (toggle) toggle.checked = true;
        }

        function stopDriveAutoRestore(persistState = true, silent = false) {
            if (driveAutoRestoreInterval) { clearInterval(driveAutoRestoreInterval);
                driveAutoRestoreInterval = null; }
            driveAutoRestoreEnabled = false;
            if (persistState) localStorage.setItem('DRIVE_AUTO_RESTORE', 'false');
            const statusEl = document.getElementById('driveAutoRestoreStatus');
            if (statusEl) statusEl.textContent = 'Off';
            const toggle = document.getElementById('driveAutoRestoreToggle');
            if (toggle) toggle.checked = false;
            if (!silent) showToast('Drive Auto Restore disabled', 'info', 'Auto Restore');
        }

        function loadDriveAutoRestoreState() {
            const stored = localStorage.getItem('DRIVE_AUTO_RESTORE');
            const enabled = stored === null ? true : stored === 'true';
            if (stored === null) localStorage.setItem('DRIVE_AUTO_RESTORE', 'true');
            const toggle = document.getElementById('driveAutoRestoreToggle');
            if (toggle) toggle.checked = enabled;
            const statusEl = document.getElementById('driveAutoRestoreStatus');
            if (statusEl) statusEl.textContent = enabled ? 'On (10s)' : 'Off';
            if (enabled) { driveAutoRestoreEnabled = true; if (isConnected && accessToken) startDriveAutoRestore(); } else {
                driveAutoRestoreEnabled = false; }
        }

        async function checkAndAutoRestore() {
            if (!isConnected || !accessToken || !driveAutoRestoreEnabled) return;
            if (backupDebounceTimer) return;
            try {
                const fileName = `backup-${currentUser}.json`;
                const searchResponse = await gapi.client.drive.files.list({
                    q: `name = '${fileName}' and trashed = false`,
                    fields: 'files(id, name, modifiedTime)',
                });
                const files = searchResponse.result.files || [];
                if (files.length === 0) return;
                const driveModTime = files[0].modifiedTime ? new Date(files[0].modifiedTime).getTime() : 0;
                const lastBackupTime = parseInt(localStorage.getItem('drive_last_backup_time_ms') || '0');
                if (driveModTime > lastBackupTime + 5000) {
                    showToast('Newer backup found on Drive, auto-restoring...', 'warning', 'Auto Restore');
                    await driveRestore(true);
                    localStorage.setItem('drive_last_backup_time_ms', String(driveModTime));
                    showToast('Auto restore completed successfully!', 'success', 'Auto Restore');
                }
            } catch (e) { console.warn('Auto restore check error:', e); }
        }

        // ============================================================
        // DRIVE BACKUP DEBOUNCE
        // ============================================================
        let backupDebounceTimer = null;

        function triggerDriveBackup() {
            if (!driveAutoSyncEnabled || !isConnected || !accessToken) return;
            clearTimeout(backupDebounceTimer);
            backupDebounceTimer = setTimeout(async () => {
                backupDebounceTimer = null;
                try { await driveBackup(true); } catch (e) { console.warn('Scheduled Drive backup failed:', e); }
            }, 1000);
        }

        // ============================================================
        // INVOICE SETTINGS LOAD/SAVE
        // ============================================================
        function loadInvoiceSettings() {
            const fields = {
                invTitle: 'DUDE_INV_TITLE',
                invPrefix: 'DUDE_INV_PREFIX',
                invHeader: 'DUDE_INV_HEADER',
                invFooter: 'DUDE_INV_FOOTER',
                invShowQR: 'DUDE_INV_SHOW_QR',
                invShowSeal: 'DUDE_INV_SHOW_SEAL',
                invShowCompany: 'DUDE_INV_SHOW_COMPANY',
                invShowPayment: 'DUDE_INV_SHOW_PAYMENT',
                invShowTax: 'DUDE_INV_SHOW_TAX',
                invTaxRate: 'DUDE_INV_TAX_RATE',
                invNotes: 'DUDE_INV_NOTES',
                invNumberFormat: 'DUDE_INV_NUMBER_FORMAT',
                invCurrencyPosition: 'DUDE_INV_CURRENCY_POSITION',
                invColorTheme: 'DUDE_INV_COLOR_THEME',
            };
            for (const [el, key] of Object.entries(fields)) {
                const val = localStorage.getItem(key);
                const input = document.getElementById(el);
                if (input) {
                    if (input.type === 'select-one' || input.tagName === 'SELECT') {
                        if (val !== null) input.value = val;
                        else if (['invShowQR', 'invShowSeal', 'invShowCompany', 'invShowPayment', 'invShowTax'].includes(
                                el)) input.value = '1';
                    } else {
                        if (val !== null) input.value = val;
                    }
                }
            }
            updateInvoicePreview();
        }

        function saveInvoiceSettings() {
            const fields = {
                invTitle: 'DUDE_INV_TITLE',
                invPrefix: 'DUDE_INV_PREFIX',
                invHeader: 'DUDE_INV_HEADER',
                invFooter: 'DUDE_INV_FOOTER',
                invShowQR: 'DUDE_INV_SHOW_QR',
                invShowSeal: 'DUDE_INV_SHOW_SEAL',
                invShowCompany: 'DUDE_INV_SHOW_COMPANY',
                invShowPayment: 'DUDE_INV_SHOW_PAYMENT',
                invShowTax: 'DUDE_INV_SHOW_TAX',
                invTaxRate: 'DUDE_INV_TAX_RATE',
                invNotes: 'DUDE_INV_NOTES',
                invNumberFormat: 'DUDE_INV_NUMBER_FORMAT',
                invCurrencyPosition: 'DUDE_INV_CURRENCY_POSITION',
                invColorTheme: 'DUDE_INV_COLOR_THEME',
            };
            for (const [el, key] of Object.entries(fields)) {
                const input = document.getElementById(el);
                if (input) { localStorage.setItem(key, input.value); }
            }
            updateInvoicePreview();
        }

        function updateInvoicePreview() {
            const title = document.getElementById('invTitle')?.value || 'INVOICE';
            const prefix = document.getElementById('invPrefix')?.value || 'INV';
            const header = document.getElementById('invHeader')?.value || '';
            const footer = document.getElementById('invFooter')?.value || '';
            const showQR = document.getElementById('invShowQR')?.value === '1';
            const showSeal = document.getElementById('invShowSeal')?.value === '1';
            const showTax = document.getElementById('invShowTax')?.value === '1';
            const taxRate = parseFloat(document.getElementById('invTaxRate')?.value) || 0;

            document.getElementById('invPreviewTitle').textContent = title || 'INVOICE';
            const now = new Date();
            const y = now.getFullYear(),
                m = String(now.getMonth() + 1).padStart(2, '0'),
                d = String(now.getDate()).padStart(2, '0');
            document.getElementById('invPreviewPrefix').textContent = `${prefix}-${y}${m}${d}-0001`;
            document.getElementById('invPreviewHeader').textContent = header || '(empty)';
            document.getElementById('invPreviewFooter').textContent = footer || '(empty)';
            document.getElementById('invPreviewTax').textContent = (showTax && taxRate > 0) ? taxRate + '%' : 'Not shown';
            document.getElementById('invPreviewQR').textContent = showQR ? '✅ Yes' : '❌ No';
            document.getElementById('invPreviewSeal').textContent = showSeal ? '✅ Yes' : '❌ No';
        }

        // ============================================================
        // SETTINGS
        // ============================================================
        function openSettings() {
            const storedSiteName = localStorage.getItem('DUDE_I_AM_GAMER_SITE_NAME');
            $('siteName').value = !storedSiteName || storedSiteName === 'DUDE I AM GAMER' ? 'X-TREME CORPORATION' : storedSiteName;
            $('siteSubtitle').value = localStorage.getItem('DUDE_I_AM_GAMER_SITE_SUBTITLE') || 'BUSINESS MEMO • PANEL MANAGER';
            $('companyAddress').value = localStorage.getItem('DUDE_I_AM_GAMER_ADDRESS') || '';
            $('companyPhone').value = localStorage.getItem('DUDE_I_AM_GAMER_PHONE') || '';
            $('companyEmail').value = localStorage.getItem('DUDE_I_AM_GAMER_EMAIL') || '';
            loadLogo();
            const curFamily = localStorage.getItem('DUDE_I_AM_GAMER_FONT_FAMILY') || "'Inter','Courier New',monospace";
            const curSize = localStorage.getItem('DUDE_I_AM_GAMER_FONT_SIZE') || 'medium';
            $('fontFamilySelect').value = curFamily;
            $('fontSizeSelect').value = curSize;
            const curTheme = localStorage.getItem('DUDE_I_AM_GAMER_THEME') || 'dark';
            document.querySelectorAll('.theme-option').forEach(btn => {
                btn.classList.toggle('active-theme', btn.dataset.theme === curTheme);
            });
            loadCurrency();
            const autoBackup = localStorage.getItem('DUDE_AUTO_BACKUP') === 'true';
            document.getElementById('autoBackupToggle').checked = autoBackup;
            updateAutoBackupStatus();
            loadInvoiceSettings();
            const animEnabled = localStorage.getItem('DUDE_I_AM_GAMER_ANIMATIONS') !== 'false';
            document.getElementById('animationsToggle').checked = animEnabled;
            document.getElementById('animStatus').textContent = animEnabled ? 'ON' : 'OFF';
            $('settingsModal').classList.add('show');
        }

        function closeSettings() { $('settingsModal').classList.remove('show') }

        function saveSettings() {
            localStorage.setItem('DUDE_I_AM_GAMER_SITE_NAME', $('siteName').value.trim() || 'X-TREME CORPORATION');
            localStorage.setItem('DUDE_I_AM_GAMER_SITE_SUBTITLE', $('siteSubtitle').value.trim() || 'BUSINESS MEMO • PANEL MANAGER');
            localStorage.setItem('DUDE_I_AM_GAMER_ADDRESS', $('companyAddress').value.trim());
            localStorage.setItem('DUDE_I_AM_GAMER_PHONE', $('companyPhone').value.trim());
            localStorage.setItem('DUDE_I_AM_GAMER_EMAIL', $('companyEmail').value.trim());
            applyFontFamily($('fontFamilySelect').value);
            applyFontSize($('fontSizeSelect').value);
            saveCurrency();
            const theme = document.querySelector('.theme-option.active-theme')?.dataset.theme || 'dark';
            applyTheme(theme);
            const autoBackup = document.getElementById('autoBackupToggle').checked;
            localStorage.setItem('DUDE_AUTO_BACKUP', String(autoBackup));
            updateAutoBackupStatus();
            if (autoBackup) startAutoBackup();
            else stopAutoBackup();
            const animEnabled = document.getElementById('animationsToggle').checked;
            toggleAnimations(animEnabled);
            saveInvoiceSettings();
            loadSiteName();
            closeSettings();
            render();
            showToast('Settings saved successfully!', 'success', 'Settings');
        }

        // ============================================================
        // AUTO BACKUP (Local)
        // ============================================================
        let autoBackupInterval = null;

        function updateAutoBackupStatus() {
            const status = document.getElementById('autoBackupStatus');
            const enabled = localStorage.getItem('DUDE_AUTO_BACKUP') === 'true';
            if (status) status.textContent = enabled ? '🟢 On (every 5 min)' : '⏻ Off';
        }

        function startAutoBackup() {
            if (autoBackupInterval) clearInterval(autoBackupInterval);
            autoBackupInterval = setInterval(() => {
                if (localStorage.getItem('DUDE_AUTO_BACKUP') === 'true') { backup();
                    console.log('Auto backup triggered'); }
            }, 5 * 60 * 1000);
        }

        function stopAutoBackup() { if (autoBackupInterval) { clearInterval(autoBackupInterval);
                autoBackupInterval = null; } }

        // ============================================================
        // SITE NAME
        // ============================================================
        function loadSiteName() {
            const storedSiteName = localStorage.getItem('DUDE_I_AM_GAMER_SITE_NAME');
            let n = !storedSiteName || storedSiteName === 'DUDE I AM GAMER' ? 'X-TREME CORPORATION' : storedSiteName;
            let sub = localStorage.getItem('DUDE_I_AM_GAMER_SITE_SUBTITLE') || 'BUSINESS MEMO • PANEL MANAGER';
            let p = n.split(/\s+/);
            let first = p[0] || 'X-TREME',
                rest = p.slice(1).join(' ') || 'CORPORATION';
            $('logo').innerHTML = `<span class="dude">${esc(first)}</span> <span class="iam">${esc(rest)}</span>`;
            $('siteSub').textContent = sub;
            document.title = n + ' — ' + sub;
        }

        // ============================================================
        // BACKUP
        // ============================================================
        function backup() {
            persist();
            const blob = new Blob([JSON.stringify(clients, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `backup-${currentUser}-${today()}.json`;
            a.click();
            URL.revokeObjectURL(a.href);
            showToast('Local backup exported successfully!', 'success', 'Backup');
        }

        // ============================================================
        // DATA MANAGEMENT Export / Import
        // ============================================================
        function exportAllData() {
            persist();
            const data = JSON.stringify(clients, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `full-data-${currentUser}-${today()}.json`;
            a.click();
            URL.revokeObjectURL(a.href);
            showToast('All data exported successfully!', 'success', 'Export');
        }

        function importData(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let raw = e.target.result;
                    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
                    const parsed = JSON.parse(raw);
                    let imported = null;
                    if (Array.isArray(parsed)) { imported = parsed; } else if (parsed.clients && Array.isArray(parsed
                            .clients)) { imported = parsed.clients; } else if (parsed.data && Array.isArray(parsed
                            .data)) { imported = parsed.data; } else if (typeof parsed === 'object' && parsed !==
                        null) {
                        const keys = Object.keys(parsed);
                        const allNumeric = keys.every(k => !isNaN(k) && Number(k) >= 0);
                        if (allNumeric && keys.length > 0) { imported = keys.map(k => parsed[k]); }
                    }
                    if (!imported || !Array.isArray(imported) || imported.length === 0) {
                        showToast('No client data found in the file.', 'warning', 'Import Failed');
                        return;
                    }
                    const preview = imported.slice(0, 3).map((c, i) => {
                        const name = c.name || c.Name || c.NAME || 'Unnamed';
                        const date = c.date || c.Date || c.DATE || '';
                        return `#${i+1}: ${name} (${date || 'no date'})`;
                    }).join('\n');
                    const msg =
                        `Found ${imported.length} client(s).\n\nPreview:\n${preview}\n${imported.length > 3 ? '... and more' : ''}\n\nThis will REPLACE all ${clients.length} existing clients. Continue?`;
                    if (!confirm(msg)) return;

                    // Normalize imported data, preserving sid and id separately
                    const normalized = imported.map(c => {
                        const mapField = (key) => {
                            const aliasMap = {
                                'name': ['name', 'Name', 'NAME', 'User', 'USER', 'user'],
                                'date': ['date', 'Date', 'DATE', 'Date2', 'Created'],
                                'phone': ['phone', 'Phone', 'PHONE', 'Wp Num', 'WpNum', 'wp num',
                                    'number', 'Number'
                                ],
                                'sid': ['sid', 'SID', 'Sid', 'studentId', 'StudentId'],
                                'id': ['id', 'ID', 'uuid', 'UUID'],
                                'key': ['key', 'Key', 'KEY', 'K', 'License'],
                                'price': ['price', 'Price', 'PRICE', 'total', 'Total', 'TOTAL', 'Pay',
                                    'pay', 'Pay2'
                                ],
                                'discount': ['discount', 'Discount', 'DISCOUNT', 'advance',
                                    'Advance'
                                ],
                                'paid': ['paid', 'Paid', 'PAID', 'Pay', 'pay', 'Pay2'],
                                'due': ['due', 'Due', 'DUE', 'balance', 'Balance'],
                                'limit': ['limit', 'Limit', 'LIMIT', 'duration', 'Duration'],
                                'expiry': ['expiry', 'Expiry', 'EXPIRY', 'exp', 'Exp'],
                                'note': ['note', 'Note', 'NOTE', 'remarks', 'Remarks', 'Notes'],
                                'panelTypes': ['panelTypes', 'panelType', 'PanelType', 'panel',
                                    'Panel', 'type', 'Type'
                                ],
                                'contacts': ['contacts', 'Contacts', 'contact', 'Contact'],
                                'contactDetails': ['contactDetails', 'ContactDetails',
                                    'contact_details', 'details', 'Details'
                                ],
                                'startDate': ['startDate', 'start_date', 'StartDate', 'Start'],
                                'billingCycle': ['billingCycle', 'billing_cycle', 'BillingCycle',
                                    'feeCycle'
                                ],
                                'monthlyFee': ['monthlyFee', 'monthly_fee', 'MonthlyFee',
                                    'obb_fee', 'obb'
                                ],
                                'loanMode': ['loanMode', 'loan_mode', 'LoanMode', 'installment'],
                                'kistis': ['kistis', 'Kistis', 'kisti', 'installments']
                            };
                            const lowerKey = key.toLowerCase();
                            for (const [target, aliasArr] of Object.entries(aliasMap)) {
                                if (aliasArr.some(a => a.toLowerCase() === lowerKey)) return target;
                            }
                            return key;
                        };
                        const obj = {};
                        for (const [key, value] of Object.entries(c)) {
                            if (value === undefined || value === null || value === '') continue;
                            const mapped = mapField(key);
                            if (['price', 'discount', 'paid', 'due', 'finalPrice', 'monthlyFee',
                                    'feePaid', 'feeDue'
                                ].includes(mapped)) {
                                const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
                                if (!isNaN(num)) obj[mapped] = num;
                                else obj[mapped] = value;
                            } else if (mapped === 'panelTypes' && !Array.isArray(value)) {
                                obj[mapped] = [value];
                            } else {
                                obj[mapped] = value;
                            }
                        }
                        if (obj.panelTypes && !Array.isArray(obj.panelTypes)) obj.panelTypes = [obj
                            .panelTypes
                        ];
                        if (!obj.panelTypes || obj.panelTypes.length === 0) obj.panelTypes = ['Premium'];
                        if (obj.kistis && !Array.isArray(obj.kistis)) obj.kistis = [];
                        if (!obj.kistis) obj.kistis = [];
                        if (!obj.id) obj.id = crypto.randomUUID ? crypto.randomUUID() : Date.now()
                            .toString(36) + Math.random().toString(36).slice(2);
                        if (!obj.date) obj.date = today();
                        if (!obj.limit) obj.limit = 'permanent';
                        if (!obj.expiry) obj.expiry = 'Permanent';
                        if (!obj.billingCycle) obj.billingCycle = 'one_time';
                        if (!obj.loanMode) obj.loanMode = 'off';
                        if (!obj.contacts) obj.contacts = [];
                        if (obj.finalPrice === undefined) obj.finalPrice = (obj.price || 0) - (obj
                            .discount || 0);
                        if (obj.due === undefined) obj.due = (obj.finalPrice || 0) - (obj.paid || 0);
                        if (obj.feeDue === undefined) obj.feeDue = (obj.monthlyFee || 0) - (obj
                            .feePaid || 0);
                        return obj;
                    });

                    const valid = normalized.filter(c => c.name && c.name.trim().length > 0);
                    if (valid.length === 0) { showToast('No valid client records found (all missing names).',
                            'warning', 'Import Failed'); return; }
                    if (valid.length < imported.length) {
                        if (!confirm(
                                `${imported.length - valid.length} record(s) were skipped due to missing names. Continue with ${valid.length} client(s)?`
                                )) return;
                    }
                    clients = valid;
                    persist();
                    render();
                    showToast(`✅ Successfully imported ${clients.length} clients.`, 'success', 'Import');
                } catch (err) {
                    showToast('Error parsing JSON: ' + err.message, 'error', 'Import Failed');
                    console.error('Import error:', err);
                }
            };
            reader.readAsText(file);
        }

        // ============================================================
        // USER MANAGEMENT
        // ============================================================
        function loadUsers() {
            const sel = document.getElementById('userSelect');
            if (!sel) return;
            sel.innerHTML = '';
            users.forEach(u => {
                const opt = document.createElement('option');
                opt.value = u;
                opt.textContent = u.charAt(0).toUpperCase() + u.slice(1);
                sel.appendChild(opt);
            });
            sel.value = currentUser;
        }

        function switchUser(newUser) {
            if (newUser === currentUser) return;
            persist();
            currentUser = newUser;
            localStorage.setItem(CURRENT_USER_KEY, currentUser);
            clients = loadClientsForUser(currentUser);
            trashItems = loadTrashForUser(currentUser);
            document.getElementById('userSelect').value = currentUser;
            render();
            loadSiteName();
            showToast(`Switched to user: ${newUser}`, 'info', 'User Switch');
        }

        function addUser() {
            const name = prompt('Enter new user name (e.g., reseller2):');
            if (!name || name.trim() === '') return;
            const username = name.trim().toLowerCase();
            if (users.includes(username)) { showToast('User already exists!', 'warning', 'Error'); return; }
            users.push(username);
            localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
            saveClientsForUser(username, []);
            saveTrashForUser(username, []);
            loadUsers();
            switchUser(username);
            showToast(`User "${username}" created.`, 'success', 'User Added');
        }

        function deleteUser() {
            if (users.length <= 1) { showToast('Cannot delete the last user.', 'warning', 'Error'); return; }
            const userToDelete = currentUser;
            if (!confirm(`Delete user "${userToDelete}" and all their data?`)) return;
            users = users.filter(u => u !== userToDelete);
            localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
            localStorage.removeItem(getStoreKey(userToDelete));
            localStorage.removeItem(getTrashKey(userToDelete));
            const newUser = users[0];
            switchUser(newUser);
            loadUsers();
            render();
            showToast(`User "${userToDelete}" deleted.`, 'info', 'User Deleted');
        }

        // ============================================================
        // GOOGLE DRIVE REAL OAUTH with persistent sign-in
        // ============================================================
        const SCOPES = 'https://www.googleapis.com/auth/drive.file';
        let tokenClient = null;
        let gapiInited = false;
        let gisInited = false;
        let accessToken = null;
        let isConnected = false;

        function getClientId() { return localStorage.getItem(DRIVE_CLIENT_ID_KEY) || ''; }

        function getDriveElements() {
            return {
                status: document.getElementById('driveStatus'),
                status2: document.getElementById('driveStatus2'),
                dot: document.getElementById('driveDot'),
                dot2: document.getElementById('driveDot2'),
                text: document.getElementById('driveStatusText'),
                text2: document.getElementById('driveStatusText2'),
                connectBtn: document.getElementById('googleConnectBtn'),
                connectBtn2: document.getElementById('googleConnectBtn2'),
                disconnectBtn: document.getElementById('googleDisconnectBtn2'),
                backupBtn: document.getElementById('driveBackupBtn'),
                restoreBtn: document.getElementById('driveRestoreBtn'),
                lastBackup: document.getElementById('driveLastBackup'),
                error: document.getElementById('driveError'),
            };
        }

        function updateDriveUI(connected, message) {
            const els = getDriveElements();
            const status = connected ? 'connected' : 'disconnected';
            const dotClass = connected ? 'connected' : 'disconnected';
            const text = message || (connected ? '✅ Connected to Google Drive' : 'Not connected');
            if (els.dot) els.dot.className = 'dot ' + dotClass;
            if (els.dot2) els.dot2.className = 'dot ' + dotClass;
            if (els.text) els.text.textContent = text;
            if (els.text2) els.text2.textContent = text;
            if (els.connectBtn) {
                els.connectBtn.textContent = connected ? '✅ Connected' : '🔗 Connect to Google Drive';
                els.connectBtn.classList.toggle('connected', connected);
            }
            if (els.connectBtn2) {
                els.connectBtn2.textContent = connected ? '✅ Connected' : '🔗 Connect';
                els.connectBtn2.classList.toggle('connected', connected);
            }
            if (els.disconnectBtn) { els.disconnectBtn.style.display = connected ? 'inline-flex' : 'none'; }
            if (els.backupBtn) els.backupBtn.disabled = !connected;
            if (els.restoreBtn) els.restoreBtn.disabled = !connected;
            isConnected = connected;
            localStorage.setItem('drive_connected', connected ? 'true' : 'false');
            if (connected && accessToken) {
                localStorage.setItem('drive_token', accessToken);
                setTimeout(() => {
                    loadDriveAutoSyncState();
                    loadDriveAutoRestoreState();
                    setTimeout(() => { checkAndAutoRestore(); }, 2000);
                }, 500);
            }
        }

        function setDriveError(msg) {
            const els = getDriveElements();
            if (els.error) {
                els.error.textContent = '⚠️ ' + msg;
                els.error.style.display = 'block';
                els.error.innerHTML +=
                    ' <br><small><a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#4dabf7;">Open Google Cloud Console → Credentials</a></small>';
                setTimeout(() => { if (els.error) els.error.style.display = 'none'; }, 15000);
            }
            showToast(msg, 'error', 'Drive Error');
        }

        window.gapiLoaded = function() { gapi.load('client', initializeGapiClient); };

        window.gisLoaded = function() {
            const clientId = getClientId();
            if (!clientId) {
                console.warn('Google Drive Client ID not set.');
                const els = getDriveElements();
                if (els.error) {
                    els.error.textContent = '⚠️ Please set your Google Drive Client ID in Settings.';
                    els.error.style.display = 'block';
                    els.error.style.color = '#fbbc04';
                }
                if (els.text) els.text.textContent = '⚠️ Client ID missing';
                if (els.text2) els.text2.textContent = '⚠️ Client ID missing';
                return;
            }
            try {
                if (typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
                    tokenClient = google.accounts.oauth2.initTokenClient({
                        client_id: clientId,
                        scope: SCOPES,
                        callback: tokenCallback,
                    });
                    gisInited = true;
                    console.log('GIS loaded and token client initialized.');
                    showOriginInfo();
                    // Try silent reconnect if we have a stored token
                    const savedToken = localStorage.getItem('drive_token');
                    if (savedToken && localStorage.getItem('drive_connected') === 'true') {
                        try {
                            accessToken = savedToken;
                            gapi.client.setToken({ access_token: savedToken });
                            updateDriveUI(true, '✅ Connected to Google Drive');
                            checkLastBackup();
                            setTimeout(() => {
                                loadDriveAutoSyncState();
                                loadDriveAutoRestoreState();
                                checkAndAutoRestore();
                            }, 1000);
                        } catch (e) {
                            console.warn('Silent reconnect failed:', e);
                        }
                    }
                    const els = getDriveElements();
                    if (els.text && !isConnected) { els.text.textContent = 'Client ID set. Click Connect to authenticate.'; }
                    if (els.text2 && !isConnected) { els.text2.textContent =
                            'Client ID set. Click Connect to authenticate.'; }
                } else { console.warn('Google Identity Services not available yet.'); }
            } catch (e) { console.warn('GIS init error:', e);
                setDriveError('Failed to initialize OAuth. Check your Client ID.'); }
        };

        function showOriginInfo() {
            const origin = window.location.origin;
            const els = getDriveElements();
            if (els.error && !isConnected) {
                els.error.innerHTML =
                    `ℹ️ Add <strong>${origin}</strong> to "Authorized JavaScript origins" in Google Cloud Console. <br><a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#4dabf7;">Open Console</a>`;
                els.error.style.display = 'block';
                els.error.style.color = '#fbbc04';
            }
        }

        async function initializeGapiClient() {
            try {
                await gapi.client.init({
                    apiKey: '',
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                });
                gapiInited = true;
                console.log('GAPI client initialized.');
                const savedToken = localStorage.getItem('drive_token');
                if (savedToken) {
                    try {
                        gapi.client.setToken({ access_token: savedToken });
                        accessToken = savedToken;
                        await gapi.client.drive.about.get({ fields: 'user' });
                        updateDriveUI(true, '✅ Connected to Google Drive');
                        localStorage.setItem('drive_connected', 'true');
                        checkLastBackup();
                        setTimeout(() => {
                            loadDriveAutoSyncState();
                            loadDriveAutoRestoreState();
                            checkAndAutoRestore();
                        }, 1000);
                    } catch (e) {
                        console.warn('Stored token invalid, clearing.', e);
                        localStorage.removeItem('drive_token');
                        localStorage.removeItem('drive_connected');
                        accessToken = null;
                        updateDriveUI(false, 'Session expired. Reconnect.');
                    }
                }
                showOriginInfo();
            } catch (e) { console.warn('GAPI init error:', e); }
        }

        function tokenCallback(resp) {
            if (resp.error !== undefined) {
                console.error('OAuth error:', resp);
                if (resp.error === 'access_denied') { setDriveError('Access denied. Please grant permission.'); } else if (
                    resp.error === 'unauthorized_client') { setDriveError(
                        'Client ID not authorized. Check "Authorized JavaScript origins" in Cloud Console.'
                        ); } else if (resp.error === 'redirect_uri_mismatch') { setDriveError(
                        'Redirect URI mismatch. Add your current URL to "Authorized redirect URIs" in Cloud Console.'
                        ); } else { setDriveError('Authentication failed: ' + resp.error); }
                updateDriveUI(false, '❌ Auth error');
                return;
            }
            accessToken = resp.access_token;
            gapi.client.setToken({ access_token: accessToken });
            localStorage.setItem('drive_token', accessToken);
            localStorage.setItem('drive_connected', 'true');
            updateDriveUI(true, '✅ Connected to Google Drive');
            checkLastBackup();
            loadDriveAutoSyncState();
            loadDriveAutoRestoreState();
            setTimeout(() => checkAndAutoRestore(), 1000);
            const els = getDriveElements();
            if (els.error) els.error.style.display = 'none';
            showToast('Connected to Google Drive successfully!', 'success', 'Drive Connected');
        }

        function connectToDrive() {
            const clientId = getClientId();
            if (!clientId) {
                setDriveError('Google Drive Client ID not set. Please set it in Settings → Google Drive.');
                const input = document.getElementById('googleClientIdInput');
                if (input) {
                    input.style.borderColor = '#ff6b6b';
                    input.style.boxShadow = '0 0 20px rgba(255,0,0,0.2)';
                    setTimeout(() => { input.style.borderColor = '';
                        input.style.boxShadow = ''; }, 3000);
                }
                const settingsModal = document.getElementById('settingsModal');
                if (!settingsModal.classList.contains('show')) { openSettings(); }
                return;
            }
            if (!tokenClient) {
                try {
                    if (typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
                        tokenClient = google.accounts.oauth2.initTokenClient({
                            client_id: clientId,
                            scope: SCOPES,
                            callback: tokenCallback,
                        });
                        gisInited = true;
                        console.log('Token client initialized on demand.');
                    } else { setDriveError('Google Identity Services not loaded. Please refresh the page.');
                        return; }
                } catch (e) { console.error('Token client init error:', e);
                    setDriveError('Failed to initialize OAuth. Check your Client ID.');
                    return; }
            }
            const els = getDriveElements();
            if (els.dot) els.dot.className = 'dot connecting';
            if (els.dot2) els.dot2.className = 'dot connecting';
            if (els.text) els.text.textContent = '⏳ Connecting...';
            if (els.text2) els.text2.textContent = '⏳ Connecting...';
            try {
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } catch (e) { console.error('Token request error:', e);
                setDriveError('Failed to open authentication popup. Please allow popups.');
                updateDriveUI(false, 'Connection failed'); }
        }

        function disconnectFromDrive() {
            if (accessToken) { try { google.accounts.oauth2.revoke(accessToken, () => {}); } catch (e) {} }
            accessToken = null;
            localStorage.removeItem('drive_token');
            localStorage.removeItem('drive_connected');
            gapi.client.setToken(null);
            updateDriveUI(false, 'Disconnected');
            const els = getDriveElements();
            if (els.lastBackup) els.lastBackup.textContent = '';
            showToast('Disconnected from Google Drive.', 'info', 'Drive Disconnected');
            stopDriveAutoSync(false, true);
            stopDriveAutoRestore(false, true);
        }

        async function driveBackup(silent = false) {
            if (!isConnected || !accessToken) { if (!silent) setDriveError(
                    'Not connected to Google Drive. Please connect first.'); return; }
            const els = getDriveElements();
            try {
                if (els.backupBtn && !silent) { els.backupBtn.disabled = true;
                    els.backupBtn.textContent = '⏳ Uploading...'; }
                const data = JSON.stringify(clients, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const fileName = `backup-${currentUser}.json`;
                const searchResponse = await gapi.client.drive.files.list({
                    q: `name = '${fileName}' and trashed = false`,
                    fields: 'files(id, name)',
                });
                const existingFiles = searchResponse.result.files || [];
                let fileId = null;
                if (existingFiles.length > 0) {
                    fileId = existingFiles[0].id;
                    const metadata = { name: fileName };
                    const form = new FormData();
                    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                    form.append('file', blob);
                    const response = await fetch(
                        `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {
                            method: 'PATCH',
                            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                            body: form,
                        });
                    if (!response.ok) { const err = await response.json(); throw new Error(err.error?.message ||
                            'Upload failed (HTTP ' + response.status + ')'); }
                } else {
                    const metadata = { name: fileName, parents: ['root'] };
                    const form = new FormData();
                    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                    form.append('file', blob);
                    const response = await fetch(
                        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                            method: 'POST',
                            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                            body: form,
                        });
                    if (!response.ok) { const err = await response.json(); throw new Error(err.error?.message ||
                            'Upload failed (HTTP ' + response.status + ')'); }
                    const result = await response.json();
                    fileId = result.id;
                }
                localStorage.setItem('drive_last_backup_file', fileName);
                localStorage.setItem('drive_last_backup_time', new Date().toISOString());
                localStorage.setItem('drive_last_backup_time_ms', String(Date.now()));
                if (els.lastBackup) {
                    els.lastBackup.textContent = '✅ Last backup: ' + new Date().toLocaleString() + ' (File: ' +
                        fileName + ')';
                }
                if (els.text && !silent) els.text.textContent = '✅ Connected - Last backup: ' + fileName;
                if (els.text2 && !silent) els.text2.textContent = '✅ Connected - Last backup: ' + fileName;
                if (els.backupBtn && !silent) { els.backupBtn.textContent = '⬆ Backup to Drive';
                    els.backupBtn.disabled = false; }
                if (!silent) { showToast('Backup to Drive completed successfully!', 'success', 'Drive Backup'); }
            } catch (e) {
                console.error('Backup error:', e);
                let errorMsg = e.message || 'Unknown error';
                if (!silent) {
                    setDriveError('Backup failed: ' + errorMsg);
                    if (els.backupBtn) { els.backupBtn.textContent = '⬆ Backup to Drive';
                        els.backupBtn.disabled = false; }
                }
            }
        }

        async function driveRestore(silent = false) {
            if (!isConnected || !accessToken) { if (!silent) setDriveError(
                    'Not connected to Google Drive. Please connect first.'); return; }
            const els = getDriveElements();
            try {
                if (els.restoreBtn && !silent) { els.restoreBtn.disabled = true;
                    els.restoreBtn.textContent = '⏳ Fetching...'; }
                const fileName = `backup-${currentUser}.json`;
                const searchResponse = await gapi.client.drive.files.list({
                    q: `name = '${fileName}' and trashed = false`,
                    fields: 'files(id, name, modifiedTime)',
                });
                const files = searchResponse.result.files || [];
                if (files.length === 0) {
                    if (!silent) {
                        setDriveError('No backup file found for this user: ' + fileName);
                        if (els.restoreBtn) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                            els.restoreBtn.disabled = false; }
                    }
                    return;
                }
                const file = files[0];
                const fileId = file.id;
                const modTime = file.modifiedTime ? new Date(file.modifiedTime).toLocaleString() : 'unknown';
                if (!silent) {
                    if (!confirm(
                            `Restore from "${fileName}" (modified: ${modTime})?\n\nThis will REPLACE all ${clients.length} existing clients.`
                            )) {
                        if (els.restoreBtn) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                            els.restoreBtn.disabled = false; }
                        return;
                    }
                }
                if (els.restoreBtn && !silent) els.restoreBtn.textContent = '⏳ Downloading...';
                const downloadResponse = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                        headers: { 'Authorization': 'Bearer ' + accessToken }
                    }
                );
                if (!downloadResponse.ok) { throw new Error('Download failed (HTTP ' + downloadResponse.status +
                        ')'); }
                const text = await downloadResponse.text();
                const data = JSON.parse(text);
                if (!Array.isArray(data)) { throw new Error('Invalid backup format: not an array of clients.'); }
                if (data.length === 0) {
                    if (!silent) {
                        if (!confirm('The backup file contains 0 clients. Continue?')) {
                            if (els.restoreBtn) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                                els.restoreBtn.disabled = false; }
                            return;
                        }
                    }
                }
                // Normalize imported data (same as importData) — with the fix
                const normalized = data.map(c => {
                    const mapField = (key) => {
                        const aliasMap = {
                            'name': ['name', 'Name', 'NAME', 'User', 'USER', 'user'],
                            'date': ['date', 'Date', 'DATE', 'Date2', 'Created'],
                            'phone': ['phone', 'Phone', 'PHONE', 'Wp Num', 'WpNum', 'wp num',
                                'number', 'Number'
                            ],
                            'sid': ['sid', 'SID', 'Sid', 'studentId', 'StudentId'],
                            'id': ['id', 'ID', 'uuid', 'UUID'],
                            'key': ['key', 'Key', 'KEY', 'K', 'License'],
                            'price': ['price', 'Price', 'PRICE', 'total', 'Total', 'TOTAL', 'Pay',
                                'pay', 'Pay2'
                            ],
                            'discount': ['discount', 'Discount', 'DISCOUNT', 'advance',
                                'Advance'
                            ],
                            'paid': ['paid', 'Paid', 'PAID', 'Pay', 'pay', 'Pay2'],
                            'due': ['due', 'Due', 'DUE', 'balance', 'Balance'],
                            'limit': ['limit', 'Limit', 'LIMIT', 'duration', 'Duration'],
                            'expiry': ['expiry', 'Expiry', 'EXPIRY', 'exp', 'Exp'],
                            'note': ['note', 'Note', 'NOTE', 'remarks', 'Remarks', 'Notes'],
                            'panelTypes': ['panelTypes', 'panelType', 'PanelType', 'panel',
                                'Panel', 'type', 'Type'
                            ],
                            'contacts': ['contacts', 'Contacts', 'contact', 'Contact'],
                            'contactDetails': ['contactDetails', 'ContactDetails',
                                'contact_details', 'details', 'Details'
                            ],
                            'startDate': ['startDate', 'start_date', 'StartDate', 'Start'],
                            'billingCycle': ['billingCycle', 'billing_cycle', 'BillingCycle',
                                'feeCycle'
                            ],
                            'monthlyFee': ['monthlyFee', 'monthly_fee', 'MonthlyFee',
                                'obb_fee', 'obb'
                            ],
                            'loanMode': ['loanMode', 'loan_mode', 'LoanMode', 'installment'],
                            'kistis': ['kistis', 'Kistis', 'kisti', 'installments']
                        };
                        const lowerKey = key.toLowerCase();
                        for (const [target, aliasArr] of Object.entries(aliasMap)) {
                            if (aliasArr.some(a => a.toLowerCase() === lowerKey)) return target;
                        }
                        return key;
                    };
                    const obj = {};
                    for (const [key, value] of Object.entries(c)) {
                        if (value === undefined || value === null || value === '') continue;
                        const mapped = mapField(key);
                        if (['price', 'discount', 'paid', 'due', 'finalPrice', 'monthlyFee',
                                'feePaid', 'feeDue'
                            ].includes(mapped)) {
                            const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
                            if (!isNaN(num)) obj[mapped] = num;
                            else obj[mapped] = value;
                        } else if (mapped === 'panelTypes' && !Array.isArray(value)) {
                            obj[mapped] = [value];
                        } else {
                            obj[mapped] = value;
                        }
                    }
                    if (obj.panelTypes && !Array.isArray(obj.panelTypes)) obj.panelTypes = [obj
                        .panelTypes
                    ];
                    if (!obj.panelTypes || obj.panelTypes.length === 0) obj.panelTypes = ['Premium'];
                    if (obj.kistis && !Array.isArray(obj.kistis)) obj.kistis = [];
                    if (!obj.kistis) obj.kistis = [];
                    if (!obj.id) obj.id = crypto.randomUUID ? crypto.randomUUID() : Date.now()
                        .toString(36) + Math.random().toString(36).slice(2);
                    if (!obj.date) obj.date = today();
                    if (!obj.limit) obj.limit = 'permanent';
                    if (!obj.expiry) obj.expiry = 'Permanent';
                    if (!obj.billingCycle) obj.billingCycle = 'one_time';
                    if (!obj.loanMode) obj.loanMode = 'off';
                    if (!obj.contacts) obj.contacts = [];
                    if (obj.finalPrice === undefined) obj.finalPrice = (obj.price || 0) - (obj
                        .discount || 0);
                    if (obj.due === undefined) obj.due = (obj.finalPrice || 0) - (obj.paid || 0);
                    if (obj.feeDue === undefined) obj.feeDue = (obj.monthlyFee || 0) - (obj
                        .feePaid || 0);
                    return obj;
                });
                const valid = normalized.filter(c => c.name && c.name.trim().length > 0);
                if (valid.length === 0) {
                    if (!silent) setDriveError('No valid client records found in the backup.');
                    if (els.restoreBtn && !silent) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                        els.restoreBtn.disabled = false; }
                    return;
                }
                clients = valid;
                persist();
                render();
                if (!silent) {
                    showToast(`✅ Successfully restored ${clients.length} clients from "${fileName}".`, 'success',
                        'Restore Complete');
                }
                if (els.restoreBtn && !silent) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                    els.restoreBtn.disabled = false; }
            } catch (e) {
                console.error('Restore error:', e);
                let errorMsg = e.message || 'Unknown error';
                if (!silent) {
                    setDriveError('Restore failed: ' + errorMsg);
                    if (els.restoreBtn) { els.restoreBtn.textContent = '⬇ Restore from Drive';
                        els.restoreBtn.disabled = false; }
                }
            }
        }

        function checkLastBackup() {
            const els = getDriveElements();
            const lastTime = localStorage.getItem('drive_last_backup_time');
            const lastFile = localStorage.getItem('drive_last_backup_file');
            if (lastTime && lastFile && els.lastBackup) {
                els.lastBackup.textContent = '📁 Last backup: ' + new Date(lastTime).toLocaleString() + ' (' +
                    lastFile + ')';
            } else if (els.lastBackup) {
                els.lastBackup.textContent = 'No backups yet. Click "Backup to Drive" to save your data.';
            }
        }

        // ============================================================
        // PAGE SWITCH
        // ============================================================
        function switchPage(page, btn) {
            document.querySelectorAll('main section').forEach(s => s.classList.add('hidden'));
            const target = document.getElementById(page);
            if (target) target.classList.remove('hidden');
            document.querySelectorAll('.nav button[data-page]').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            const titles = { dashboard: 'Dashboard', panels: 'Panel List', finance: 'Finance', trash: 'Trash',
                report: 'Report' };
            document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';
            render();
            // If report page, auto-generate report
            if (page === 'report') {
                setTimeout(() => generateReport(), 200);
            }
        }

        // ============================================================
        // REPORT SYSTEM
        // ============================================================
        function generateReport() {
            const period = document.getElementById('reportPeriod').value;
            const startInput = document.getElementById('reportStartDate');
            const endInput = document.getElementById('reportEndDate');
            let startDate, endDate;

            const now = new Date();
            const todayStr = today();

            if (period === 'monthly') {
                const y = now.getFullYear();
                const m = String(now.getMonth() + 1).padStart(2, '0');
                startDate = `${y}-${m}-01`;
                endDate = todayStr;
            } else if (period === 'yearly') {
                const y = now.getFullYear();
                startDate = `${y}-01-01`;
                endDate = todayStr;
            } else if (period === 'custom') {
                if (!startInput.value || !endInput.value) {
                    showToast('Please select both start and end dates for custom range.', 'warning', 'Invalid Range');
                    return;
                }
                startDate = startInput.value;
                endDate = endInput.value;
            } else { // lifetime
                startDate = '2000-01-01';
                endDate = todayStr;
            }

            // Filter clients
            const filtered = clients.filter(c => c.date >= startDate && c.date <= endDate);
            if (filtered.length === 0) {
                document.getElementById('reportContent').innerHTML =
                    `<div class="empty">No clients found for the selected period (${startDate} to ${endDate}).</div>`;
                document.getElementById('downloadReportBtn').style.display = 'none';
                return;
            }

            // Calculate summary
            const total = filtered.length;
            const active = filtered.filter(x => !countdown(x.expiry)[1]).length;
            const totalPaid = filtered.reduce((s, x) => s + (Number(x.paid) || 0), 0);
            const totalDue = filtered.reduce((s, x) => s + (Number(x.due) || 0) + (Number(x.feeDue) || 0), 0);
            const totalFinalPrice = filtered.reduce((s, x) => s + (Number(x.finalPrice) || 0), 0);
            const totalDiscount = filtered.reduce((s, x) => s + (Number(x.discount) || 0), 0);
            const totalFee = filtered.reduce((s, x) => s + (Number(x.monthlyFee) || 0), 0);

            const symbol = getCurrencySymbol();

            // Build table rows
            let tableRows = filtered.map(x => {
                const c = countdown(x.expiry);
                return `<tr>
              <td>${esc(x.date)}</td>
              <td>${esc(x.name)}</td>
              <td>${esc(x.sid||'—')}</td>
              <td>${panelList(x).map(tag).join('')}</td>
              <td>${esc(x.key)}</td>
              <td>${esc(x.limit)}</td>
              <td>${c[0]}</td>
              <td>${money(x.paid)}</td>
              <td>${money(x.due)}</td>
              <td>${money(x.finalPrice)}</td>
            </tr>`;
            }).join('');

            const reportHTML = `
            <div style="margin-bottom:12px;">
              <h2 style="color:var(--text-primary);">📊 Business Report</h2>
              <p style="color:var(--text-muted);">Period: ${startDate} to ${endDate} | Total Clients: ${total}</p>
            </div>
            <div class="report-summary">
              <div class="stat-item"><span>Total Clients</span><strong>${total}</strong></div>
              <div class="stat-item"><span>Active</span><strong>${active}</strong></div>
              <div class="stat-item"><span>Expired</span><strong>${total - active}</strong></div>
              <div class="stat-item"><span>Total Paid</span><strong>${money(totalPaid)}</strong></div>
              <div class="stat-item"><span>Total Due</span><strong>${money(totalDue)}</strong></div>
              <div class="stat-item"><span>Final Price Sum</span><strong>${money(totalFinalPrice)}</strong></div>
              <div class="stat-item"><span>Total Discount</span><strong>${money(totalDiscount)}</strong></div>
              <div class="stat-item"><span>Total Fee</span><strong>${money(totalFee)}</strong></div>
            </div>
            <div class="report-table-wrap">
              <table class="report-table">
                <thead>
                  <tr>
                    <th>Date</th><th>Name</th><th>SID</th><th>Panel</th><th>Key</th><th>Limit</th><th>Expiry</th><th>Paid</th><th>Due</th><th>Final</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>
            <div style="margin-top:16px; font-size:calc(var(--font-size-base)*0.7); color:var(--text-muted); text-align:center;">
              Generated on ${new Date().toLocaleString()} • ${esc(localStorage.getItem('DUDE_I_AM_GAMER_SITE_NAME')||'X-TREME CORPORATION')}
            </div>
          `;

            document.getElementById('reportContent').innerHTML = reportHTML;
            document.getElementById('downloadReportBtn').style.display = 'inline-flex';
            showToast(`Report generated: ${total} clients found.`, 'success', 'Report Ready');
        }

        function downloadReportPDF() {
            const reportContent = document.getElementById('reportContent');
            if (!reportContent || reportContent.querySelector('.empty')) {
                showToast('Please generate a report first.', 'warning', 'No Report');
                return;
            }

            const originalBg = reportContent.style.background;
            reportContent.style.background = '#ffffff';
            reportContent.style.color = '#000000';
            reportContent.style.border = 'none';
            reportContent.querySelectorAll('.stat-item').forEach(el => {
                el.style.background = '#f5f5f5';
                el.style.borderColor = '#ccc';
                el.style.color = '#000';
            });
            reportContent.querySelectorAll('.stat-item strong').forEach(el => el.style.color = '#000');
            reportContent.querySelectorAll('.report-table th').forEach(el => {
                el.style.background = '#eee';
                el.style.color = '#000';
            });
            reportContent.querySelectorAll('.report-table td').forEach(el => el.style.color = '#000');
            reportContent.querySelectorAll('.tag').forEach(el => {
                el.style.color = '#333';
                el.style.borderColor = '#999';
                el.style.background = '#eee';
            });

            const opt = {
                margin: 0.5,
                filename: `Business-Report-${today()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
            };

            const btn = document.getElementById('downloadReportBtn');
            btn.disabled = true;
            btn.textContent = '⏳ Generating...';

            html2pdf().from(reportContent).set(opt).save().then(() => {
                reportContent.style.background = originalBg || '';
                reportContent.style.color = '';
                reportContent.style.border = '';
                btn.disabled = false;
                btn.textContent = '⬇ Download PDF';
                showToast('Report PDF downloaded successfully!', 'success', 'Download');
            }).catch((err) => {
                console.error('PDF generation error:', err);
                reportContent.style.background = originalBg || '';
                reportContent.style.color = '';
                reportContent.style.border = '';
                btn.disabled = false;
                btn.textContent = '⬇ Download PDF';
                showToast('Failed to generate PDF: ' + err.message, 'error', 'Error');
            });
        }

        // ============================================================
        // RENDER
        // ============================================================
        function tableRow(x, contacts, showCheckbox = false, isTrash = false) {
            const c = countdown(x.expiry);
            const chkHtml = showCheckbox ?
                `<td class="chk-col"><input type="checkbox" class="${isTrash ? 'trash-checkbox' : 'client-checkbox'}" data-id="${x.id}" onchange="${isTrash ? 'updateTrashBulkState()' : 'updateSelectAllState()'}"></td>` :
                '';
            let actionHtml = '';
            if (isTrash) {
                actionHtml = `
              <td class="no-print"><div class="actions">
                <button class="btn small trash-restore-btn" onclick="restoreFromTrash('${x.id}')">↩ Restore</button>
                <button class="btn danger small" onclick="permanentDelete('${x.id}')">🗑 Permanently</button>
              </div></td>`;
            } else {
                actionHtml = `
              <td class="no-print"><div class="actions">
                <button class="btn small" onclick="viewDetail('${x.id}')">View</button>
                <button class="btn small" onclick="editClient('${x.id}')">Edit</button>
                <button class="btn danger small" onclick="deleteClient('${x.id}')">Delete</button>
                <button class="btn primary small" onclick="printInvoice('${x.id}')">🖨</button>
                <button class="btn primary small" onclick="downloadInvoice('${x.id}')">⬇</button>
              </div></td>`;
            }
            const dateDisplay = isTrash ? (x.deletedAt ? new Date(x.deletedAt).toLocaleString() : '—') : esc(x.date);
            const cols = isTrash ? `
            <td>${dateDisplay}</td>
            <td>${esc(x.date)}</td>
            <td><b>${esc(x.name)}</b><div class="sub">${esc(x.phone||'')}</div></td>
            <td>${esc(x.sid||'—')}</td>
            <td>${panelList(x).map(tag).join('')}</td>
            <td>${esc(x.key)}</td>
            <td><span class="badge ${c[1]?'expired':''}">${c[0]}</span><div class="sub">${esc(x.expiry)}</div></td>
            <td><span class="ok">${money(x.paid)}</span> / <span class="bad">${money(x.due)}</span></td>
          ` : `
            <td>${esc(x.date)}</td>
            <td><b>${esc(x.name)}</b><div class="sub">${esc(x.phone||'')}</div></td>
            <td>${esc(x.sid||'—')}</td>
            <td>${panelList(x).map(tag).join('')}<div class="sub">${esc(x.key)}</div>${panelList(x).length>1?'<div class="sub">COMBO • '+money(x.price)+'</div>':''}</td>
            ${contacts?`<td>${(x.contacts||[]).map(tag).join('')||'—'}</td>`:''}
            <td>${esc(x.limit)}</td>
            <td><span class="badge ${c[1]?'expired':''}">${c[0]}</span><div class="sub">${esc(x.expiry)}</div></td>
            <td><span class="ok">${money(x.paid)}</span> / <span class="bad">${money(x.due)}</span>${loanMini(x)}</td>
          `;
            return `<tr>${chkHtml}${cols}${actionHtml}</tr>`;
        }

        function render() {
            // Dashboard
            $('dashboardRows').innerHTML = clients.slice().reverse().slice(0, 12).map(x => tableRow(x, false, false,
                false)).join('') ||
                '<tr><td colspan="8"><div class="empty">No clients yet. Click + Add Client.</div></td></tr>';

            // Panel List with filters
            let q = ($('search')?.value || '').toLowerCase(),
                type = $('typeFilter')?.value || '',
                status = $('statusFilter')?.value || '';
            let arr = clients.filter(x => {
                let hay = [x.name, x.sid, x.key, x.phone, x.contactDetails].join(' ').toLowerCase();
                let st = countdown(x.expiry)[1] ? 'expired' : 'active';
                return (!q || hay.includes(q)) && (!type || panelList(x).includes(type)) && (!status || st ===
                    status)
            });
            $('panelRows').innerHTML = arr.map(x => tableRow(x, true, true, false)).join('') ||
                '<tr><td colspan="10"><div class="empty">No clients found.</div></td></tr>';

            // Finance
            let invQ = ($('invoiceSearch')?.value || '').toLowerCase();
            let financeData = clients;
            if (invQ) {
                financeData = clients.filter(x => {
                    const hay = [x.name, x.phone, x.sid, x.key].join(' ').toLowerCase();
                    return hay.includes(invQ);
                });
            }
            $('invoiceSearchCount').textContent = financeData.length + ' result' + (financeData.length !== 1 ? 's' :
                '');
            let total = 0,
                disc = 0,
                paid = 0,
                due = 0,
                feeDueTotal = 0;
            clients.forEach(x => { total += Number(x.price) || 0;
                disc += Number(x.discount) || 0;
                paid += Number(x.paid) || 0;
                due += Number(x.due) || 0;
                feeDueTotal += Number(x.feeDue) || 0 });
            $('stClients').textContent = clients.length;
            $('stActive').textContent = clients.filter(x => !countdown(x.expiry)[1]).length;
            $('stPaid').textContent = money(paid);
            $('stDue').textContent = money(due);
            $('financeRows').innerHTML = financeData.map(x =>
                `<tr><td><b>${esc(x.name)}</b></td><td>${panelList(x).map(tag).join('')}</td><td>${money(x.finalPrice)}</td><td>${money(x.discount)}</td><td class="ok">${money(x.paid)}</td><td class="bad">${money(x.due)}</td><td>${x.billingCycle==='quarterly'?'3 Months / OBB':x.billingCycle==='monthly'?'Monthly':'Off'}</td><td>${money(x.monthlyFee||0)}</td><td class="ok">${money(x.feePaid||0)}</td><td class="bad">${money(x.feeDue||0)}</td><td class="no-print"><button class="btn primary small" onclick="printInvoice('${x.id}')">🖨</button><button class="btn primary small" onclick="downloadInvoice('${x.id}')">⬇</button></td></tr>`
                ).join('') || '<tr><td colspan="11"><div class="empty">No payment records found.</div></td></tr>';
            $('fTotal').textContent = money(total);
            $('fDiscount').textContent = money(disc);
            $('fPaid').textContent = money(paid);
            $('fDue').textContent = money(due);
            $('fFeeDue').textContent = money(feeDueTotal);

            const symbol = getCurrencySymbol();
            document.querySelectorAll('#priceCurrencySymbol, #discountCurrencySymbol, #paidCurrencySymbol, #monthlyFeeCurrencySymbol, #feePaidCurrencySymbol')
                .forEach(el => { if (el) el.textContent = symbol; });

            updateMoreStats();
            updateTrashCount();

            // Trash
            let trashQ = ($('trashSearch')?.value || '').toLowerCase();
            let trashFiltered = trashItems;
            if (trashQ) {
                trashFiltered = trashItems.filter(x => {
                    const hay = [x.name, x.sid, x.key, x.phone].join(' ').toLowerCase();
                    return hay.includes(trashQ);
                });
            }
            $('trashRows').innerHTML = trashFiltered.map(x => tableRow(x, false, true, true)).join('') ||
                '<tr><td colspan="10"><div class="empty">Trash is empty.</div></td></tr>';
            const trashCount = trashItems.length;
            document.getElementById('trashCountInfo').textContent = trashCount + ' item' + (trashCount !== 1 ? 's' :
                '');
            document.getElementById('trashCountNav').textContent = trashCount;

            updateSelectAllState();
            updateDeleteButtonState();
            updateTrashBulkState();
        }

        // ============================================================
        // DELETE SELECTED CLIENTS (move to trash)
        // ============================================================
        function deleteSelectedClients() {
            const checked = document.querySelectorAll('.client-checkbox:checked');
            if (checked.length === 0) { showToast('No clients selected.', 'warning', 'Select First'); return; }
            if (!confirm(`Move ${checked.length} selected client(s) to trash?`)) return;
            const ids = Array.from(checked).map(cb => cb.dataset.id);
            const toTrash = clients.filter(c => ids.includes(c.id));
            const remaining = clients.filter(c => !ids.includes(c.id));
            toTrash.forEach(c => moveToTrash(c));
            clients = remaining;
            persist();
            document.getElementById('selectAll').checked = false;
            updateDeleteButtonState();
            render();
            showToast(`Moved ${toTrash.length} client(s) to trash.`, 'warning', 'Trashed');
        }

        // ============================================================
        // INIT
        // ============================================================
        document.querySelectorAll('.nav button[data-page]').forEach(b => b.addEventListener('click', () => switchPage(b
            .dataset.page, b)));

        // Trash page button
        document.querySelector('.nav button[data-page="trash"]')?.addEventListener('click', function() {
            switchPage('trash', this);
        });

        document.getElementById('addBtn').onclick = openAdd;
        document.getElementById('closeClient').onclick = closeClient;
        document.getElementById('cancelClient').onclick = closeClient;
        document.getElementById('closeDetail').onclick = closeDetail;
        document.getElementById('nameBtn').onclick = openSettings;
        document.getElementById('closeSettings').onclick = closeSettings;
        document.getElementById('cancelSettings').onclick = closeSettings;
        document.getElementById('saveSettings').onclick = saveSettings;
        document.getElementById('currencySelect').addEventListener('change', saveCurrency);
        document.getElementById('userSelect').addEventListener('change', function() { switchUser(this.value); });
        document.getElementById('addUserBtn').addEventListener('click', addUser);
        document.getElementById('deleteUserBtn').addEventListener('click', deleteUser);

        // Report event listeners
        document.getElementById('reportPeriod').addEventListener('change', function() {
            const customRange = document.getElementById('customDateRange');
            if (this.value === 'custom') { customRange.style.display = 'flex'; } else { customRange.style.display =
                    'none'; }
        });
        document.getElementById('generateReportBtn').addEventListener('click', generateReport);
        document.getElementById('downloadReportBtn').addEventListener('click', downloadReportPDF);

        document.querySelectorAll('.theme-selector button').forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                applyTheme(theme);
                document.querySelectorAll('.theme-option').forEach(b => b.classList.toggle('active-theme', b
                    .dataset.theme === theme));
            });
        });
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                applyTheme(theme);
                document.querySelectorAll('.theme-selector button').forEach(b => b.classList.toggle(
                    'active-theme', b.dataset.theme === theme));
            });
        });

        document.getElementById('fontFamilySelect').addEventListener('change', function() { applyFontFamily(this.value); });
        document.getElementById('fontSizeSelect').addEventListener('change', function() { applyFontSize(this.value); });
        document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);
        document.getElementById('removeLogoBtn').addEventListener('click', removeLogo);
        document.getElementById('backupBtn').onclick = backup;
        document.getElementById('exportDataBtn').addEventListener('click', exportAllData);
        document.getElementById('importDataBtn').addEventListener('click', function() {
            document.getElementById('importFileInput').click();
        });
        document.getElementById('importFileInput').addEventListener('change', function(e) {
            if (this.files && this.files.length > 0) { importData(this.files[0]);
                this.value = ''; }
        });
        document.getElementById('clientForm').addEventListener('submit', saveClient);
        document.getElementById('addKistiBtn').addEventListener('click', addKisti);
        document.getElementById('loanMode').addEventListener('change', () => { if (document.getElementById('loanMode')
                .value === 'off') { window.currentKistis = [];
                renderKistis([]) }
            updateKistiPreview(window.currentKistis || []) });

        ['limit', 'startDate', 'customExpiry', 'customAmount', 'customUnit'].forEach(id => document.getElementById(id)
            .addEventListener('input', updateExpiry));
        document.getElementById('billingCycle').addEventListener('change', () => calcPayment(false));
        document.getElementById('monthlyFee').addEventListener('input', () => calcPayment(false));
        document.getElementById('feePaid').addEventListener('input', () => calcPayment(false));
        document.getElementById('feeStartDate').addEventListener('input', () => calcPayment(false));
        ['price', 'discount', 'paid'].forEach(id => document.getElementById(id).addEventListener('input', () => calcPayment(
            true)));

        document.querySelectorAll('.panel-option').forEach(c => c.addEventListener('change', function() {
            updateDropdownDisplay('panelDropdown', '.panel-option', 'value');
            updatePanelFeesFromDropdown();
        }));
        document.querySelectorAll('.contact-option').forEach(c => c.addEventListener('change', function() {
            updateDropdownDisplay('contactDropdown', '.contact-option', 'value');
            updateContactsFromDropdown();
        }));

        ['search', 'typeFilter', 'statusFilter'].forEach(id => document.getElementById(id).addEventListener('input',
        render));
        document.getElementById('invoiceSearch').addEventListener('input', render);
        document.getElementById('clearInvoiceSearch').addEventListener('click', function() {
            document.getElementById('invoiceSearch').value = '';
            render();
        });
        document.getElementById('trashSearch').addEventListener('input', render);

        // Restore selected from trash buttons (already in HTML)
        // They are defined with onclick in the toolbar

        document.getElementById('signOutBtn').onclick = async () => {
            if (supabaseClient) await supabaseClient.auth.signOut();
        };

        function setupDriveEvents() {
            const connectBtn1 = document.getElementById('googleConnectBtn');
            const connectBtn2 = document.getElementById('googleConnectBtn2');
            if (connectBtn1) connectBtn1.addEventListener('click', connectToDrive);
            if (connectBtn2) connectBtn2.addEventListener('click', connectToDrive);
            const disconnectBtn = document.getElementById('googleDisconnectBtn2');
            if (disconnectBtn) disconnectBtn.addEventListener('click', disconnectFromDrive);
            const backupBtn = document.getElementById('driveBackupBtn');
            const restoreBtn = document.getElementById('driveRestoreBtn');
            if (backupBtn) backupBtn.addEventListener('click', () => driveBackup(false));
            if (restoreBtn) restoreBtn.addEventListener('click', () => driveRestore(false));
            const closeDrive1 = document.getElementById('closeGoogleDrive');
            const closeDrive2 = document.getElementById('closeGoogleDrive2');
            if (closeDrive1) closeDrive1.addEventListener('click', () => document.getElementById('googleDriveModal')
                .classList.remove('show'));
            if (closeDrive2) closeDrive2.addEventListener('click', () => document.getElementById('googleDriveModal')
                .classList.remove('show'));
            const savedConnected = localStorage.getItem('drive_connected') === 'true';
            const savedToken = localStorage.getItem('drive_token');
            if (savedConnected && savedToken) {
                accessToken = savedToken;
                updateDriveUI(true, '✅ Connected to Google Drive');
                checkLastBackup();
                setTimeout(() => {
                    loadDriveAutoSyncState();
                    loadDriveAutoRestoreState();
                    checkAndAutoRestore();
                }, 300);
            } else {
                loadDriveAutoSyncState();
                loadDriveAutoRestoreState();
            }
        }
        document.getElementById('animationsToggle').addEventListener('change', function() {
            toggleAnimations(this.checked);
            document.getElementById('animStatus').textContent = this.checked ? 'ON' : 'OFF';
        });

        ['invTitle', 'invPrefix', 'invHeader', 'invFooter', 'invShowQR', 'invShowSeal', 'invShowCompany',
            'invShowPayment', 'invShowTax', 'invTaxRate', 'invNotes', 'invNumberFormat', 'invCurrencyPosition',
            'invColorTheme'
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', updateInvoicePreview);
                el.addEventListener('change', updateInvoicePreview);
            }
        });

        if (localStorage.getItem('DUDE_AUTO_BACKUP') === 'true') { startAutoBackup();
            updateAutoBackupStatus(); }

        let renderInterval = setInterval(render, 3000);
        window.addEventListener('beforeunload', function() {
            if (renderInterval) clearInterval(renderInterval);
            stopAutoBackup();
            stopDriveAutoSync(false, true);
            stopDriveAutoRestore(false, true);
            persist();
        });

        window.currentKistis = [];
        loadUsers();
        loadTheme();
        loadFonts();
        loadSiteName();
        loadLogo();
        loadCurrency();
        loadAnimationsState();
        loadInvoiceSettings();

        if (localStorage.getItem('DRIVE_AUTO_SYNC') === null) { localStorage.setItem('DRIVE_AUTO_SYNC', 'true'); }
        if (localStorage.getItem('DRIVE_AUTO_RESTORE') === null) { localStorage.setItem('DRIVE_AUTO_RESTORE', 'true'); }

        setTimeout(() => {
            loadDriveAutoSyncState();
            loadDriveAutoRestoreState();
            setTimeout(() => {
                if (isConnected && accessToken) { checkAndAutoRestore(); }
            }, 3000);
        }, 300);

        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('panels').classList.add('hidden');
        document.getElementById('finance').classList.add('hidden');
        document.getElementById('trash').classList.add('hidden');
        document.getElementById('report').classList.add('hidden');
        document.getElementById('pageTitle').textContent = 'Dashboard';
        render();

        const savedToken = localStorage.getItem('drive_token');
        if (savedToken) {
            accessToken = savedToken;
            if (localStorage.getItem('drive_connected') === 'true') {
                updateDriveUI(true, '✅ Connected to Google Drive');
                checkLastBackup();
                setTimeout(() => {
                    loadDriveAutoSyncState();
                    loadDriveAutoRestoreState();
                    setTimeout(() => {
                        if (isConnected && accessToken) { checkAndAutoRestore(); }
                    }, 2000);
                }, 500);
            }
        }

        const clientIdOnLoad = getClientId();
        if (!clientIdOnLoad) {
            const els = getDriveElements();
            if (els.error) {
                els.error.textContent = '⚠️ Please set your Google Drive Client ID in Settings → Google Drive.';
                els.error.style.display = 'block';
                els.error.style.color = '#fbbc04';
            }
            if (els.text) els.text.textContent = '⚠️ Client ID missing';
            if (els.text2) els.text2.textContent = '⚠️ Client ID missing';
        } else {
            if (!tokenClient) {
                try {
                    if (typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
                        tokenClient = google.accounts.oauth2.initTokenClient({
                            client_id: clientIdOnLoad,
                            scope: SCOPES,
                            callback: tokenCallback,
                        });
                        gisInited = true;
                        console.log('Token client initialized on load.');
                        const els = getDriveElements();
                        if (els.text && !isConnected) { els.text.textContent =
                                'Client ID set. Click Connect to authenticate.'; }
                        if (els.text2 && !isConnected) { els.text2.textContent =
                                'Client ID set. Click Connect to authenticate.'; }
                    }
                } catch (e) { console.warn('Failed to init token client on load:', e); }
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { document.querySelectorAll('.modal.show').forEach(m => m.classList.remove(
                    'show')); }
        });

        setTimeout(() => {
            showToast('Welcome to X-TREME CORPORATION Business Memo!', 'info', '👋 Welcome', 3000);
        }, 500);

        let authSignUpMode = false;

        function setAuthError(message) {
            const error = document.getElementById('authError');
            if (error) error.textContent = message || '';
        }

        async function bootstrapAuth() {
            if (!supabaseClient) {
                setAuthError('Add your Supabase URL and anon key in supabase-config.js first.');
                document.getElementById('authSubmit').disabled = true;
                return;
            }
            supabaseClient.auth.onAuthStateChange(async (_event, session) => {
                authUser = session?.user || null;
                if (!authUser) {
                    document.body.classList.add('auth-locked');
                    return;
                }
                try {
                    await loadCloudData();
                    document.body.classList.remove('auth-locked');
                    render();
                    loadUsers();
                } catch (error) {
                    setAuthError('Could not load your cloud data: ' + error.message);
                }
            });
            const { data, error } = await supabaseClient.auth.getSession();
            if (error) setAuthError(error.message);
            authUser = data.session?.user || null;
            if (authUser) {
                try {
                    await loadCloudData();
                    document.body.classList.remove('auth-locked');
                    render();
                } catch (loadError) {
                    setAuthError('Could not load your cloud data: ' + loadError.message);
                }
            }
        }

        document.getElementById('authModeToggle').addEventListener('click', () => {
            authSignUpMode = !authSignUpMode;
            document.getElementById('authTitle').textContent = authSignUpMode ? 'Create your account' : 'Welcome back';
            document.getElementById('authSubmit').textContent = authSignUpMode ? 'Create account' : 'Sign in';
            document.getElementById('authModeToggle').textContent = authSignUpMode ? 'I already have an account' : 'Create account';
            document.getElementById('authPassword').autocomplete = authSignUpMode ? 'new-password' : 'current-password';
            setAuthError('');
        });

        document.getElementById('authForm').addEventListener('submit', async event => {
            event.preventDefault();
            if (!supabaseClient) return;
            const submit = document.getElementById('authSubmit');
            submit.disabled = true;
            setAuthError('');
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value;
            const result = authSignUpMode ? await supabaseClient.auth.signUp({ email, password }) : await supabaseClient.auth.signInWithPassword({ email, password });
            submit.disabled = false;
            if (result.error) { setAuthError(result.error.message); return; }
            if (authSignUpMode && !result.data.session) setAuthError('Account created. Check your email to confirm, then sign in.');
        });

        bootstrapAuth();
    
