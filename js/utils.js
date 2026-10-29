function getScoreClass(score) {
  if (score >= 85) return "score-high";
  if (score >= 70) return "score-mid";
  return "score-low";
}

function getVisibleEmployees() {
  const query = state.search.trim().toLowerCase();

  let result = employees.filter(function (emp) {
    const matchesName = emp.name.toLowerCase().includes(query);
    const matchesRole = state.role === "All" || emp.role === state.role;
    return matchesName && matchesRole;
  });

  if (state.sortKey) {
    const key = state.sortKey;
    const direction = state.sortDir === "asc" ? 1 : -1;

    result.sort(function (a, b) {
      if (key === "score") {
        return (a.score - b.score) * direction;
      }
      return String(a[key]).localeCompare(String(b[key])) * direction;
    });
  }

  return result;
}

function toggleSort(key) {
  if (state.sortKey === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = key;
    state.sortDir = "asc";
  }
  renderAll();
}

function initSortHandlers() {
  const container = document.getElementById("table-container");
  if (!container) return;

  container.addEventListener("click", function (e) {
    const th = e.target.closest("th");
    if (!th || !th.dataset.key) return;
    toggleSort(th.dataset.key);
  });
}

document.addEventListener("DOMContentLoaded", initSortHandlers);