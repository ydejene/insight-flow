function updateSummary() {
    const container = document.getElementById("summary");
    container.innerHTML = "";

    const total = employees.length;

    let average = 0;
    let topName = "N/A";

    if (total > 0) {
        const sum = employees.reduce((acc, emp) => acc + emp.score, 0);
        average = (sum / total).toFixed(1);

        const top = employees.reduce((best, emp) =>
            emp.score > best.score ? emp : best
        );
        topName = top.name;
    } else {
        average = "0.0";
    }

    const card = document.createElement("div");
    card.classList.add("summary-card");

    const stats = [
        ["Total Employees", total],
        ["Average Score", average],
        ["Top Performer", topName]
    ];

    stats.forEach(([label, value]) => {
        const stat = document.createElement("div");
        stat.classList.add("summary-stat");

        const valueEl = document.createElement("span");
        valueEl.classList.add("summary-value");
        valueEl.textContent = value;

        const labelEl = document.createElement("span");
        labelEl.classList.add("summary-label");
        labelEl.textContent = label;

        stat.append(valueEl, labelEl);
        card.appendChild(stat);
    });

    container.appendChild(card);
}