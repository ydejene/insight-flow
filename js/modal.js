// modal.js by Mufaro Kunze
// It will be a reusale modal, with an overlay, click outside to close, close button, Esc key.

let lastFocusedElement = null;

function openModal(titleText, contentEl) {
    closeModal();

    lastFocusedElement = document.activeElement;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const box = document.createElement("div");
    box.className = "modal-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "modal-title");

    const header = document.createElement("div");
    header.className = "modal-header";

    const title = document.createElement("h2");
    title.id = "modal-title";
    title.textContent = titleText;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "modal-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.textContent = "x";
    closeBtn.addEventListener("click", closeModal);

    header.appendChild(title);
    header.appendChild(closeBtn);
    box.appendChild(header);
    box.appendChild(contentEl);
    overlay.appendChild(box);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener("keydown", handleModalKeydown); 
    document.body.appendChild(overlay);

    const firstInput = box.querySelector("input, select, textarea");
    (firstInput || closeBtn).focus();
}

function closeModal() {
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) overlay.parentNode.removeChild(overlay);

    document.removeEventListener("keydown", handleModalKeydown);
    if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
}

function handleModalKeydown(e) {
    if (e.key === "Escape") closeModal();
}