// Display and hide new file form
const showFileForm = () => {
    const formBody = document.querySelector(".newFileFormBody")
    formBody.classList.toggle("showForm")
    const icon = document.getElementById("newFileFormToggle");
    if (icon.src.endsWith("down.svg")) {
        icon.src = "/imgs/arrowup.svg";
      } else if (icon.src.endsWith("up.svg")) {
        icon.src = "/imgs/arrowdown.svg";
      }
}

const newFileFormToggle = document.querySelector("#newFileFormToggle");
newFileFormToggle.addEventListener("click", showFileForm);

// Display and hide new folder form
const showFolderForm = () => {
    const formBody = document.querySelector(".newFolderFormBody")
    formBody.classList.toggle("showForm")
    const icon = document.getElementById("newFolderFormToggle");
    if (icon.src.endsWith("down.svg")) {
        icon.src = "/imgs/arrowup.svg";
      } else if (icon.src.endsWith("up.svg")) {
        icon.src = "/imgs/arrowdown.svg";
      }
}

const newFolderFormToggle = document.querySelector("#newFolderFormToggle");
newFolderFormToggle.addEventListener("click", showFolderForm);