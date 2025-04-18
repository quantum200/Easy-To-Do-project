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
            document.body.classList.add(darkThemeClass);
            document.body.classList.remove(lightThemeClass);

            themedark.classList.add(classButtonSelected);
            themelight.classList.remove(classButtonSelected);
            themeauto.classList.remove(classButtonSelected);
            return;
        }

        case theme.light: {
            document.body.classList.add(lightThemeClass);
            document.body.classList.remove(darkThemeClass);

            themelight.classList.add(classButtonSelected);
            themedark.classList.remove(classButtonSelected);
            themeauto.classList.remove(classButtonSelected);
            return;
        }

        case theme.auto:
        default: {
            const isDark = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (isDark) {
                document.body.classList.add(darkThemeClass);
                document.body.classList.remove(lightThemeClass);
            } else {
                document.body.classList.add(lightThemeClass);
                document.body.classList.remove(darkThemeClass);
            }

            themeauto.classList.add(classButtonSelected);
            themelight.classList.remove(classButtonSelected);
            themedark.classList.remove(classButtonSelected);
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