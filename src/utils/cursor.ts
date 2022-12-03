export const cursor = () => {
  const cursor = document.querySelector<HTMLDivElement>(".cursor")!;

  document.addEventListener("mousemove", ({ clientX, clientY }) => {
    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;
  });

  Array.from(document.querySelectorAll("canvas")).forEach((pTag) => {
    pTag.addEventListener("mouseover", () => cursor.classList.add("grow"));
    pTag.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
  });
};
