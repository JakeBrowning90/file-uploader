// Display and hide new file form
const showFileForm = () => {
  const formBody = document.querySelector(".newFileFormBody");
  formBody.classList.toggle("showForm");
  const icon = document.getElementById("newFileFormToggle");
  if (icon.src.endsWith("down.svg")) {
    icon.src = "/imgs/arrowup.svg";
  } else if (icon.src.endsWith("up.svg")) {
    icon.src = "/imgs/arrowdown.svg";
  }
};

const newFileFormToggle = document.querySelector("#newFileFormToggle");
if (newFileFormToggle) {
  newFileFormToggle.addEventListener("click", showFileForm);
}

// Display and hide new folder form
const showFolderForm = () => {
  const formBody = document.querySelector(".newFolderFormBody");
  formBody.classList.toggle("showForm");
  const icon = document.getElementById("newFolderFormToggle");
  if (icon.src.endsWith("down.svg")) {
    icon.src = "/imgs/arrowup.svg";
  } else if (icon.src.endsWith("up.svg")) {
    icon.src = "/imgs/arrowdown.svg";
  }
};

const newFolderFormToggle = document.querySelector("#newFolderFormToggle");
if (newFolderFormToggle) {
  newFolderFormToggle.addEventListener("click", showFolderForm);
}

// Display and hide folder edit form
const showFolderEdit = () => {
  const formBody = document.querySelector(".detailBody");
  formBody.classList.toggle("showForm");
  const icon = document.getElementById("formEditToggle");
  if (icon.src.endsWith("down.svg")) {
    icon.src = "/imgs/arrowup.svg";
  } else if (icon.src.endsWith("up.svg")) {
    icon.src = "/imgs/arrowdown.svg";
  }
};

const formEditToggle = document.querySelector("#formEditToggle");
if (formEditToggle) {
  formEditToggle.addEventListener("click", showFolderEdit);
}

// Display and hide file edit form
const showFileEdit = () => {
  console.log("Toggle!");
  const formBody = document.querySelector(".detailBody");
  formBody.classList.toggle("showForm");
  const icon = document.getElementById("fileEditToggle");
  if (icon.src.endsWith("down.svg")) {
    icon.src = "/imgs/arrowup.svg";
  } else if (icon.src.endsWith("up.svg")) {
    icon.src = "/imgs/arrowdown.svg";
  }
};

const fileEditToggle = document.querySelector("#fileEditToggle");
if (fileEditToggle) {
  fileEditToggle.addEventListener("click", showFileEdit);
}
