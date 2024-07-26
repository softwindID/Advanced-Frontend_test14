const fullNameInput = $('#full-name-input');
const usernameInput = $('#username-input');
const emailInput = $('#mail-input');
const passwordInput = $('#password-input');
const repeatPasswordInput = $('#repeat-password-input');
const agreement = $('#agree')

$(document).ready(function() {
    $('#sign-up').click(function(event) {
        event.preventDefault();
        $('.error-message').text('');
        $('input').removeClass('error');

        let isValid = true;
        $('.action-input').css('border-color', '#C6C6C4');

        const fullNamePattern = /^[А-Яа-яA-Za-z\s]+$/;
        if (!fullNamePattern.test(fullNameInput.val().trim())) {
            isValid = false;
            fullNameInput.css('border-color', 'red');
            $('#full-name-error').show('error-message').text('Full Name может содержать только буквы и пробелы');
        }
        const usernamePattern = /^[А-Яа-яA-Za-z0-9_-]+$/;
        if (!usernamePattern.test(usernameInput.val().trim())) {
            isValid = false;
            usernameInput.css('border-color', 'red');
            $('#username-error').show('error-message').text('Username может содержать только буквы, цифры, символ подчеркивания и тире');
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailInput.val().trim())) {
            isValid = false;
            emailInput.css('border-color', 'red');
            $('#email-error').show('error-message').text('Введите корректный E-mail');
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(passwordInput.val().trim())) {
            isValid = false;
            passwordInput.css('border-color', 'red');
            $('#password-error').show('error-message').text('Пароль должен содержать не менее 8 символов, включая хотя бы одну заглавную букву, одну цифру и один спецсимвол');
        }
        if (passwordInput.val().trim() !== repeatPasswordInput.val().trim()) {
            isValid = false;
            repeatPasswordInput.css('border-color', 'red');
            $('#repeat-password-error').show('error-message').text('Пароли не совпадают');
        }
        if (!agreement.is(':checked')) {
            isValid = false;
            $('#agree-error').show('error-message').text('Вы должны согласиться с условиями');

        } else {
            $('#agree-condition').removeClass('error');
        }
        if (isValid) {
            saveClientData();
            showPopup();
        }
    });
});

function showPopup() {
    $('#popupContainer').show();
    hidePopup();
}
function hidePopup() {
    $('#ok').click(function() {
        $('#popupContainer').hide();
        changeWeb();
    });
}

function saveClientData() {
    const fullName = $('#full-name-input').val().trim();
    const username = $('#username-input').val().trim();
    const email = $('#mail-input').val().trim();
    const password = $('#password-input').val().trim();

    const client = {
        fullName: fullName,
        username: username,
        email: email,
        password: password
    };


    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(client);
    localStorage.setItem('clients', JSON.stringify(clients));
}

$('#link a').click(function(e) {
    e.preventDefault();
    changeWeb(); // Переход к форме входа
});

function changeWeb() {
    $('#actions-form .action-input').val('');
    $('#info-title').text('Log in to the system');
    $('#text-full-name, #text-email, #repeat-password-input-text, #agree-condition').remove();
    $('#sign-up').text('Sign In');
    $('#link a').text('Registration');

    $('#sign-up').off('click').click(function (event) {
        event.preventDefault();
        validateLoginForm();
    });

    $('#link a').off('click').click(function (e) {
        e.preventDefault();
        location.reload();
    });
}


    function validateLoginForm() {
    $('.error-message').text('').hide();
    $('input').removeClass('error');

    let isValid = true;
    $('.action-input').css('border-color', '#C6C6C4');

    if (usernameInput.val().trim() === '') {
        isValid = false;
        usernameInput.css('border-color', 'red').css('border-color', 'red');
        $('#username-error').text('Заполните поле username').show();
    }

    if (passwordInput.val().trim() === '') {
        isValid = false;
        passwordInput.css('border-color', 'red').css('border-color', 'red');
        $('#password-error').text('Заполните поле password').show();
    }

    if (isValid) {
        let clients = JSON.parse(localStorage.getItem('clients')) || [];
        let user = clients.find(client => client.username === usernameInput.val().trim());


        if (!user) {
            $('#username-error').text('Такой пользователь не зарегистрирован').show();
            usernameInput.css('border-color', 'red');
        } else {

            if (user.password === passwordInput.val().trim()) {
                enterPersonalCabinet(user);
            } else {
                $('#password-error').text('Неверный пароль').show();
                passwordInput.css('border-color', 'red');
            }
        }
    }
}
function enterPersonalCabinet(user) {

    $('#info-title').text('Welcome, ' + user.fullName + '!');
    $('#info-description,  #username-input, #username, #password-input, #password, #link').remove();

    $('#sign-up').text('Exit').off('click').click(function(event) {
        event.preventDefault();
        location.reload();
    });

}







