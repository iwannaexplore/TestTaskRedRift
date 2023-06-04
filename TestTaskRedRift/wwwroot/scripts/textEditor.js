//InitialMethod
//soft colors for white background
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

//External calls to server Start
function InitializeEditor() {
  window.redRift_textEditor = document.querySelector("#editor");
  if (!window.redRift_textEditor) setTimeout(InitializeEditor, 100);
  readValuesFromExistingHtml();
  let timerToSaveChanges;
  redRift_textEditor.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
    }
  })
  redRift_textEditor.addEventListener("input", InputHandlerEvent)
}

function InputHandlerEvent() {
  changeContent.bind(this)(getTextFromEditor());

  if (timerToSaveChanges)
    clearTimeout(timerToSaveChanges);
  timerToSaveChanges = setTimeout(() => {
    let userText = transformToDtoModel();
    console.log("SaveChanges");
    SaveUserTextCall(userText);
  }, 3000)
}

function readValuesFromExistingHtml() {
  let allLines = findAllLines();
  for (let i = 0; i < allLines.length; i++) {
    let line = allLines[i];
    let lineTextContent = line.textContent.trim();
    if (isCharUniqueAndLattestForTheWholeString(":", lineTextContent)) {
      let color;
      let character = lineTextContent.split(":")[0];
      if (!charactersDictionary.hasOwnProperty(character)) {
        color = line.style.color;
        charactersDictionary[character] = color;
      }
      line.onclick = ((e) => OpenModalWindowCall(e.target.dataset.character.trim()));
    }
  }
}

function ReplaceOldNameWithNewOne(oldName, newName) {
  let allLines = findAllLines();
  for (let i = 0; i < allLines.length; i++) {
    let line = allLines[i];
    let lineTextContent = line.dataset.character;
    if (lineTextContent !== oldName) {
      continue;
    }
    if (newName.trim() !== "") {
      line.innerHTML = newName + ":";
      redRift_textEditor.dispatchEvent(new Event("input"));
      if (charactersDictionary.hasOwnProperty(newName)) {
        line.style.color = charactersDictionary[newName];
      } else {
        charactersDictionary[newName] = charactersDictionary[oldName];
      }
      line.dataset.character = newName;
    } else{
      line.remove();
    }
    delete charactersDictionary[oldName];
  }
}

//External calls to server End

function unpackSpanIfNeeded(divElement) {

}

function changeContent(content) {
  let allLines = findAllLines();
  for (let i = 0; i < allLines.length; i++) {
    let line = allLines[i];
    let lineTextContent = line.textContent.trim();
    if (isCharUniqueAndLattestForTheWholeString(":", lineTextContent)) {
      let color;
      let character = lineTextContent.split(":")[0];
      if (!charactersDictionary.hasOwnProperty(character)) {
        color = getColorByRandom();
        charactersDictionary[character] = color;
      } else {
        color = charactersDictionary[character];
      }
      line.dataset.character = character;
      line.style.fontWeight = "600";
      line.style.color = color;
      line.onclick = ((e) => OpenModalWindowCall(e.target.dataset.character.trim()));
    } else {
      if (line.innerText === "\n") {
        delete line.dataset.character;
        line.style.fontWeight = "400";
        line.style.color = "";
        line.onclick = undefined;
      }
      if (line.dataset.character) {
        console.log("NONO")
        let character = line.dataset.character;
        if (document.querySelectorAll(`[data-character="${line.dataset.character}"]`).length <= 1) {
          if (charactersDictionary.hasOwnProperty(character)) {
            delete charactersDictionary[character];
          }
        }
        delete line.dataset.character;
        line.style.fontWeight = "400";
        line.style.color = "";
        line.onclick = undefined;
      }
    }
  }
  let allElementsWithDataCharacter = document.querySelectorAll("[data-character]");
  for (const key in charactersDictionary) {
    let isNeedToDeleteKey;
    for (let i = 0; i < allElementsWithDataCharacter.length; i++) {
      if (key !== allElementsWithDataCharacter[i].dataset.character) {
        isNeedToDeleteKey = true;
      } else {
        isNeedToDeleteKey = false;
        break;
      }
    }
    if (isNeedToDeleteKey)
      delete charactersDictionary[key];
  }
  console.log(charactersDictionary);
}


function findAllLines() {
  return redRift_textEditor.querySelectorAll("div");
}

function getColorByRandom() {
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function getTextFromEditor() {
  return redRift_textEditor.innerHTML;
}

function isCharUniqueAndLattestForTheWholeString(char, str) {
  return str.length !== 0 && str.indexOf(char) === str.length - 1
}


function transformToDtoModel() {
  return getTextFromEditor();
}

