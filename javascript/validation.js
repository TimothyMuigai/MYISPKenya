
const form = document.getElementById('form');
const firstName_input = document.getElementById('finame');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('pass-input');
const confirmPass_input = document.getElementById('confirm');
const error_message = document.getElementById('error-message');

console.log(form);

form.addEventListener('submit', (e) => {
    let errors = [];

    if(firstName_input){
        errors = getSignupFormErrors(firstName_input.value, email_input.value, password_input.value, confirmPass_input.value);
    }
    else{
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if(errors.length > 0){
        e.preventDefault();
        error_message.innerText = errors.join('. ');
    }else{
        window.location.href = '../Login.html';
    }
});

function getSignupFormErrors(firstname, email, password, confirm_password) {
    let errors = [];

    if(firstname === '' || firstname == null){
        errors.push('Firstname is required');
        firstName_input.parentElement.classList.add('incorrect');
    }

    if(email === '' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null){
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password.length < 8) {
        errors.push('Password must be at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password !== confirm_password) {
        errors.push('Password does not match');
        confirmPass_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allinputs = [firstName_input, email_input, password_input, confirm_password_input].filter(input => input !== null);

allinputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    });
});
