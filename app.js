document.addEventListener("DOMContentLoaded", function() {
  const navTop = document.querySelector('.nav-top');
  const navBottom = document.querySelector('.nav-bottom');
  const hero = document.querySelector('.hero');

  function sticky() {
    const { top } = navBottom.getBoundingClientRect();
    let xPos = -navTop.offsetHeight;
    xPos += top;
    navBottom.style.transform = `translateX(${-xPos}px)`;
    hero.classList.toggle('border', xPos !== 0);
  }

  window.addEventListener('scroll', sticky);
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".sections section");
    const container = document.querySelector(".sections");

    let isScrolling = false;
    
    container.addEventListener("scroll", () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                let closestSection = null;
                let minDistance = Number.MAX_VALUE;

                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const distance = Math.abs(rect.top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSection = section;
                    }
                });

                if (closestSection) {
                    closestSection.scrollIntoView({ behavior: "smooth" });
                }

                isScrolling = false;
            }, 200);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-bottom a");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let activeSection = entry.target.getAttribute("id");

                    // Remove underline from all links
                    navLinks.forEach((link) => {
                        link.style.borderBottom = "none";
                    });

                    // Find the corresponding link and underline it
                    let activeLink = document.querySelector(`.nav-bottom a[href="#${activeSection}"]`);
                    if (activeLink) {
                        activeLink.style.borderBottom = "1px solid var(--active)";
                    }
                }
            });
        },
        { threshold: 0.6 } // 60% of section must be visible
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});

