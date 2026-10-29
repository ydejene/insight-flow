// table.js
// Draws the table inside #table-container

function renderTable() {
  const container = document.getElementById("table-container");
  container.innerHTML = "";

  const table = document.createElement("table");

  // ----- Header row -----
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "score", label: "Score" }
  ];

  columns.forEach(function (col) {
    const th = document.createElement("th");
    th.textContent = col.label;
    th.dataset.key = col.key;
    headerRow.appendChild(th);
  });

  const actionsTh = document.createElement("th");
  actionsTh.textContent = "Actions";
  headerRow.appendChild(actionsTh);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // ----- Body rows -----
  const tbody = document.createElement("tbody");
  const list = getVisibleEmployees();

  list.forEach(function (emp) {
    const tr = document.createElement("tr");
    tr.classList.add(getScoreClass(emp.score));

    const nameTd = document.createElement("td");
    nameTd.textContent = emp.name;

    const roleTd = document.createElement("td");
    roleTd.textContent = emp.role;

    const scoreTd = document.createElement("td");
    scoreTd.textContent = emp.score;

    const actionsTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function () {
      openEditModal(emp.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteEmployee(emp.id);
    });

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(nameTd);
    tr.appendChild(roleTd);
    tr.appendChild(scoreTd);
    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}