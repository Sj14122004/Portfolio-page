async function loadSection(id, file) {
    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;

    // Wait for the browser to update the DOM
    await new Promise(resolve => requestAnimationFrame(resolve));
}

async function initWebsite() {

    await loadSection("home", "sections/home/home.html");
    await loadSection("about", "sections/about/about.html");
    await loadSection("skills", "sections/skills/skills.html");
    await loadSection("projects", "sections/projects/projects.html");
    await loadSection("contact","sections/contact/contact.html")
    initSkills();
    const navbar = document.querySelector(".navbar");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add("hide");
        } else {
            navbar.classList.remove("hide");
        }

        lastScroll = currentScroll;
    });

    initAnimations();
}

initWebsite();

function initAnimations() {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.25
    });

    document.querySelectorAll(".hidden").forEach(section => {
        observer.observe(section);
    });

}