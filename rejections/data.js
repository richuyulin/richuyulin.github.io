// 1,000 Rejection Challenge log
// Add one entry per ask. Outcome is "No", "Ghosted", "Pending", or "Yes".
// "No" and "Ghosted" both count toward the 1,000 goal (log a ghost after
// ~2 weeks or one unanswered follow-up); "Yes" entries are surprise wins.
// "Pending" means still waiting on an answer — it counts as an ask only,
// and gets updated to another outcome once the answer comes in.
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
const CHALLENGE_START = "2026-10-19";

const REJECTIONS = [
  {
    id: 1,
    date: "Oct 19, 2026",
    dateISO: "2026-10-19",
    ask: "Asked StudyStream to waive the $2,000 fee for their AI Builders Programme",
    category: "Career",
    outcome: "No",
    note: "The fee couldn't be waived, but they clarified it's only paid if I'm offered a place, offered to discuss a payment plan, and encouraged me to apply before the Nov 1 deadline."
  },
  {
    id: 2,
    date: "Oct 19, 2026",
    dateISO: "2026-10-19",
    ask: "Asked HR for a recommendation letter before my last day in my marketing role",
    category: "Career",
    outcome: "Pending",
    note: "Sent a summary of my responsibilities and key projects to make it easy to write."
  },
];
