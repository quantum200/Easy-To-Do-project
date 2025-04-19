const darkThemeClass = "theme-dark";
const lightThemeClass = "theme-light";
const classButtonSelected = "button-selected";

const themelight = document.querySelector(".theme-light");
const themedark = document.querySelector(".theme-dark");
const themeauto = document.querySelector(".theme-auto");

const theme = {
    dark: "dark",
    light: "light",
    auto: "auto",
};

const setTheme = (mode) => {
    localStorage.setItem("theme", mode);

    switch (mode) {
        case theme.dark: {
            document.body.classList.add("theme-dark");
            document.body.classList.remove("theme-light");
            document.body.classList.remove("theme-auto");
            document.body.style.backgroundColor = "#121212";

            themedark.classList.add("button-selected");
            themelight.classList.remove("button-selected");
            themeauto.classList.remove("button-selected");
            return;
        }

        case theme.light: {
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
            document.body.classList.remove("theme-auto");
            document.body.style.backgroundColor = "#FDF5E6";
            document.body.style.color = "#696969";

            themelight.classList.add("button-selected");
            themedark.classList.remove("button-selected");
            themeauto.classList.remove("button-selected");
            return;
        }

        case theme.auto:
        default: {
            document.body.classList.add("theme-auto");
            document.body.classList.remove("theme-dark");
            document.body.classList.remove("theme-light");

            const isDark = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (isDark) {
                document.body.classList.add("theme-dark");
                document.body.classList.remove("theme-light");
                document.body.style.backgroundColor = "#121212";
            } else {
                document.body.classList.add("theme-light");
                document.body.classList.remove("theme-dark");
                document.body.style.backgroundColor = "#FDF5E6";
                document.body.style.color = "#696969";
            }

            themeauto.classList.add("button-selected");
            themelight.classList.remove("button-selected");
            themedark.classList.remove("button-selected");
        }
    }
};

const initTheme = () => {
    const savedTheme = localStorage.getItem("theme") || theme.auto;
    setTheme(savedTheme);
};

const subscribeTheme = () => {
    themelight.addEventListener('click', () => setTheme(theme.light));
    themedark.addEventListener('click', () => setTheme(theme.dark));
    themeauto.addEventListener('click', () => setTheme(theme.auto));
};

initTheme();
subscribeTheme();