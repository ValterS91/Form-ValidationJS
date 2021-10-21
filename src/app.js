let cardNumber = document.querySelector("#cardNumber");
let cvc = document.querySelector("#cvc");
let amount = document.querySelector("#amount");
let firstName = document.querySelector("#fname");
let lastName = document.querySelector("#lname");
let city = document.querySelector("#city");
let states = document.querySelectorAll("option");
let STATE = document.querySelector("#stateOptions");
let cards = document.querySelector("#cards");
let isFail = document.querySelector("#fail");
let isSuccess = document.querySelector("#success");
let submitButton = document.querySelector("form");
let myPostalCode = document.querySelector("#code");

window.onload = function() {};

submitButton.addEventListener("submit", event => {
  event.preventDefault();
  if (
    cvc.classList.contains("is-valid") &&
    amount.classList.contains("is-valid") &&
    firstName.classList.contains("is-valid") &&
    lastName.classList.contains("is-valid") &&
    city.classList.contains("is-valid") &&
    cardNumber.classList.contains("is-valid") &&
    STATE.classList.contains("is-valid") &&
    myPostalCode.classList.contains("is-valid")
  ) {
    isSuccess.classList.remove("d-none");
    isSuccess.classList.add("d-block");
    isFail.classList.remove("d-block");
    isFail.classList.add("d-none");
  } else {
    isFail.classList.remove("d-none");
    isFail.classList.add("d-block");
    isSuccess.classList.remove("d-block");
    isSuccess.classList.add("d-none");
  }
});

//function isSuccess() {
//alert2.style.display = "inline";
//}

//function isFail() {
//alert1.style.display = "inline";
//}

firstName.addEventListener("focusout", () => {
  isText(firstName.value) ? isValid(firstName) : isInValid(firstName);
});

lastName.addEventListener("focusout", () => {
  isText(lastName.value) ? isValid(lastName) : isInValid(lastName);
});

city.addEventListener("focusout", () => {
  isText(city.value) ? isValid(city) : isInValid(city);
});

let stateValues = [];
for (const state in states) {
  stateValues.push(states[state].value);
  //console.log(stateValues);
}

STATE.addEventListener("focusout", () => {
  stateValues.some(statexmp => statexmp == STATE.value)
    ? isValid(STATE)
    : isInValid(STATE);
});

cvc.addEventListener("focusout", () => {
  if (cvc.value.length == 3 || cvc.value.length == 4) {
    isValid(cvc);
  } else {
    isInValid(cvc);
  }
});

amount.addEventListener("focusout", () => {
  if (amount.value <= 20000 && amount.value > 0) {
    isValid(amount);
  } else {
    isInValid(amount);
  }
});

myPostalCode.addEventListener("focusout", () => {
  if (myPostalCode.value.length == 5) {
    isValid(myPostalCode);
  } else {
    isInValid(myPostalCode);
  }
});

cardNumber.addEventListener("focusout", () => {
  if (
    //cardNumber.value.length == 16 ||
    //cardNumber.value.length == 19 ||
    valid_credit_card(cardNumber.value)
  ) {
    isValid(cardNumber);
  } else {
    isInValid(cardNumber);
  }
});

const isValid = input => {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};

const isInValid = input => {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
};

const isText = text => {
  return /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/.test(text);
};

const isNumber = number => {
  return /^[0-9]/.test(number);
};

function valid_credit_card(cardNumber) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(cardNumber)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  cardNumber = cardNumber.replace(/\D/g, "");

  for (var n = cardNumber.length - 1; n >= 0; n--) {
    var cDigit = cardNumber.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
}
