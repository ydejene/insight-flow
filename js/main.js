function renderRoleFilter() {
    const select = document.getElementById("role-filter");
    const roles = ["All", ...new Set(employees.map(e => e.role))];

    // If the selected role no longer exists (e.g. last one was deleted), reset
    if (!roles.includes(state.role)) state.role = "All";

    select.innerHTML = "";
    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role === "All" ? "All Roles" : role;
        select.appendChild(option);
    });
    select.value = state.role;
}

function renderAll() {
    renderRoleFilter();
    renderTable();
    updateSummary();
}

function initControls() {
    document.getElementById("search").addEventListener("input", e => {
        state.search = e.target.value;
        renderAll();
    });

    document.getElementById("role-filter").addEventListener("change", e => {
        state.role = e.target.value;
        renderAll();
    });

    document.getElementById("add-btn").addEventListener("click", () => {
        openAddModal();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initControls();
    renderAll();
});