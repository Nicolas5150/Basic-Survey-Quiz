window.addEventListener('load',init,false);
function init() {
  // Create global arrays that hold the ids of both the text box and span id
  // These get passed in as ID names to validate the corresponding data.
  textBoxArray = [
    "firstNameTextBox",
    "lastNameTextBox",
    "emailAddressTextBox",
    "phoneNumberTextBox",
    "sulleyAddressTextBox"
  ];
  // Info will be appended to the corresponding span id
  messageIDArray = [
    "firstNameMessage",
    "lastNameMessage",
    "emailAddressMessage",
    "phoneNumberMessage",
    "sulleyAddressMessage"
  ];

  // The event listener for each focus and blur on all text boxes.
  var firstNameTextBox = document.getElementById(textBoxArray[0]);
  firstNameTextBox.addEventListener("focus",function() {
    formAssistAdd(event, messageIDArray[0], null);}, true);
  firstNameTextBox.addEventListener("blur",function(){
    validateData(textBoxArray[0], messageIDArray[0]);}, true);

  var lastNameTextBox = document.getElementById(textBoxArray[1]);
  lastNameTextBox.addEventListener("focus",function() {
    formAssistAdd(event, messageIDArray[1], null);}, true);
  lastNameTextBox.addEventListener("blur",function() {
    validateData(textBoxArray[1], messageIDArray[1]);}, true);

  var emailAddressTextBox = document.getElementById(textBoxArray[2]);
  emailAddressTextBox.addEventListener("focus",function() {
    formAssistAdd(event, messageIDArray[2], null);}, true);
  emailAddressTextBox.addEventListener("blur",function() {
    validateData(textBoxArray[2], messageIDArray[2]);}, true);

  var phoneNumberTextBox = document.getElementById(textBoxArray[3]);
  phoneNumberTextBox.addEventListener("focus",function() {
    formAssistAdd(event, messageIDArray[3], null);}, true);
  phoneNumberTextBox.addEventListener("blur",function() {
    validateData(textBoxArray[3], messageIDArray[3]);}, true);

  var sulleyAddressTextBox = document.getElementById(textBoxArray[4]);
  sulleyAddressTextBox.addEventListener("focus",function() {
    formAssistAdd(event, messageIDArray[4], null);}, true);
  sulleyAddressTextBox.addEventListener("blur",function() {
    validateData(textBoxArray[4], messageIDArray[4]);}, true);
}

// Add data / text to the div argument passed in.
// Pass in error as a paramter to know if one occured durring validateData().
function formAssistAdd(event, messageID, error) {
  event.preventDefault();

  // Remove all tags on current div
  formAssistRemove(messageID);

  // Change color back to default if an error has been shown before
  document.getElementById(messageID).style.color = "black";
  var info = "";
  // Check to see if an error was passed in
  if (error !== "")
  {
    // APPEND A X MARK SIGN HERE!!!!!!!!
    // APPEND A X MARK SIGN HERE!!!!!!!!
    // Change color of error message to red
    document.getElementById(messageID).style.color = "red";
    info = "Incorrect ";
  }

  // Switch Statment to append correct example to messageID
  switch(messageID) {
    case ("firstNameMessage"):
      info += "Ex. John";
      break;

    case "lastNameMessage":
      info += "Ex. Doe";
      break;

    case "emailAddressMessage":
      info += "Ex. johndoe@gmail.com";
      break;

    case "phoneNumberMessage":
      info += "Ex. 555-555-5555";
      break;

    case "sulleyAddressMessage":
      info += "Ex. http://sulley.cah.ucf.edu/~jo555555";
      break;

    default:
      break;
  }

  // Actual appending of text to the messageID.
  var para = document.createElement("span");
  var node = document.createTextNode(info);
  para.appendChild(node);
  var element = document.getElementById(messageID);
  element.appendChild(para);
}

// Remove any data on the div argument passed in
function formAssistRemove(messageID) {
  event.preventDefault();
  var removeByID = document.getElementById(messageID);
  while(removeByID.hasChildNodes()) {
    removeByID.removeChild(removeByID.lastChild);
  }
}

// Once the user has unclikced the text box then validate the specifc data
function validateData(textBox, messageID) {
  // Remove all tags on current div
  // and obtain which text box to validate.
  formAssistRemove(messageID);
  var textBoxCheck = document.getElementById(textBox).value;
  var validate = "";

  // Switch Statment to check form data for errors
  // Append error message and assistant text to the corresponding textbox
  switch(textBox) {
    // Validate first or last name
    case "firstNameTextBox":
    case "lastNameTextBox":
      validate = /^[a-zA-Z]*$/;
      if (!validate.test(textBoxCheck) || textBoxCheck === "") {
        formAssistAdd(event, messageID, "error");
      }
      else
      {
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        return true;
      }
      return false;

    // Validate email
    case "emailAddressTextBox":
      validate = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else
      {
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        return true;
      }
      return false;

    // Validate phone
    case "phoneNumberTextBox":
      validate = /^\d{3}\-\d{3}\-\d{4}/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else
      {
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        return true;
      }
      return false;

    // Validate sulley address
    case "sulleyAddressTextBox":
      validate = /^\d{3}\-\d{3}\-\d{4}/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else
      {
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        // APPEND A CHECK MARK SIGN HERE!!!!!!!!
        return true;
      }
      return false;

    default:
      return false;
  }
}

// This function is called once the user has clicked submit
function validateDataEntries() {
  event.preventDefault();
  var validDataEntry = 0;
  var i;
  // Loop through all textboxes for valid data.
  for (i=0; i<=textBoxArray.length-1; i++) {
    if (validateData(textBoxArray[i], messageIDArray[i])) {
      validDataEntry ++;
    }
  }
  // If all form data is valid, proceed by creating a global user account array.
  if (validDataEntry == textBoxArray.length)
  {
    validDataAccount = [];
    for (i=0; i<=textBoxArray.length-1; i++) {
      validDataAccount[i] = document.getElementById(textBoxArray[i]).value;
    }
  }
}

// SURVEY SECTION
// Change question to previous or next.
function changeQuestion(questionNumber, direction) {
  event.preventDefault();

  // Switch Statment to hide or show question(s).
  // Use display to have contnet be diplayed in the same location with block.
  switch(questionNumber) {
    // Can only go forward since it's the start.
    case "Q1":
      document.getElementById("questionOne").style.display = "none";
      document.getElementById("questionTwo").style.display = "block";
      break;

    case "Q2":
      if (direction === "forward") {
        document.getElementById("questionTwo").style.display = "none";
        document.getElementById("questionThree").style.display = "block";
      }
      else {
        document.getElementById("questionTwo").style.display = "none";
        document.getElementById("questionOne").style.display = "block";
      }
      break;

    case "Q3":
      if (direction === "forward") {
        document.getElementById("questionThree").style.display = "none";
        document.getElementById("questionFour").style.display = "block";
      }
      else {
        document.getElementById("questionThree").style.display = "none";
        document.getElementById("questionTwo").style.display = "block";
      }
      break;

    case "Q4":
      if (direction === "forward") {
        document.getElementById("questionFour").style.display = "none";
        document.getElementById("questionFive").style.display = "block";
      }
      else {
        document.getElementById("questionFour").style.display = "none";
        document.getElementById("questionThree").style.display = "block";
      }
      break;

    case "Q5":
      if (direction === "forward") {
        document.getElementById("questionFive").style.display = "none";
        document.getElementById("questionSix").style.display = "block";
      }
      else {
        document.getElementById("questionFive").style.display = "none";
        document.getElementById("questionFour").style.display = "block";
      }
      break;

    // Can only go back since it's end.
    case "Q6":
      document.getElementById("questionSix").style.display = "none";
      document.getElementById("questionFive").style.display = "block";
      break;

    default:
      break;
  }
}

// Check the results or alert the user a radio button was not clicked
function finish() {
  event.preventDefault();
  var i, j, k=0, checked;
  var checkedAnswers = [];
  // Check all questions 1-6 and find any unanswered
  // Pull the radio button from the html via class "Qi" - i being question number
  for (i=1; i<=6; i++)
  {
    checked = false;
    var answers = document.getElementsByClassName("Q"+i);
    for (j=0; j<answers.length; j++)
    {
      // An answer was selected, store it in the array
      if (answers[j].checked){
        checked = true;
        checkedAnswers[k] = answers[j].value;
        k ++;
        break;
      }
      // No answer picked throughout all radio buttons of that specifc question
      if (j == answers.length-1 && checked === false)
        alert("Question " + i + " is not answered!");
    }
  }

  // If the array is filled all the way then all questions had an answer.
  // The checked answers can now be processed.
  if (checkedAnswers.length == 6) {
    alert("All questions answered!");
  }
}
