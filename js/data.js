const employees = [
    { id: 1, name: "David Mugisha", role: "Developer", score: 88 },
    { id: 2, name: "Mufaro Kunze", role: "Designer", score: 73 },
    { id: 3, name: "Chibueze Onugha", role: "Project Manager", score: 91 },
    { id: 4, name: "Yonas Dejene", role: "QA Engineer", score: 64 }
];

let nextId = 5;

const state = { search: "", role: "All", sortKey: null, sortDir: "asc" };