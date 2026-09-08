// ================================
// Portfolio JavaScript
// ================================


// =================================
// Dynamic Hero Text
// =================================

const dynamicText = document.getElementById("dynamicText");

const roles = [
    "CS Student",
    "Frontend Developer",
    "CodeAlpha Intern",
    "Web Development Learner"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;


function typeRole() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {

        dynamicText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentRole.length) {

            isDeleting = true;

            setTimeout(typeRole, 1600);

            return;
        }

    } else {

        dynamicText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            isDeleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }


    const typingSpeed =
        isDeleting ? 55 : 95;

    setTimeout(typeRole, typingSpeed);
}


typeRole();



// =================================
// Smooth Navigation
// =================================

const navLinks =
    document.querySelectorAll(".nav-links a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");


        if (
            targetId &&
            targetId.startsWith("#")
        ) {

            event.preventDefault();


            const target =
                document.querySelector(targetId);


            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});



// =================================
// Active Navigation Link
// =================================

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");


        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


updateActiveNav();



// =================================
// Scroll Reveal Animation
// =================================

const revealElements =
    document.querySelectorAll(
        ".about-card, " +
        ".skill-card, " +
        ".experience-card, " +
        ".education-card, " +
        ".project-card, " +
        ".contact-card"
    );


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;


        if (elementTop < windowHeight - 80) {

            element.classList.add("show");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();



// =================================
// Add Active Navigation Style
// =================================

const style =
    document.createElement("style");


style.textContent = `

    .nav-links a.active {
        color: #8b9cff;
    }

    .about-card,
    .skill-card,
    .experience-card,
    .education-card,
    .project-card,
    .contact-card {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
    }

    .about-card.show,
    .skill-card.show,
    .experience-card.show,
    .education-card.show,
    .project-card.show,
    .contact-card.show {
        opacity: 1;
        transform: translateY(0);
    }

`;


document.head.appendChild(style);



// =================================
// Hero Button Interaction
// =================================

const projectButton =
    document.querySelector(
        '.primary-button'
    );


const contactButton =
    document.querySelector(
        '.secondary-button'
    );


if (projectButton) {

    projectButton.addEventListener(
        "click",
        function () {

            const projects =
                document.getElementById(
                    "projects"
                );


            if (projects) {

                projects.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


if (contactButton) {

    contactButton.addEventListener(
        "click",
        function () {

            const contact =
                document.getElementById(
                    "contact"
                );


            if (contact) {

                contact.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}



// =================================
// Profile Card Mouse Effect
// =================================

const profileCard =
    document.querySelector(
        ".profile-card"
    );


if (profileCard) {

    profileCard.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                profileCard.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -6;

            const rotateY =
                ((x / rect.width) - 0.5) * 6;


            profileCard.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    profileCard.addEventListener(
        "mouseleave",
        function () {

            profileCard.style.transform =
                "perspective(800px) rotateX(0) rotateY(0)";

        }
    );

}