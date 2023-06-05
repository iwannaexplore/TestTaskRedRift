//InitialMethod
let colors = [
  "rgb(26,89,136)",
  "rgb(133,84,119)",
  "rgb(162,89,93)",
  "rgb(83,114,77)",
  "rgb(79,89,128)",
  "rgb(106,12,2)",
  "rgb(17,17,77)",
  "rgb(56,28,134)",
  "rgb(119,99,83)",
  "rgb(86,106,107)",
  "rgb(141,98,5)"
]
let charactersDictionary = {};
let timerToSaveChanges;

//External Invokes from server Start
function InitializeEditor(htmlContent) {
  window.redRift_textEditor = document.querySelector("#editor");
  if (!window.redRift_textEditor) {
    setTimeout(InitializeEditor, 100)
    return;
  }

  redRift_textEditor.innerHTML = htmlContent
  
  redRift_textEditor.addEventListener("keydown", preventShiftPlusEnterKeyEventHandler)
  redRift_textEditor.addEventListener("input", inputHandlerEvent)

  document.querySelector("#saveButton").onclick = () => {
    saveUserText();
  };
  readValuesFromHtmlAndFindCharacters();
}

function ReplaceOldNameWithNewOne(oldName, newName) {
  let allLines = findAllCharacterLines();
  for (let i = 0; i < allLines.length; i++) {
    let lineMediator = new LineMediator(allLines[i]);
    lineMediator.replaceOldNameWithNewOne(oldName, newName);
  }
  redRift_textEditor.dispatchEvent(new Event("input"));
}

//External Invokes from server End

//Events Start
function inputHandlerEvent() {
  changeContent.bind(this)(getTextFromEditor());

  if (timerToSaveChanges)
    clearTimeout(timerToSaveChanges);
  timerToSaveChanges = setTimeout(() => {
    saveUserText();
  }, 1000)
}


/**
 * Doesn't let user press Shift+Enter, because SHift+Enter creates <span> inside <div>
 *
 * @param   e  input event.
 */
function preventShiftPlusEnterKeyEventHandler(e) {

  if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();
  }
}

//Events End

function saveUserText() {
  let userText = transformToDtoModel();
  SaveUserTextCall(userText);
  buttonAnimation();
}

function buttonAnimation() {
  let saveButton = document.querySelector("#saveButton");
  saveButton.innerText = "Saving...";
  saveButton.classList.add("disabled")
  saveButton.disabled = true;
  setTimeout(() => {
    saveButton.innerText = "Saved";
    saveButton.classList.add("btn-success");
    saveButton.classList.remove("btn-primary");
    saveButton.classList.remove("disabled")
    saveButton.disabled = false;
    setTimeout(() => {
      saveButton.classList.remove("btn-success");
      saveButton.classList.add("btn-primary");
      saveButton.innerText = "Save";
    }, 1000)
  }, 2000);
}

function readValuesFromHtmlAndFindCharacters() {
  let allLines = findAllDivLines();
  for (let i = 0; i < allLines.length; i++) {
    let lineMediator = new LineMediator(allLines[i]);
    if (lineMediator.isLineContainsCharacter()) {
      lineMediator.updateCharacterLineUsingExistingValues()
    }
  }

  fixForEditableDiv(false);
}

/**
 * fix for contenteditable. We have to add br to make first line wrapped with <div> tag
 *
 * @param   e  input event.
 */
function fixForEditableDiv(isPost) {
  redRift_textEditor.querySelectorAll(".line>br").forEach((el) => {
    el.remove();
  });
  if (isPost) 
    return;
  
  let fixDiv = document.createElement("div");
  fixDiv.classList.add("line");
  fixDiv.innerHTML = "<br>";
  redRift_textEditor.appendChild(fixDiv);
}

function changeContent(content) {
  let allLines = findAllDivLines();
  for (let i = 0; i < allLines.length; i++) {
    let lineMediator = new LineMediator(allLines[i]);
    if (lineMediator.isLineContainsCharacter()) {
      lineMediator.createCharacterLine();
    } else {
      lineMediator.createRegularLine();
    }
  }
}

function findAllCharacterLines() {
  return document.querySelectorAll("[data-character]")
}

function findAllDivLines() {
  return redRift_textEditor.querySelectorAll("div");
}

function getColorByRandom() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function getTextFromEditor() {
  return redRift_textEditor.innerHTML;
}

function transformToDtoModel() {
  fixForEditableDiv();
  return getTextFromEditor();
}

