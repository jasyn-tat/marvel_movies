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

    // 2. SAVE PROGRESS, UPDATE OPACITY, & TRIGGER CONFETTI ON CLICK
    checkboxes.forEach((checkbox) => {
        // FIXED: Added 'e' inside the parentheses here so the browser can track the mouse click event
        checkbox.addEventListener("change", (e) => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateRowOpacity(checkbox);

            // Only shoot confetti when checking the box
            if (checkbox.checked) {
                // FIXED: Changed event to e to perfectly match the event listener argument above
                const xPosition = e.clientX / window.innerWidth;
                const yPosition = e.clientY / window.innerHeight;

                confetti({
                    particleCount: 30,
                    spread: 60,
                    origin: { x: xPosition, y: yPosition },
                    colors: ['#e50914', '#ffffff', '#a0a5b5'] // Marvel Colors
                });
            }
        });
    });
});
