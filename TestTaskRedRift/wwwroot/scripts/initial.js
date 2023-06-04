//Calls to blazor app
function OpenModalWindowCall(character) {
  DotNet.invokeMethodAsync('TestTaskRedRift', 'OpenModalWindow', character);
}
function SaveUserTextCall(userText) {
  DotNet.invokeMethodAsync('TestTaskRedRift', 'SaveUserText', userText);
}

