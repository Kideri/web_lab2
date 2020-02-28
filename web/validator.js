let validX, validY, validR = false;
let allowedX = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
let allowedR = [1, 2, 3, 4, 5];

let x = 0;
let y = 0;
let r = 0;
let firstTime = true;

function validateX() {
    validX = false;
    x = 'error';
    let radios = document.getElementsByName('x');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            x = parseFloat(radios[i].value);
            break;
        }
    }
    validX = allowedX.includes(x);
    enable_button();
}

function validateR() {
    validR = false;
    r = parseFloat(document.getElementById('r_select').value);
    validR = allowedR.includes(r);

    if (!validR) drawZone('R');
    else drawZone(r);
    enable_button();
}

function validateY() {
    let input_field = document.getElementById("Y_input");

    let text = input_field.value;

    let match = text.match(/^-?[0-2]([,.]\d+)?$|^3([,.]0+)?$|^-[3-4]([,.]\d+)?|^-5([,.]0+)?$/);

    if (match == null) {
        input_field.classList.remove("valid_field");
        input_field.classList.add("invalid_field");
        validY = false;
    } else {
        input_field.classList.remove("invalid_field");
        input_field.classList.add("valid_field");
        y = parseFloat(text.replace(",", "."));
        validY = true;
    }
    enable_button();
}

function validateAll() {
    validateX();
    validateY();
    validateR();
}

function show_error() {
    let message = '';
    if (!validR) message += '<p>Введите корректный радиус<p>';
    if (!validX) message += '<p>Введите корректный X<p>';
    if (!validY) message += '<p>Введите корректный Y [-5 .. 5] <p>';
    document.getElementById("error-message").innerHTML = message;
}

function hide_error() {
    document.getElementById("error-message").innerHTML = '';
}

function table_error() {
    if (document.getElementById('clear_btn').disabled)
        document.getElementById("error-message").innerHTML = 'Таблица и так пустая';
}

function enable_button() {
    document.getElementById("submit").disabled = !(validX && validY && validR);
}