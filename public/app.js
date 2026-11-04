/* Sai Akash Neela — portfolio interactions. Plain JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'portfolio_theme_v1';
  var GH_URL = 'https://git-history.mrsan.workers.dev';
  var GH_CACHE = 'sai_akash_git_history_v1';
  var GH_TTL = 1000 * 60 * 60 * 2; // 2 hours

  function store(method, key, value) {
    try { return method === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, value); }
    catch (e) { return null; }
  }

  /* ---------- Theme: system preference by default, manual override remembered ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    if (themeBtn) themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(root.classList.contains('dark'));
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = !root.classList.contains('dark');
      applyTheme(dark);
      store('set', THEME_KEY, dark ? 'dark' : 'light');
    });
  }
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (!store('get', THEME_KEY)) applyTheme(e.matches); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Email popover ---------- */
  var emailWrap = document.querySelector('.email');
  if (emailWrap) {
    var emailBtn = emailWrap.querySelector('button[aria-haspopup]');
    var menu = emailWrap.querySelector('.popover');
    var setOpen = function (open) {
      menu.hidden = !open;
      emailBtn.setAttribute('aria-expanded', String(open));
    };
    emailBtn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(menu.hidden); });
    document.addEventListener('click', function (e) { if (!menu.hidden && !emailWrap.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setOpen(false); emailBtn.focus(); } });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    menu.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var text = btn.getAttribute('data-copy');
        var done = function () {
          btn.classList.add('is-copied');
          setTimeout(function () { btn.classList.remove('is-copied'); }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
        else done();
      });
    });
  }

  /* ---------- Articles: expand / collapse, deep links ---------- */
  function setPost(post, open) {
    post.classList.toggle('is-open', open);
    var btn = post.querySelector('.post__toggle');
    if (btn) {
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('span').textContent = open ? 'Collapse' : 'Read Article';
    }
  }
  document.querySelectorAll('.post').forEach(function (post) {
    var btn = post.querySelector('.post__toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = !post.classList.contains('is-open');
      if (open) document.querySelectorAll('.post.is-open').forEach(function (p) { if (p !== post) setPost(p, false); });
      setPost(post, open);
    });
  });
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.classList.contains('post')) {
      setPost(el, true);
      requestAnimationFrame(function () { el.scrollIntoView({ block: 'start' }); });
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- GitHub contribution heatmap ---------- */
  var grid = document.querySelector('[data-gh-grid]');
  if (!grid) return;
  var monthsEl = document.querySelector('[data-gh-months]');
  var summary = document.querySelector('[data-gh-summary]');
  var tip = document.querySelector('[data-gh-tip]');

  function level(c) { return c === 0 ? 0 : c <= 2 ? 1 : c <= 4 ? 2 : c <= 6 ? 3 : 4; }
  function ordinal(d) {
    if (d > 3 && d < 21) return 'th';
    return ['th', 'st', 'nd', 'rd'][d % 10] || 'th';
  }
  function fmt(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.getDate() + ordinal(d.getDate()) + ' ' + d.toLocaleString('en-GB', { month: 'short' });
  }
  function emptyDays(n) {
    var out = [], today = new Date();
    for (var i = n - 1; i >= 0; i--) {
      var d = new Date(today); d.setDate(d.getDate() - i);
      out.push({ date: d.toISOString().slice(0, 10), count: 0 });
    }
    return out;
  }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }

  function showTip(cell) {
    var r = cell.getBoundingClientRect();
    var n = Number(cell.getAttribute('data-count'));
    tip.textContent = n + (n === 1 ? ' contribution' : ' contributions') + ' on ' + fmt(cell.getAttribute('data-date'));
    tip.style.left = (r.left + r.width / 2) + 'px';
    tip.style.top = r.top + 'px';
    tip.hidden = false;
  }
  function hideTip() { tip.hidden = true; }

  function render(data, live) {
    var start = new Date(data[0].date + 'T00:00:00').getDay();
    var cells = [];
    for (var p = 0; p < start; p++) cells.push(null);
    cells = cells.concat(data);
    var weeks = [];
    for (var i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    var gFrag = document.createDocumentFragment(), mFrag = document.createDocumentFragment();
    var lastMonth = -1, total = 0;
    weeks.forEach(function (week) {
      var col = el('div', 'gh__week'), label = el('div');
      var first = week.filter(Boolean)[0];
      if (first) {
        var m = new Date(first.date + 'T00:00:00').getMonth();
        if (m !== lastMonth) {
          var s = el('span'); s.textContent = new Date(first.date + 'T00:00:00').toLocaleString('en-GB', { month: 'short' });
          label.appendChild(s); lastMonth = m;
        }
      }
      week.forEach(function (day) {
        if (!day) { col.appendChild(el('span', 'gh__cell gh__cell--pad')); return; }
        total += day.count;
        var b = el('button', 'gh__cell');
        b.type = 'button';
        b.setAttribute('data-l', String(level(day.count)));
        b.setAttribute('data-count', String(day.count));
        b.setAttribute('data-date', day.date);
        b.setAttribute('aria-label', day.count + ' contributions on ' + day.date);
        col.appendChild(b);
      });
      gFrag.appendChild(col); mFrag.appendChild(label);
    });
    grid.replaceChildren(gFrag);
    monthsEl.replaceChildren(mFrag);
    if (summary) summary.textContent = live ? total + ' contributions in the last 6 months' : 'Live activity is unavailable right now. See it on GitHub.';
    var scroller = grid.parentElement;
    scroller.scrollLeft = scroller.scrollWidth;
  }

  grid.addEventListener('mouseover', function (e) { if (e.target.matches('button.gh__cell')) showTip(e.target); });
  grid.addEventListener('focusin', function (e) { if (e.target.matches('button.gh__cell')) showTip(e.target); });
  grid.addEventListener('click', function (e) { if (e.target.matches('button.gh__cell')) showTip(e.target); });
  grid.addEventListener('mouseleave', hideTip);
  grid.addEventListener('focusout', hideTip);
  window.addEventListener('scroll', hideTip, { passive: true });

  var cached = null;
  try {
    var raw = store('get', GH_CACHE);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.data) && parsed.data.length && Date.now() - parsed.timestamp < GH_TTL) cached = parsed.data;
    }
  } catch (e) { cached = null; }

  if (cached) { render(cached, true); return; }
  render(emptyDays(182), false);
  if (summary) summary.textContent = 'Fetching commits…';

  var ctrl = 'AbortController' in window ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 10000);
  fetch(GH_URL, { headers: { Accept: 'application/json' }, signal: ctrl ? ctrl.signal : undefined })
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) {
      if (!Array.isArray(data) || !data.length) throw new Error('empty');
      var recent = data.slice(-182);
      render(recent, true);
      store('set', GH_CACHE, JSON.stringify({ timestamp: Date.now(), data: recent }));
    })
    .catch(function () { render(emptyDays(182), false); })
    .finally(function () { clearTimeout(timer); });
})();
