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

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");

    // Mouse wheel scrolling
    slider.addEventListener("wheel", (event) => {
        event.preventDefault();
        slider.scrollBy({
            left: event.deltaY * 2, // Adjust scroll speed
            behavior: "smooth"
        });
        resetAutoScroll();
    });

    // Dragging functionality
    let isDragging = false;
    let startX, scrollLeft;

    // Mouse dragging
    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        resetAutoScroll();
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust drag speed
        slider.scrollLeft = scrollLeft - walk;
    });

    ["mouseup", "mouseleave"].forEach((event) => {
        slider.addEventListener(event, () => {
            isDragging = false;
            slider.classList.remove("dragging");
        });
    });

    // Touch dragging
    let touchStartX, touchScrollLeft;

    slider.addEventListener("touchstart", (e) => {
        isDragging = true;
        slider.classList.add("dragging");
        touchStartX = e.touches[0].pageX - slider.offsetLeft;
        touchScrollLeft = slider.scrollLeft;
        resetAutoScroll();
    });

    slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touchX = e.touches[0].pageX - slider.offsetLeft;
        const walk = (touchX - touchStartX) * 2; // Adjust drag speed
        slider.scrollLeft = touchScrollLeft - walk;
    });

    slider.addEventListener("touchend", () => {
        isDragging = false;
        slider.classList.remove("dragging");
    });

    // Auto-scroll setup
    let scrollDirection = 1;
    let autoScrollInterval;
    const scrollSpeed = .1;
    const edgeBuffer = 10; // Small buffer to prevent stuttering at edges

    function startAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (!isDragging && exploreSectionInView) {
                slider.scrollBy({ left: scrollSpeed * scrollDirection, behavior: "smooth" });

                // Reverse direction when close to the edges
                if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - edgeBuffer) {
                    scrollDirection = -1;
                } else if (slider.scrollLeft <= edgeBuffer) {
                    scrollDirection = 1;
                }
            }
        }, 1700); // Adjust speed of auto-scroll
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        setTimeout(startAutoScroll, 2500); // Restart auto-scroll after 3 seconds of inactivity
    }

    // Start auto-scroll initially
    startAutoScroll();

    // Detect when the explore section is in view
    const exploreSection = document.querySelector("#explore"); // Assuming your explore page has the ID 'explore'
    let exploreSectionInView = true;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target === exploreSection) {
                    if (entry.isIntersecting) {
                        exploreSectionInView = true; // Explore section is in view
                    } else {
                        exploreSectionInView = false; // Explore section is out of view
                    }
                }
            });
        },
        { threshold: 0.5 } // Trigger when at least 50% of the section is visible
    );

    observer.observe(exploreSection);
});




