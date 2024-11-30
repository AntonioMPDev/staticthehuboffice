function toggleMenu() {
    const navigationMenu = document.getElementById("navigation-menu");
    if (navigationMenu.classList.contains("open")) {
        document.body.classList.remove("menu-opened");
        navigationMenu.classList.remove("open");
    } else {
        document.body.classList.add("menu-opened");

        navigationMenu.classList.add("open");
    }
}

function initializeMenuToggle() {
    const menuButton = document.getElementById("menu-button");
    menuButton.addEventListener("click", toggleMenu);
}

function addCloseMenuIcon() {
    const navigationMenu = document.querySelector("#navigation-menu ul");
    const menuIcon = document.createElement("div");
    menuIcon.innerHTML = '+';
    menuIcon.addEventListener("click", toggleMenu);
    menuIcon.id = "close-menu-button";
    navigationMenu.appendChild(menuIcon);
}

function scrollEventInitializer() {
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        const header = document.getElementById("header-web");

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            header.classList.add("sticky");
        } else {
            if (currentScroll < 300) {
                header.classList.remove("sticky");
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative values
    });
}

function initializeHero() {
    // add hero overlay after #hero-video-container
    const heroVideoContainer = document.getElementById("hero-video-container");
    const heroOverlay = document.createElement("div");
    heroOverlay.classList.add("hero-overlay");
    const loadingGif = document.createElement("img");
    loadingGif.src = "/wp-content/uploads/2024/11/loading.gif";
    loadingGif.classList.add("loading-gif");
    heroOverlay.appendChild(loadingGif);
    if (heroVideoContainer) {
        heroVideoContainer.parentNode.insertBefore(heroOverlay, heroVideoContainer.nextSibling);

        // detect tablet or mobile
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;
        if (isMobile) {
            const currentVideo = heroVideoContainer.querySelector("video");
            // Wait until currentVideo.src is not empty
            const observer = new MutationObserver(function (_) {
                if (currentVideo.src !== "") {
                    const newSrc = currentVideo.src.replace(".mp4", "mobile.mp4");
                    currentVideo.src = newSrc;
                    observer.disconnect();
                    heroOverlay.remove();
                }
            });

            observer.observe(currentVideo, { attributes: true, attributeFilter: ["src"] });
        } else {
            heroOverlay.remove();
        }
    }
}

function initPortfolioTabs() {
    // Variables and functions
    const allTabs = document.querySelectorAll(".portfolio-tabs-container a");
    const allTabsContent = document.querySelectorAll(".content-tab");
    const haveTabs = allTabs.length > 0 && allTabsContent.length > 0;
    const markActive = (tab) => {
        allTabs.forEach(tab => {
            tab.classList.remove("active-tab");
        })
        tab.classList.add("active-tab");
    }
    const onTabClicked = (tab, cb) => {
        tab.addEventListener("click", cb);
    }
    const displayActiveClickedTab = (e) => {
        allTabsContent.forEach(content => {
            content.style.display = "flex";
            if (!content.classList.contains(e.target.id)) {
                content.style.display = "none";
            }
        })
    }
    const displayAllTabs = () => {
        allTabsContent.forEach(content => {
            content.style.display = "flex";
        })
    }
    const tabClickedCb = (e) => {
        markActive(e.target);
        if (e.target.id !== "all") {
            displayActiveClickedTab(e);
        } else {
            displayAllTabs();
        }
    }

    // Execution
    if (haveTabs) {
        allTabs.forEach(tab => {
            onTabClicked(tab, tabClickedCb)
        })
    }
}


function initialize() {
    addCloseMenuIcon();
    initializeMenuToggle();
    scrollEventInitializer();
    initializeHero();
    initPortfolioTabs();
}

document.addEventListener("DOMContentLoaded", initialize);

