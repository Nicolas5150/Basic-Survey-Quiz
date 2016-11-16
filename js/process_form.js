window.addEventListener('load',init,false);
function init() {
  // The event listener for click as well as when the corresponding text box is
  // clicked on or not clicked on
  var firstNameTextBox = document.getElementById("firstNameTextBox");
  firstNameTextBox.addEventListener("focus",function(){
    formAssistAdd(event, "firstNameMessage");}, true);
  firstNameTextBox.addEventListener("blur",function(){
    formAssistRemove(event, "firstNameMessage");}, true);

  var lastNameTextBox = document.getElementById("lastNameTextBox");
  lastNameTextBox.addEventListener("focus",function(){
    formAssistAdd(event, "lastNameMessage");}, true);
  lastNameTextBox.addEventListener("blur",function(){
    formAssistRemove(event, "lastNameMessage");}, true);

  var emailAddressTextBox = document.getElementById("emailAddressTextBox");
  emailAddressTextBox.addEventListener("focus",function(){
    formAssistAdd(event, "emailAddressMessage");}, true);
  emailAddressTextBox.addEventListener("blur",function(){
    formAssistRemove(event, "emailAddressMessage");}, true);

  var phoneNumberTextBox = document.getElementById("phoneNumberTextBox");
  phoneNumberTextBox.addEventListener("focus",function(){
    formAssistAdd(event, "phoneNumberMessage");}, true);
  phoneNumberTextBox.addEventListener("blur",function(){
    formAssistRemove(event, "phoneNumberMessage");}, true);

  var sulleyAddressTextBox = document.getElementById("sulleyAddressTextBox");
  sulleyAddressTextBox.addEventListener("focus",function(){
    formAssistAdd(event, "sulleyAddressMessage");}, true);
  sulleyAddressTextBox.addEventListener("blur",function(){
    formAssistRemove(event, "sulleyAddressMessage");}, true);

}

// Once the user has clicked the submit button then validate the data
function validateData(){
  event.preventDefault();
  var firstNameTextBox = document.getElementById('firstNameTextBox');
  var lastNameTextBox = document.getElementById('lastNameTextBox');
  var emailAddressTextBox = document.getElementById('emailAddressTextBox');
  var phoneNumberTextBox = document.getElementById('phoneNumberTextBox');
  var sulleyAddressTextBox = document.getElementById('sulleyAddressTextBox');
}

// Add data / text to the div argument passed in
function formAssistAdd(event, clickID){
  event.preventDefault();
  // Remove all tags on current div
  formAssistRemove(event, clickID);

  // Switch Statment to add correct appeded text to screen
  var info = "";
  switch(clickID) {
    case "firstNameMessage":
      info = "Ex. John";
      break;

    case "lastNameMessage":
      info = "Ex. Doe";
      break;

    case "emailAddressMessage":
      info = "Ex. johndoe@gmail.com";
      break;

    case "phoneNumberMessage":
      info = "Ex. 555-5555-555";
      break;

    case "sulleyAddressMessage":
      info = "Ex. http://sulley.cah.ucf.edu/~jo555555";
      break;

    default:
      break
  }

  var para = document.createElement("span");
  var node = document.createTextNode(info);
  para.appendChild(node);
  var element = document.getElementById(clickID);
  element.appendChild(para);
}

// Remove any data on the div argument passed in
function formAssistRemove(event, clickID){
  event.preventDefault();
  var removeByID = document.getElementById(clickID);
  while(removeByID.hasChildNodes()) {
    removeByID.removeChild(removeByID.lastChild);
  }
}
