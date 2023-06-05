class LineMediator {
  _line;
  _lineTextContent;
  _characterInnerText;
  _characterDataSet;

  constructor(divLine) {
    this._line = divLine;
    this._lineTextContent = divLine.textContent.trim();
    this._characterInnerText = this._lineTextContent.split(":")[0]
    this._characterDataSet = this._line.dataset.character;
  }

  createCharacterLine(color = undefined) {
    if (charactersDictionary.hasOwnProperty(this._characterDataSet) && this._characterInnerText !== this._characterDataSet) {
      delete charactersDictionary[this._characterDataSet];
    }
    if (!charactersDictionary.hasOwnProperty(this._characterInnerText)) {
      color = color ?? getColorByRandom();
      charactersDictionary[this._characterInnerText] = color;
    } else {
      color = charactersDictionary[this._characterInnerText];
    }
    this._setCharacterProperties(color)
  }

  createRegularLine() {
    if (this._line.dataset.character) {
      let characterDatasetValue = this._line.dataset.character;
      if (this._isCharacterTheLastAndNeedToBeDeleted(characterDatasetValue)) {
        delete charactersDictionary[characterDatasetValue];
      }
      this._setRegularProperties();
    }
    if (this._line.innerText === "\n") {
      this._setRegularProperties();
    }
  }

  updateCharacterLineUsingExistingValues() {
    let existingColor;
    if (!charactersDictionary.hasOwnProperty(this._characterInnerText)) {
      existingColor = this._line.style.color;
    }
    this.createCharacterLine(existingColor);
  }

  replaceOldNameWithNewOne(oldName, newName) {
    oldName = oldName.trim();
    newName = newName.trim();
    if (this._characterInnerText !== oldName || oldName === newName) {
      return;
    }
    if (newName.trim() !== "") {
      this._line.innerHTML = newName + ":";
      if (charactersDictionary.hasOwnProperty(newName)) {
        this._line.style.color = charactersDictionary[newName];
      } else {
        charactersDictionary[newName] = charactersDictionary[oldName];
      }
      this._line.dataset.character = newName;
    } else {
      this._line.remove();
    }
    delete charactersDictionary[oldName];
  }

  isLineContainsCharacter() {
    return this._isCharUniqueAndAtTheEndOfString(":", this._lineTextContent)
  }

  _setCharacterProperties(color) {
    this._line.dataset.character = this._characterInnerText;
    this._line.style.fontWeight = "600";
    this._line.style.color = color;
    this._line.onclick = ((e) => OpenModalWindowCall(e.target.dataset.character.trim()));
  }

  _setRegularProperties() {
    delete this._line.dataset.character;
    this._line.style.fontWeight = "400";
    this._line.style.color = "";
    this._line.onclick = undefined;
  }

  _isCharacterTheLastAndNeedToBeDeleted(characterDatasetValue) {
    return document.querySelectorAll(`[data-character="${this._characterDataSet}"]`).length <= 1 &&
      charactersDictionary.hasOwnProperty(characterDatasetValue)
  }

  _isCharUniqueAndAtTheEndOfString(char, str) {
    return str.length !== 0 && str.indexOf(char) === str.length - 1
  }
}