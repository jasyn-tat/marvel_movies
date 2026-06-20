document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('#marvel-list input[type="checkbox"]');

    function updateRowOpacity(checkbox) {
        const row = checkbox.closest('.checklist-item');
        if (row) {
            row.style.opacity = checkbox.checked ? "0.4" : "1";
        }
    }

    // 1. LOAD SAVED CHECKMARKS ON REFRESH
    checkboxes.forEach((checkbox) => {
        const isChecked = localStorage.getItem(checkbox.id) === "true";
        checkbox.checked = isChecked;
        updateRowOpacity(checkbox);
    });

    // 2. SAVE PROGRESS AND UPDATE OPACITY ON CLICK
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateRowOpacity(checkbox);
        });
    });
});
