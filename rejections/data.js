// 1,000 Rejection Challenge log
// Add one entry per ask. Outcome is "No", "Ghosted", or "Yes".
// "No" and "Ghosted" both count toward the 1,000 goal (log a ghost after
// ~2 weeks or one unanswered follow-up); "Yes" entries are surprise wins.
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
];
