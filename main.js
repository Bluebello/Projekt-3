const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send')
const popup = document.querySelector('.popup');


const inputs = [username, password, password2, email];

const showError = (input, message) => {
    const formBox = input.parentElement;
    formBox.classList.add('error')
    const errorMsg = formBox.querySelector('.error-text')
    errorMsg.textContent = message;

}

const clearForm = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}

const checkForm = (input) => {
    input.forEach(el => {
        if (el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearForm(el)
        }

    })
}


const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} składa się z min. ${min} znaków.`)
    }
}

const checkPassword = (pass, pass2) => {
    if (pass.value !== pass2.value) {
        showError(pass2, "Podane hasła do siebie nie pasują")
    }

}

const checkEmail = (email) => {
    const re = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}');
    if (re.test(email.value)) {
        clearForm(email)
    } else {
        showError(email, 'Podany e-mail jest nie poprawny.')
    }

}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box')
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error'))
            errorCount++;
    })
    if (errorCount === 0) {
        popup.style.display = "block"

    }
}


sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkForm(inputs);
    checkLength(username, 3);
    checkLength(password, 8);
    checkPassword(password, password2);
    checkEmail(email);
    checkErrors()

})

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach(el => {
        el.value = '';
        clearForm(el)
    });
})