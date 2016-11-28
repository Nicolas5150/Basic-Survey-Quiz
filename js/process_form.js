window.addEventListener('load',init,false);
function init() {
  // Create global arrays that hold the ids of both the text box and span id.
  // These get passed in as id names to validate the corresponding data.
  textBoxArray = ["firstNameTextBox", "lastNameTextBox", "emailAddressTextBox",
    "phoneNumberTextBox", "sulleyAddressTextBox"];
  messageIDArray = ["firstNameMessage", "lastNameMessage", "emailAddressMessage",
    "phoneNumberMessage", "sulleyAddressMessage"];

  // The event listener for each focus and blur (on all text boxes).
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

// Creates extra info for the user to better understand the textbox at hand.
function formAssistAdd(event, messageID, error) {
  var info = "";
  event.preventDefault();
  formAssistRemove(messageID);

  // Change color to default and instantiate info text to be appended to span.
  document.getElementById(messageID).style.color = "rgba(205,245,250, .8)";
  if (error !== null)
  {
    representationIcon(messageID, "error");
    // Change color of error message to red
    document.getElementById(messageID).style.color = "#bf6767";
    info = " Incorrect ";
  }

  // Switch Statment to append correct example text to messageID span.
  switch(messageID) {
    case ("firstNameMessage"):
      info += "- Ex. Bruce";
      break;

    case "lastNameMessage":
      info += "- Ex. Wayne";
      break;

    case "emailAddressMessage":
      info += "- Ex. batman@gmail.com";
      break;

    case "phoneNumberMessage":
      info += "- Ex. 735-185-7301";
      break;

    case "sulleyAddressMessage":
      info += "- Ex. http://sulley.cah.ucf.edu/~br228626";
      break;

    default:
      break;
  }
  addText(info, messageID, 1);
}

// Remove any data on the messageID span argument passed in.
function formAssistRemove(messageID) {
  var removeByID = document.getElementById(messageID);
  while(removeByID.hasChildNodes()) {
    removeByID.removeChild(removeByID.lastChild);
  }
}

// Once user has unclikced the text box then validate the specifc data.
function validateData(textBox, messageID) {
  formAssistRemove(messageID);
  var textBoxValue = document.getElementById(textBox).value, validate = "";

  // Switch Statment to check form data for errors.
  switch(textBox) {
    case "firstNameTextBox":
    case "lastNameTextBox":
      validate = /^[a-zA-Z]*$/;
      return validateTextbox(validate, messageID, textBoxValue);

    case "emailAddressTextBox":
      validate = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      return validateTextbox(validate, messageID, textBoxValue);

    case "phoneNumberTextBox":
      validate = /^\d{3}\-\d{3}\-\d{4}/i;
      return validateTextbox(validate, messageID, textBoxValue);

    case "sulleyAddressTextBox":
      validate = /^(http:\/\/)+[\w]+.[\w]+.[\w]+.[\w]+\/~[\w]+$/;
      return validateTextbox(validate, messageID, textBoxValue);

    default:
      return false;
  }
}

// Validate textbox against the related validation requirements passed in
function validateTextbox(validate, messageID, textBoxValue) {
  if (!validate.test(textBoxValue) || textBoxValue === "") {
    formAssistAdd(event, messageID, "error");
  }
  else {
    representationIcon(messageID, null);
    return true;
  }
  return false;
}

// This function is called once the user has clicked the submit button.
function validateDataEntries() {
  var validDataEntry = 0, i;
  event.preventDefault();
  // Loop through all textboxes for valid data.
  for (i=0; i<=textBoxArray.length-1; i++) {
    if (validateData(textBoxArray[i], messageIDArray[i])) {
      validDataEntry ++;
    }
  }
  // If all form data is valid, proceed by creating a global user account array.
  if (validDataEntry == textBoxArray.length) {
    validDataAccount = [];
    for (i=0; i<=textBoxArray.length-1; i++) {
      validDataAccount[i] = document.getElementById(textBoxArray[i]).value;
    }
    // Hide the form data and show the survey and current question bubbles.
    document.getElementById("personalInfoWrapper").style.display = "none";
    document.getElementById("surveyWrapper").style.display = "block";
    addImage("Q1Circle", "img/current-question.png", "questionOn", "Question Number", "20", "20");
    for(i=2; i<=6; i++) {
    addImage("Q"+i+"Circle", "img/other-question.png", "questionOn", "Question Number", "20", "20");
    }
  }
}

// Create which image to be added to text box area.
function representationIcon(messageID, error) {
  var imageIcon = "";
  if (error === null) {
    imageIcon = "img/correct.png";
  }
  else {
    imageIcon = "img/incorrect.png";
  }
  addImage(messageID, imageIcon, "textboxIcon", "Textbox Icon", 24, 12);
}

// Append an image to the screen
function addImage(where, what, className, altName, width, height) {
  var img = new Image();
  img.setAttribute("class", className);
  img.setAttribute("alt", altName);
  img.setAttribute("width", width);
  img.setAttribute("height", height);
  img.src = what;
  var pic = document.getElementById(where);
  pic.appendChild(img);
}

// SURVEY SECTION
// Change question to previous or next.
function changeQuestion(questionNumber, direction) {
  var question = Number(questionNumber);
  event.preventDefault();

  if (direction === "forward") {
    document.getElementById("Q"+question).style.display = "none";
    document.getElementById("Q"+(question+1)).style.display = "block";
    formAssistRemove("Q"+question+"Circle");
    formAssistRemove("Q"+(question+1)+"Circle");
    addImage("Q"+question+"Circle", "img/other-question.png", "questionOn", "Question Number", "20", "20");
    addImage("Q"+(question+1)+"Circle", "img/current-question.png", "questionOn", "Question Number", "20", "20");
  }
  else {
    document.getElementById("Q"+question).style.display = "none";
    document.getElementById("Q"+(question-1)).style.display = "block";
    formAssistRemove("Q"+question+"Circle");
    formAssistRemove("Q"+(question-1)+"Circle");
    addImage("Q"+question+"Circle", "img/other-question.png", "questionOn", "Question Number", "20", "20");
    addImage("Q"+(question-1)+"Circle", "img/current-question.png", "questionOn", "Question Number", "20", "20");
  }
}

// Check the results or alert the user a radio button was not clicked.
function finish() {
  var i, j, k=0, l=0, checked;
  var checkedAnswers = [], textAnswers = [], checkedAnswersCount = [];
  event.preventDefault();

  // Pull radio button data from the html class "Qi"; i being question number.
  for (i=1; i<=6; i++) {
    checked = false;
    var answers = document.getElementsByClassName("Q"+i);
    for (j=0; j<answers.length; j++) {
      // An answer was selected, store the value and the text (data) after it
      if (answers[j].checked) {
        checked = true;
        checkedAnswers[k] = answers[j].value;
        textAnswers[k] = answers[j].nextSibling.data;
        k ++;
        break;
      }
      // No answer picked throughout all radio buttons of that specifc question.
      if (j == answers.length-1 && checked === false) {
        alert("Question " + i + " is not answered!");
      }
    }
  }

  // If the array is filled (with 6 answers), data can be processed.
  var listLength = checkedAnswers.length;
  if (listLength == 6) {
    j = 1;
    // Array order for which person gets the vote.
    // Ben-Affleck:0, Christian-Bale:1, George-Clooney:2, Kevin-Conroy:3, Adam-West:4
    // Questions 1-5.
    for (i=0; i<listLength-1; i++) {
      checkedAnswersCount[i] = 0;
      if (checkedAnswers[i] == "Q"+j+"A1") {
        checkedAnswersCount[i] ++ ;
      }
      j ++;
    }
    // Last question with 2+ answers / radio buttons.
    for (i=1; i<=6; i++) {
      if (checkedAnswers[5] == "Q6A"+i) {
        checkedAnswersCount[i-1] ++;
      }
    }
    // Find highest count of answers
    // HighestPos will be relative to the array positon storing higest count
    var highestPos = 0, highestCount = checkedAnswersCount[0];
    for (i=0; i<4; i++) {
      if (checkedAnswersCount[i] < checkedAnswersCount[i+1]) {
        highestPos = i+1;
        highestCount = checkedAnswersCount[i+1];
      }
    }
    // If the user put in a combination resulting in an equal values.
    for (i=0; i<5; i++) {
      if(i != highestPos) {
        if (highestCount == checkedAnswersCount[i]) {
          highestCount = -1;
          break;
        }
      }
    }
    // Hide the survey and append data to resultsWrapper.
    document.getElementById("surveyWrapper").style.display = "none";
    document.getElementById("resultsWrapper").style.display = "block";
    // Show Answers selected by user.
    addText(textAnswers, "results", textAnswers.length);
    // Show user proile data.
    createValidDataAccount();
    // Make img bassed on array position, if two are equal use 5 for Val Kilmer.
    if (highestCount != -1) {
      createImage(highestPos);
      createCaption(highestPos);
    }
    else {
      createImage(5);
      createCaption(5);
    }
  }
}

// Create the image based off of value given by highestPos
function createImage(highestPos) {
  // Stores the location of all the images.
  var batmanImg = ['img/ben-affleck.jpg', 'img/christian-bale.jpg',
      'img/george-clooney.png', 'img/kevin-conroy.jpg', 'img/adam-west.jpg',
      'img/val-kilmer.jpg'];
  addImage('results', batmanImg[highestPos], "batmanPicked", "Batman Picture", "30%", "30%");
}

// Create the users profile info
function createValidDataAccount() {
  var personalInfoTag = ['First Name: ', 'Last Name: ', 'Email Address: ',
    'Phone Number: ', 'Sulley Address: '];
  addText(personalInfoTag, "results", validDataAccount.length);
}

// Create the corresponding caption, which is relative link to the image.
function createCaption(highestPos) {
  var batmanImgURL = [
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/ben-affleck.jpg',
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/christian-bale.jpg',
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/george-clooney.png',
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/kevin-conroy.jpg',
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/adam-west.jpg',
      'http://sulley.cah.ucf.edu/~ni927795/dig3716c/assignment3/img/val-kilmer.jpg'
    ];
    var youGot = ['You got Ben Affleck!', 'You got Christian Bale!', 'You got George Clooney!',
        'You got Kevin Conroy!','You got Adam West!','You got Val Kilmer!'];
    addText(youGot[highestPos], "results", 1);
    addText(batmanImgURL[highestPos], "results", 1);
}

// Append text to the screen.
function addText(what, where, loopControl) {
  var node, para;
  for(i=0; i<loopControl; i++) {
    if (where != "results"){
      para = document.createElement("span");
    }
    else {
      para = document.createElement("p");
    }
    // Show relative link to batman image.
    if (loopControl == 1) {
      node = document.createTextNode(what);
    }
    // Show Answers selected by user.
    if (loopControl == 6) {
      node = document.createTextNode("Answer " +(i+1)+ " "+what[i]);
    }
    // Show user proile data.
    if (loopControl == 5) {
      node = document.createTextNode(what[i] + validDataAccount[i]);
    }
    para.appendChild(node);
    var element = document.getElementById(where);
    element.appendChild(para);
  }
}
