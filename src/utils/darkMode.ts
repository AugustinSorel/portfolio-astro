export const darkMode = () => {
  const darkModeButton =
    document.querySelector<HTMLButtonElement>("#dark-mode")!;
  const lightModeButton =
    document.querySelector<HTMLButtonElement>("#light-mode")!;

  var root = document.documentElement;

  darkModeButton.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    darkModeButton.style.textDecoration = "underline";
    lightModeButton.style.textDecoration = "none";
  });

  lightModeButton.addEventListener("click", () => {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    darkModeButton.style.textDecoration = "none";
    lightModeButton.style.textDecoration = "underline";
  });
};
