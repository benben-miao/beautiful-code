let scene = document.getElementById("main-window");
let style = document.documentElement.style;
function togglePlaneMode(isPlane) {
  if (isPlane) {
    scene.classList.remove("submarine-view");
    style.setProperty("--radius", "100px 100px 100px 100px");
  } else {
    scene.classList.add("submarine-view");
    style.setProperty("--radius", "50%");
  }
}