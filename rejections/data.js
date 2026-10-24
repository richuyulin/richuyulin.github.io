// 1,000 Rejection Challenge log
// Add one entry per ask. Outcome is "No", "Ghosted", "Pending", or "Yes".
// "No" and "Ghosted" both count toward the 1,000 goal (log a ghost after
// ~2 weeks or one unanswered follow-up); "Yes" entries are surprise wins.
// "Pending" means still waiting on an answer — it counts as an ask only,
// and gets updated to another outcome once the answer comes in. A pending
// ask with no update after GHOST_AFTER_DAYS is shown as "Ghosted" automatically.
//
// Example:
// {
//   id: 1,
//   date: "Oct 19, 2026",
//   dateISO: "2026-10-19",
//   ask: "Asked a coffee shop for a free refill on a large latte",
//   category: "Everyday",
//   outcome: "No",
//   note: "Polite no, but they offered a discount next time"
// },

const GOAL = 1000;
const CHALLENGE_START = "2026-10-18";

const REJECTIONS = [
  {
    id: 1,
    date: "Oct 18, 2026",
    dateISO: "2026-10-18",
    ask: "Asked a co-worker at my part-time Tim Hortons job to switch shifts with me",
    category: "Work",
    outcome: "Yes",
    note: "A win-win: I got to go home 2 hours earlier, and he got the extra hours and pay he wanted."
  },
  {
    id: 2,
    date: "Oct 19, 2026",
    dateISO: "2026-10-19",
    ask: "Asked StudyStream to waive the $2,000 fee for their AI Builders Programme",
    category: "Career",
    outcome: "No",
    note: "The fee couldn't be waived, but they clarified it's only paid if I'm offered a place, offered to discuss a payment plan, and encouraged me to apply before the Nov 1 deadline."
  },
  {
    id: 3,
    date: "Oct 19, 2026",
    dateISO: "2026-10-19",
    ask: "Asked HR for a recommendation letter before my last day in my marketing role",
    category: "Career",
    outcome: "Pending",
    note: "Sent a summary of my responsibilities and key projects to make it easy to write. HR said yes the same day and promised the letter by the end of October — still waiting on it."
  },
  {
    id: 4,
    date: "Oct 19, 2026",
    dateISO: "2026-10-19",
    ask: "Asked a Sephora employee to shade match me for foundation as a total makeup newbie",
    category: "Everyday",
    outcome: "Yes",
    note: "They happily helped — turns out I'm a perfect match for Rare Beauty shade 9."
  },
  {
    id: 5,
    date: "Oct 20, 2026",
    dateISO: "2026-10-20",
    ask: "Asked a co-worker for a recommendation letter the day before my last day",
    category: "Career",
    outcome: "No",
    note: "Offered to write one for him in return. He politely passed, saying he didn't feel he was the best person to write it, and wished me well on my next chapter."
  },
  {
    id: 6,
    date: "Oct 20, 2026",
    dateISO: "2026-10-20",
    ask: "Asked my boss for a recommendation letter the day before my last day",
    category: "Career",
    outcome: "No",
    note: "Right after my last no, I asked again. Instead of writing one himself, he told me to draft my own and have HR prepare it — but I'd already secured HR's letter and was hoping for one from him."
  },
];

// Auto-ghost: pending asks older than GHOST_AFTER_DAYS count as ghosted
const GHOST_AFTER_DAYS = 14;
(function () {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  REJECTIONS.forEach(r => {
    const age = (today - Date.parse(r.dateISO + 'T00:00:00Z')) / 86400000;
    if (r.outcome === 'Pending' && age >= GHOST_AFTER_DAYS) {
      r.outcome = 'Ghosted';
      r.autoGhosted = true;
    }
  });
})();
