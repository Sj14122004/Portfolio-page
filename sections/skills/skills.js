function initSkills() {

    const buttons = document.querySelectorAll(".filters button");
    const nodes = document.querySelectorAll(".node");
    const orbit = document.querySelector(".orbit-container");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            // 🔥 Change orbit theme
            orbit.classList.remove(
                "frontend-theme",
                "backend-theme",
                "database-theme",
                "tools-theme"
            );

            if (filter !== "all") {
                orbit.classList.add(filter + "-theme");
            }

            // Existing filtering code
            nodes.forEach(node => {

                if (filter === "all" || node.classList.contains(filter)) {
                    node.classList.remove("hide");
                } else {
                    node.classList.add("hide");
                }

            });

        });

    });

}