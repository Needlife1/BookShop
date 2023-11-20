const body = document.querySelector("body");
const switcher = document.querySelector(".box-toggle");
let isDark = false;

switcher.addEventListener("click", changeTheme);

function changeTheme() {
    if (isDark) {
        isDark = false;
        localStorage.removeItem("ui-theme");

        body.classList.remove("dark-theme");
        switcher.classList.remove("active");
    } else { 
        isDark = true;
        localStorage.setItem("ui-theme", "dark");

        body.classList.add("dark-theme");
        switcher.classList.add("active");
    }
}

window.addEventListener("load", () => {
    if (localStorage.getItem("ui-theme")) { 
        body.classList.add("dark-theme");
        switcher.classList.add("active");
    }
});

const scrollUpButton = document.querySelector(".scroll-up-btn");

scrollUpButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});

window.addEventListener("scroll", () => {
    if (scrollY >= 220) {
        scrollUpButton.classList.remove("hide");
    } else {
        scrollUpButton.classList.add("hide");
    }
});
