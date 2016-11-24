window.addEventListener('load',init,false);
function init() {
  // Create global arrays that hold the ids of both the text box and span id.
  // These get passed in as id names to validate the corresponding data.
  textBoxArray = [
    "firstNameTextBox",
    "lastNameTextBox",
    "emailAddressTextBox",
    "phoneNumberTextBox",
    "sulleyAddressTextBox"
  ];
  messageIDArray = [
    "firstNameMessage",
    "lastNameMessage",
    "emailAddressMessage",
    "phoneNumberMessage",
    "sulleyAddressMessage"
  ];

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

// Append text to the span argument passed in as messageID.
// Error parameter only is passed properly durring validateData().
function formAssistAdd(event, messageID, error) {
  event.preventDefault();

  // Remove all tags and text appended on current span.
  formAssistRemove(messageID);

  // Change color to default and instantiate info text to be appended to span.
  document.getElementById(messageID).style.color = "black";
  var info = "";
  if (error !== null)
  {
    representationIcon(messageID, "error");
    // Change color of error message to red
    document.getElementById(messageID).style.color = "red";
    info = "Incorrect ";
  }

  // Switch Statment to append correct example text to messageID span.
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

  // Actual appending of text to the messageID span.
  var para = document.createElement("span");
  var node = document.createTextNode(info);
  para.appendChild(node);
  var element = document.getElementById(messageID);
  element.appendChild(para);
}

// Remove any data on the messageID span argument passed in.
function formAssistRemove(messageID) {
  var removeByID = document.getElementById(messageID);
  while(removeByID.hasChildNodes()) {
    removeByID.removeChild(removeByID.lastChild);
  }
}

// Once the user has unclikced the text box then validate the specifc data.
function validateData(textBox, messageID) {
  formAssistRemove(messageID);
  var textBoxCheck = document.getElementById(textBox).value;
  var validate = "";

  // Switch Statment to check form data for errors.
  switch(textBox) {
    // Validate first or last name.
    case "firstNameTextBox":
    case "lastNameTextBox":
      validate = /^[a-zA-Z]*$/;
      if (!validate.test(textBoxCheck) || textBoxCheck === "") {
        formAssistAdd(event, messageID, "error");
      }
      else {
        representationIcon(messageID, null);
        return true;
      }
      return false;

    // Validate email.
    case "emailAddressTextBox":
      validate = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else {
        representationIcon(messageID, null);
        return true;
      }
      return false;

    // Validate phone.
    case "phoneNumberTextBox":
      validate = /^\d{3}\-\d{3}\-\d{4}/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else {
        representationIcon(messageID, null);
        return true;
      }
      return false;

    // Validate sulley address.
    case "sulleyAddressTextBox":
      validate = /^\d{3}\-\d{3}\-\d{4}/i;
      if (!validate.test(textBoxCheck)) {
        formAssistAdd(event, messageID, "error");
      }
      else {
        representationIcon(messageID, null);
        return true;
      }
      return false;

    default:
      return false;
  }
}

// This function is called once the user has clicked the submit button.
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

function representationIcon(messageID, error) {
  var image = "";
  if (error === null) {
    imageIcon = "img/Correct.png";
  }
  else {
    imageIcon = "img/Incorrect.JPG";
  }

  // Apend the image to the span tag
  var img = new Image();
  img.setAttribute("class","largeImage");
  img.setAttribute("alt","Form Icon");
  img.setAttribute("width", "24");
  img.setAttribute("height", "12");
  img.src = imageIcon;
  var pic = document.getElementById(messageID);
  pic.appendChild(img);
}

// SURVEY SECTION
// Change question to previous or next.
function changeQuestion(questionNumber, direction) {
  event.preventDefault();

  // Switch Statment to hide or show question(s).
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

    // Can only go back since it's the end.
    case "Q6":
      document.getElementById("questionSix").style.display = "none";
      document.getElementById("questionFive").style.display = "block";
      break;

    default:
      break;
  }
}

// Check the results or alert the user a radio button was not clicked.
function finish() {
  event.preventDefault();
  var i, j, k=0, l=0, checked;
  var checkedAnswers = [], checkedAnswersCount = [], textAnswers = [];

  // Pull radio button data from the html class "Qi"; i being question number.
  for (i=1; i<=6; i++)
  {
    checked = false;
    var answers = document.getElementsByClassName("Q"+i);
    for (j=0; j<answers.length; j++)
    {
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
  if (listLength == 6)
  {
    j = 1;
    alert("All questions answered!");
    // Array order for which person gets the vote.
    // Ben-Affleck:0, Christian-Bale:1, George-Clooney:2, Kevin-Conroy:3, Adam-West:4
    // Questions 1-5.
    for (i=0; i<listLength-1; i++)
    {
      checkedAnswersCount[i] = 0;
      if(checkedAnswers[i] == "Q"+j+"A1") {
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
      if (checkedAnswersCount[i] < checkedAnswersCount[i+1]){
        highestPos = i+1;
        highestCount = checkedAnswersCount[i+1];
      }
    }
    // If the user put in a combination resulting in an equal values.
    for (i=0; i<5; i++) {
      if(i != highestPos) {
        if (highestCount == checkedAnswersCount[i]) {
          // Insert image of weird batman pic here
          alert("two equal vals");
          highestCount = -1;
          break;
        }
      }
    }
    reviewAnswers(textAnswers);
    alert(highestPos);
    alert(highestCount);
    // Make img bassed on array position, if two are equal use 5 for Val Kilmer.
    if (highestCount != -1){
      createImage(highestPos);
    }
    else {
      createImage(5);
    }
  }
}

// Append the image based off of value given by highestPos
function createImage(highestPos){
  showValidDataAccount();

  // Stores the location of all the images.
  // Ben-Affleck:0, Christian-Bale:1, George-Clooney:2, Kevin-Conroy:3, Adam-West:4
  // Val-Kilmer:5 - only on equal count values.
  var batmanImg = [
      'img/Ben-Affleck.jpg',
      "img/Christian-Bale.jpg",
      "img/George-Clooney.png",
      "img/Kevin-Conroy.jpg",
      "img/Adam-West.jpg",
      "img/Val-Kilmer.jpg"
    ];

  // http://stackoverflow.com/questions/12287856/insert-image-object-into-html
  // Append the image to the imgHere div
  var img = new Image();
  img.setAttribute("class","largeImage");
  img.setAttribute("alt","Batman Picture");
  img.setAttribute("width", "auto");
  img.setAttribute("height", "auto");
  img.src = batmanImg[highestPos];
  var pic = document.getElementById('surveyWrapper');
  pic.appendChild(img);

  createCaption(highestPos);
}

// Append to the screen the users profile info
function showValidDataAccount() {
  var personalInfoTag = [
      'First Name: ',
      "Last Name: ",
      "Email Address: ",
      "Phone Number: ",
      "Sulley Address: "
    ];

  for(i=0; i<validDataAccount.length; i++) {
    var para = document.createElement("p");
    var node = document.createTextNode(personalInfoTag[i] + validDataAccount[i]);
    para.appendChild(node);
    var element = document.getElementById("surveyWrapper");
    element.appendChild(para);
  }
}

// Append the answers selected by the user.
function reviewAnswers(textAnswers){
  for(i=0; i<textAnswers.length; i++) {
    var para = document.createElement("p");
    var node = document.createTextNode("Answer " +(i+1)+ " "+textAnswers[i]);
    para.appendChild(node);
    var element = document.getElementById("surveyWrapper");
    element.appendChild(para);
  }
}

// Append the corresponding caption, which is relative link to image.
function createCaption(highestPos) {
  var batmanImgURL = [
      'img/Ben-Affleck.jpg',
      "img/Christian-Bale.jpg",
      "img/George-Clooney.png",
      "img/Kevin-Conroy.jpg",
      "img/Adam-West.jpg",
      "img/Val-Kilmer.jpg"
    ];

    var para = document.createElement("p");
    var node = document.createTextNode(batmanImgURL[highestPos]);
    para.appendChild(node);
    var element = document.getElementById("surveyWrapper");
    element.appendChild(para);
}
