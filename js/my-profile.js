// VARIABLES
const PROFILE_FORM_ELEM = document.getElementById("profile-form");
const NAME_INPUT_ELEM = document.getElementById("name-input");
const SECOND_NAME_INPUT_ELEM = document.getElementById("second-name-input");
const SURNAME_INPUT_ELEM = document.getElementById("surname-input");
const SECOND_SURNAME_INPUT_ELEM = document.getElementById(
  "second-surname-input"
);
const EMAIL_INPUT_ELEM = document.getElementById("email-input");
const PHONE_INPUT_ELEM = document.getElementById("phone-input");
const USER_NOT_LOGGED_ALERT_ELEM = document.getElementById(
  "user-not-logged-alert"
);
const FILE_INPUT_ELEM = document.getElementById("file-upload-input");
const DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM = document.getElementById(
  "data-successfully-saved-feedback"
);
const PROFILE_IMAGE_ELEM = document.getElementById("profile-image");

// FUNCTIONS
function isCurrentUserLoggedIn() {
  return localStorage.getItem("username") != null;
}

function displayElement(element) {
  element.classList.remove("d-none");
  element.classList.add("d-block");
}

function fillFormWithProfileData() {
  let profileData = JSON.parse(localStorage.getItem("profileData"));

  if (profileData.name != undefined) {
    NAME_INPUT_ELEM.value = profileData.name;
  } else {
    NAME_INPUT_ELEM.value = "";
  }

  if (profileData.secondName != undefined) {
    SECOND_NAME_INPUT_ELEM.value = profileData.secondName;
  } else {
    SECOND_NAME_INPUT_ELEM.value = "";
  }

  if (profileData.surname != undefined) {
    SURNAME_INPUT_ELEM.value = profileData.surname;
  } else {
    SURNAME_INPUT_ELEM.value = "";
  }

  if (profileData.secondSurname != undefined) {
    SECOND_SURNAME_INPUT_ELEM.value = profileData.secondSurname;
  } else {
    SECOND_SURNAME_INPUT_ELEM.value = "";
  }

  if (profileData.email != undefined) {
    EMAIL_INPUT_ELEM.value = profileData.email;
  } else {
    EMAIL_INPUT_ELEM.value = "";
  }

  if (profileData.phone != undefined) {
    PHONE_INPUT_ELEM.value = profileData.phone;
  } else {
    PHONE_INPUT_ELEM.value = "";
  }
}

function saveProfileTextDataToLocalStorage() {
  let profileData = {
    name: NAME_INPUT_ELEM.value,
    secondName: SECOND_NAME_INPUT_ELEM.value,
    surname: SURNAME_INPUT_ELEM.value,
    secondSurname: SECOND_SURNAME_INPUT_ELEM.value,
    email: EMAIL_INPUT_ELEM.value,
    phone: PHONE_INPUT_ELEM.value,
    profileDataHasBeenModified: true,
  };

  localStorage.setItem("profileData", JSON.stringify(profileData));
}

function isFormValid() {
  return (
    NAME_INPUT_ELEM.value != "" &&
    SURNAME_INPUT_ELEM.value != "" &&
    EMAIL_INPUT_ELEM.value != ""
  );
}

function saveUploadedImageToLocalStorage() {
  let uploadedImage = FILE_INPUT_ELEM.files[0];
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    localStorage.setItem("profile-image", fileReader.result);
  });
  fileReader.readAsDataURL(uploadedImage);
}

function displayProfileImage() {
  let profileImageData = localStorage.getItem("profile-image");
  if (profileImageData) {
    PROFILE_IMAGE_ELEM.classList.remove("d-none");
    PROFILE_IMAGE_ELEM.classList.add("d-inline-block");
    PROFILE_IMAGE_ELEM.src = "";
    PROFILE_IMAGE_ELEM.src = profileImageData;
  }
}

function showDataSavedSuccessfullyFeedback() {
  DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM.classList.remove("d-none");
  DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM.classList.add("d-inline-block");
}

// EVENT LISTENERS
PROFILE_FORM_ELEM.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isFormValid()) {
    saveProfileTextDataToLocalStorage();
    showDataSavedSuccessfullyFeedback();
  }
});

FILE_INPUT_ELEM.addEventListener("change", () => {
  saveUploadedImageToLocalStorage();
  displayProfileImage();
  window.location.href = "my-profile.html";
});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();

  if (isCurrentUserLoggedIn()) {
    displayElement(PROFILE_FORM_ELEM);
    fillFormWithProfileData();
    displayProfileImage();
  } else {
    displayElement(USER_NOT_LOGGED_ALERT_ELEM);
  }
});
