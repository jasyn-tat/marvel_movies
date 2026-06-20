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
    checkbox.addEventListener("change", (event) => {
      localStorage.setItem(checkbox.id, checkbox.checked);
      updateRowOpacity(checkbox);

      // Only shoot confetti when checking the box, not unchecking it
      if (checkbox.checked) {
        // Find where the click happened on the screen to target the burst
        const xPosition = event.clientX / window.innerWidth;
        const yPosition = event.clientY / window.innerHeight;

        confetti({
          particleCount: 30,      // Number of confetti pieces per click
          spread: 60,             // How wide the pieces spray outward
          origin: { x: xPosition, y: yPosition }, // Shoots right from your mouse click!
          colors: ['#e50914', '#ffffff', '#a0a5b5'] // Marvel Red, White, and Silver
        });
      }
    });
  });
});
