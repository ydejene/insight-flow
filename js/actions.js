// Create a form field using DOM methods.
function createFormField(labelText, name, value, type = "text") {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.htmlFor = name;
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = name;
    input.name = name;
    input.value = value;
    input.required = true;

    if (name === "score") {
        input.min = "0";
        input.max = "100";
        input.step = "1";
    }

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return { wrapper, input };
}

// Create the reusable Add/Edit employee form.
function createEmployeeForm(employee = null) {
    const isEditing = employee !== null;

    const form = document.createElement("form");
    form.className = "employee-form";

    // Name field
    const nameField = createFormField(
        "Employee Name",
        "employee-name",
        isEditing ? employee.name : ""
    );

    // Role field
    const roleField = createFormField(
        "Employee Role",
        "employee-role",
        isEditing ? employee.role : ""
    );

    // Score field
    const scoreField = createFormField(
        "Performance Score (0-100)",
        "employee-score",
        isEditing ? employee.score : "",
        "number"
    );

    // Error message
    const errorMessage = document.createElement("p");
    errorMessage.className = "form-error";
    errorMessage.setAttribute("role", "alert");

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "submit-btn";
    submitButton.textContent = isEditing
        ? "Save Changes"
        : "Add Employee";

    // Cancel button
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "cancel-btn";
    cancelButton.textContent = "Cancel";

    // Add fields and buttons to the form.
    form.appendChild(nameField.wrapper);
    form.appendChild(roleField.wrapper);
    form.appendChild(scoreField.wrapper);
    form.appendChild(errorMessage);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    // Close the modal when Cancel is clicked.
    cancelButton.addEventListener("click", () => {
        closeModal();
    });

    // Handle form submission.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameField.input.value.trim();
        const role = roleField.input.value.trim();
        const scoreText = scoreField.input.value.trim();
        const score = Number(scoreText);

        // Validate name.
        if (name === "") {
            errorMessage.textContent =
                "Please enter the employee's name.";
            nameField.input.focus();
            return;
        }

        // Validate role.
        if (role === "") {
            errorMessage.textContent =
                "Please enter the employee's role.";
            roleField.input.focus();
            return;
        }

        // Validate score.
        if (
            scoreText === "" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            errorMessage.textContent =
                "Score must be a number between 0 and 100.";
            scoreField.input.focus();
            return;
        }

        // Update the existing employee or add a new one.
        if (isEditing) {
            const existingEmployee = employees.find(
                emp => emp.id === employee.id
            );

            if (!existingEmployee) {
                errorMessage.textContent =
                    "Employee not found. Please close and try again.";
                return;
            }

            existingEmployee.name = name;
            existingEmployee.role = role;
            existingEmployee.score = score;
        } else {
            employees.push({
                id: nextId++,
                name: name,
                role: role,
                score: score
            });
        }

        // Close the modal and refresh the dashboard.
        closeModal();
        renderAll();
    });

    return form;
}

// Open a modal to edit an existing employee.
function openEditModal(id) {
    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        console.error("Employee not found:", id);
        return;
    }

    const form = createEmployeeForm(employee);

    openModal("Edit Employee", form);
}

// Open a modal to add a new employee.
function openAddModal() {
    const form = createEmployeeForm();

    openModal("Add Employee", form);
}

// Delete an employee from the shared array.
function deleteEmployee(id) {
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        console.error("Employee not found:", id);
        return;
    }

    employees.splice(index, 1);

    // Refresh the table and summary.
    renderAll();
}
