const regform = document.getElementById('reg-form');
const unameVal = document.getElementById('username');
const emailVal = document.getElementById('email');
const passwdVal = document.getElementById('password');
const cpasswdVal = document.getElementById('cpassword');

const unameError = document.getElementById("uname-error");
const emailError = document.getElementById("email-error");
const passwdError = document.getElementById("passwd-error");
const cpasswdError = document.getElementById("cpasswd-error");

var unameSuccess, emailSuccess, passwdSuccess, cpasswdSuccess;
unameSuccess = emailSuccess = passwdSuccess = cpasswdSuccess = false;

var logUname, logPasswd;
logUname = logPasswd = false;

var uppercaseRegex = /^(?=.*[A-Z]).+$/;
var specialCharRegex = /^(?=.*[!@#$%^&*]).+$/;
var numberRegex = /^(?=.*[0-9]).+$/;

var usernameRegex = /^\D\w{2,}$/;
var emailRegex = /^\S+@\S+$/;
var passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[(\/*-+!@#$^&*)]).{8,20}$/;

// When submit button pressed, check for validation of inputs.
regform.addEventListener('submit', (e) => {
    if (unameSuccess && emailSuccess && passwdSuccess && cpasswdSuccess) {
        // alert('Form was submitted!');
        unameSuccess = emailSuccess = passwdSuccess = cpasswdSuccess = false;
    }
    else {
        e.preventDefault(); // Prevents the refresh of the page.
        checkInputs();
    }
});

function checkInputs() {
    const username = unameVal.value;
    const email = emailVal.value;
    const password = passwdVal.value;
    const cpassword = cpasswdVal.value;

    // USERNAME VALIDATION

    if (username === '' || username === null) {
        unameError.classList.remove("valid");
        unameError.classList.add("invalid");
        unameError.innerText = 'Please enter a username';
    }

    else if (username.length < 3) {
        unameError.classList.remove("valid");
        unameError.classList.add("invalid");
        unameError.innerText = 'Username must be 3 or more characters';
    }

    // Check that username begins with a characer [a-zA-Z]
    else if (username.charAt(0) < 'A' || username.charAt(0) > 'z') {
        unameError.classList.remove("valid");
        unameError.classList.add("invalid");
        unameError.innerText = 'Username must begin with a character';
    }

    else {
        unameError.classList.remove("invalid");
        unameError.classList.add("valid");
        unameError.innerText = 'Username is valid';
        unameSuccess = true;
    }

    // EMAIL VALIDATION 

    if (email === '' || email === null) {
        emailError.classList.remove("valid");
        emailError.classList.add("invalid");
        emailError.innerText = 'Please enter an email';
    }

    else if (!emailRegex.test(email)) {
        emailError.classList.remove("valid");
        emailError.classList.add("invalid");
        emailError.innerText = 'Please enter a valid email';
    }

    else {
        emailError.classList.remove("invalid");
        emailError.classList.add("valid");
        emailError.innerText = 'Email is valid';
        emailSuccess = true;
    }

    // PASSWORD VALIDATION

    if (password === '' || password === null) {
        passwdError.classList.remove("valid");
        passwdError.classList.add("invalid");
        passwdError.innerText = 'Please enter a password';
    }

    else if (password.length < 8) {
        passwdError.classList.remove("valid");
        passwdError.classList.add("invalid");
        passwdError.innerText = 'Password must be at least 8 characters';
    }

    else if (!uppercaseRegex.test(password)) {
        passwdError.classList.remove("valid");
        passwdError.classList.add("invalid");
        passwdError.innerText = 'Your password must contain an uppercase character';
    }

    else if (!numberRegex.test(password)) {
        passwdError.classList.remove("valid");
        passwdError.classList.add("invalid");
        passwdError.innerText = 'Your password must contain a number';
    }

    else if (!specialCharRegex.test(password)) {
        passwdError.classList.remove("valid");
        passwdError.classList.add("invalid");
        passwdError.innerText = 'Your password must contain one of the following: ( / * - + ! @ # $ ^ & )';
    }

    else {
        passwdError.classList.remove("invalid");
        passwdError.classList.add("valid");
        passwdError.innerText = 'Password is valid';
        passwdSuccess = true;
    }

    // CONFIRM PASSWORD VALIDATION

    if (cpassword === '' || cpassword === null) {
        cpasswdError.classList.remove("valid");
        cpasswdError.classList.add("invalid");
        cpasswdError.innerText = 'Please confirm your password';
    }

    else if (cpassword !== password) {
        cpasswdError.classList.remove("valid");
        cpasswdError.classList.add("invalid");
        cpasswdError.innerText = 'Passwords do NOT match';
    }

    else if (cpassword === password) {
        cpasswdError.classList.remove("invalid");
        cpasswdError.classList.add("valid");
        cpasswdError.innerText = 'Passwords match';
        cpasswdSuccess = true;
    }
}

/**
 * This is called a Document comment
 * Where it will automatically add stars for each line
 * @version 1.0
 * @author me
 *
*/