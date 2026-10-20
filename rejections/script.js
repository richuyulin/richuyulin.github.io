// GOAL, CHALLENGE_START and REJECTIONS are defined in data.js, loaded before this script

// Nav scroll effect
const writingNav = document.getElementById('writing-nav');
window.addEventListener('scroll', () => {
  writingNav.classList.toggle('scrolled', window.scrollY > 20);
});

const GRADIENTS = [
  'linear-gradient(180deg, var(--peach), var(--mint))',
  'linear-gradient(180deg, var(--pink), var(--peach))',
  'linear-gradient(180deg, var(--lavender), var(--pink))',
  'linear-gradient(180deg, var(--mint), var(--lavender))',
];
function getGradient(index) { return GRADIENTS[index % GRADIENTS.length]; }

const DAY_MS = 24 * 60 * 60 * 1000;
function toDay(iso) { return Math.floor(Date.parse(iso + 'T00:00:00Z') / DAY_MS); }
function todayDay() {
  const now = new Date();
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY_MS);
}

// Consecutive days (ending today or yesterday) with at least one ask
function currentStreak() {
  const days = new Set(REJECTIONS.map(r => toDay(r.dateISO)));
  let day = todayDay();
  if (!days.has(day)) day -= 1;
  let streak = 0;
  while (days.has(day)) { streak++; day--; }
  return streak;
}

// Progress bar and headline stats (always across the full log)
function renderProgress() {
  const rejections = REJECTIONS.filter(r => r.outcome === 'No' || r.outcome === 'Ghosted').length;
  const yeses = REJECTIONS.filter(r => r.outcome === 'Yes').length;
  const pct = Math.min(100, (rejections / GOAL) * 100);

  document.getElementById('prog-count').textContent = rejections.toLocaleString();
  document.getElementById('prog-goal').textContent = GOAL.toLocaleString();
  document.getElementById('prog-pct').textContent =
    (pct > 0 && pct < 1 ? pct.toFixed(1) : Math.floor(pct)) + '% complete';
  requestAnimationFrame(() => {
    document.getElementById('prog-fill').style.width = pct + '%';
  });

  const marks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(GOAL * f));
  document.getElementById('prog-milestones').innerHTML = marks
    .map(m => `<span class="${rejections >= m && m > 0 ? 'hit' : ''}">${m.toLocaleString()}</span>`)
    .join('');

  document.getElementById('stat-asks').textContent = REJECTIONS.length.toLocaleString();
  document.getElementById('stat-yes').textContent = yeses.toLocaleString();
  document.getElementById('stat-streak').textContent = currentStreak();
  document.getElementById('stat-days').textContent = Math.max(1, todayDay() - toDay(CHALLENGE_START) + 1);
}

// Build category filter chips from the log
function buildCategoryChips() {
  const categories = [...new Set(REJECTIONS.map(r => r.category))].sort();
  const chipsEl = document.getElementById('rj-category-chips');
  if (!categories.length) return;
  const all = document.createElement('button');
  all.className = 'filter-chip tag-chip active';
  all.dataset.category = 'all';
  all.textContent = 'All Categories';
  chipsEl.appendChild(all);
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip tag-chip';
    btn.dataset.category = category;
    btn.textContent = category;
    chipsEl.appendChild(btn);
  });
}

// Render a single ask
function renderCard(entry, index) {
  const OUTCOMES = { No: ['no', 'Rejected'], Ghosted: ['ghosted', 'Ghosted'], Pending: ['pending', 'Pending'], Yes: ['yes', 'Surprise Yes'] };
  const [cls, label] = OUTCOMES[entry.outcome] || OUTCOMES.No;
  return `
    <div class="blog-card fade-in">
      <div class="blog-card-accent" style="background: ${getGradient(index)}"></div>
      <div class="blog-card-body">
        <div class="blog-card-top">
          <span class="rj-num">Ask #${entry.id}</span>
          <span class="blog-card-date">${entry.date}</span>
        </div>
        <h3>${entry.ask}</h3>
        <div class="blog-meta-row">
          <span class="rj-outcome ${cls}">${label}</span>
          <span class="blog-badge">${entry.category}</span>
        </div>
        ${entry.note ? `<p class="rj-note">${entry.note}</p>` : ''}
        ${entry.autoGhosted ? `<p class="rj-note"><em>No reply after ${GHOST_AFTER_DAYS} days — automatically marked as ghosted.</em></p>` : ''}
      </div>
    </div>`;
}

// Main render / filter
function renderLog() {
  const query    = document.getElementById('rj-search').value.toLowerCase().trim();
  const outcome  = document.querySelector('#rj-outcome-chips .filter-chip.active')?.dataset.outcome || 'all';
  const category = document.querySelector('#rj-category-chips .tag-chip.active')?.dataset.category || 'all';
  const sort     = document.getElementById('rj-sort').value;

  const filtered = REJECTIONS.filter(r => {
    const matchOutcome  = outcome === 'all' || r.outcome === outcome;
    const matchCategory = category === 'all' || r.category === category;
    const matchText = !query ||
      r.ask.toLowerCase().includes(query) ||
      (r.note || '').toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query);
    return matchOutcome && matchCategory && matchText;
  });

  filtered.sort((a, b) => {
    const byDate = a.dateISO === b.dateISO ? a.id - b.id : (a.dateISO < b.dateISO ? -1 : 1);
    return sort === 'oldest' ? byDate : -byDate;
  });

  const grid  = document.getElementById('rj-grid');
  const empty = document.getElementById('rj-empty');

  grid.innerHTML = filtered.map((entry, i) => renderCard(entry, i)).join('');
  empty.style.display = filtered.length ? 'none' : 'block';
  empty.innerHTML = REJECTIONS.length
    ? '<p>No asks match your search. Try a different keyword or filter.</p>'
    : '<p>The challenge has just begun — the first rejection is on its way.</p>';
}

// Wire up controls
renderProgress();
buildCategoryChips();
document.getElementById('rj-search').addEventListener('input', renderLog);
document.getElementById('rj-sort').addEventListener('change', renderLog);
['rj-outcome-chips', 'rj-category-chips'].forEach(id => {
  document.getElementById(id).addEventListener('click', e => {
    if (!e.target.classList.contains('filter-chip')) return;
    document.querySelectorAll(`#${id} .filter-chip`).forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    renderLog();
  });
});

renderLog();
