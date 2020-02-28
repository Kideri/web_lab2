let click_x, click_y;

function sendRequest() {
    let http = new XMLHttpRequest();
    let url = 'control';
    let params = "x=" + click_x.toFixed(4) + "&y=" + click_y.toFixed(4) + "&r=" + r;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onload = function () {
        document.getElementById('tbody').innerHTML=
            (http.responseText+document.getElementById('tbody').innerHTML);
        redrawPoints();
    };
    http.send(params);
}

function addListener(canvasID) {
    let canvas = document.getElementById(canvasID);
    canvas.addEventListener("mousedown", function (event) {
        if (validR) {
            showMessage("");
            let rect = canvas.getBoundingClientRect();

            click_x = event.clientX - rect.right + rect.width / 2;
            click_y = rect.bottom - event.clientY - rect.height / 2;
            click_x /= rect.height * 0.1;
            click_y /= rect.width * 0.1;
            console.log("X: " + click_x);
            console.log("Y: " + click_y);
            sendRequest();
        } else {
            showMessage("<p>Выберите радиус</p>");
        }
    });
}

function showMessage(messageHTML) {
    document.getElementById("error-message").innerHTML = messageHTML;
}