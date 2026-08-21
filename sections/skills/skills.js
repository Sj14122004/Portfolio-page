function initSkills() {

    const buttons = document.querySelectorAll(".filters button");
    const nodes = Array.from(document.querySelectorAll(".node"));
    const orbit = document.querySelector(".orbit-container");

    if (!orbit || nodes.length === 0) {
        return;
    }


    /* =========================================================
       ORBIT CONFIGURATION
    ========================================================= */

    const rings = [
        115,
        175,
        235,
        295
    ];


    /* =========================================================
       POSITION ALL SKILLS
    ========================================================= */

    function positionNodes() {

        const visibleNodes = nodes.filter(
            node => !node.classList.contains("hide")
        );

        if (visibleNodes.length === 0) {
            return;
        }


        /* -----------------------------------------------------
           Divide skills between rings
        ----------------------------------------------------- */

        const ringGroups = [];

        rings.forEach(() => {
            ringGroups.push([]);
        });


        visibleNodes.forEach((node, index) => {

            const ringIndex =
                index % rings.length;

            ringGroups[ringIndex].push(node);

        });


        /* -----------------------------------------------------
           Position each ring
        ----------------------------------------------------- */

        ringGroups.forEach((group, ringIndex) => {

            const radius = rings[ringIndex];

            const total = group.length;

            if (total === 0) {
                return;
            }


            /* Start each ring at a different angle */

            const offset =
                ringIndex * 25;


            group.forEach((node, index) => {

                const angle =
                    offset +
                    (360 / total) * index;


                node.style.setProperty(
                    "--angle",
                    `${angle}deg`
                );


                node.style.setProperty(
                    "--radius",
                    `${radius}px`
                );

            });

        });

    }


    /* =========================================================
       FILTERING
    ========================================================= */

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            /* ---------------------------------------------
               Active button
            --------------------------------------------- */

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* ---------------------------------------------
               Get filter
            --------------------------------------------- */

            const filter =
                button.dataset.filter;


            /* ---------------------------------------------
               Remove old themes
            --------------------------------------------- */

            orbit.classList.remove(
                "frontend-theme",
                "backend-theme",
                "database-theme",
                "ai-theme",
                "languages-theme",
                "tools-theme",
                "animation-theme"
            );


            /* ---------------------------------------------
               Add current theme
            --------------------------------------------- */

            if (
                filter &&
                filter !== "all"
            ) {

                orbit.classList.add(
                    `${filter}-theme`
                );

            }


            /* ---------------------------------------------
               Show / hide skills
            --------------------------------------------- */

            nodes.forEach(node => {

                const shouldShow =
                    filter === "all" ||
                    node.classList.contains(filter);


                if (shouldShow) {

                    node.classList.remove("hide");

                } else {

                    node.classList.add("hide");

                }

            });


            /* ---------------------------------------------
               Recalculate positions
            --------------------------------------------- */

            positionNodes();

        });

    });


    /* =========================================================
       INITIAL POSITION
    ========================================================= */

    positionNodes();


    /* =========================================================
       RESPONSIVE UPDATE
    ========================================================= */

    window.addEventListener(
        "resize",
        positionNodes
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initSkills
    );

} else {

    initSkills();

}