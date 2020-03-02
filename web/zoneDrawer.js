function showAxes(context) {
    let canvas = document.getElementById("zoneCanvas");
    var context = canvas.getContext("2d");
    let height = canvas.height;
    let width = canvas.width;
    context.beginPath();
    context.lineWidth = 3;
    context.moveTo(150, 0);
    context.lineTo(150, 300);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.strokeStyle = "black";
    context.stroke();

    sign(context, 6);
}


function drawZone(radius) {
    var canvas = document.getElementById("zoneCanvas");
    if (null == canvas || !canvas.getContext) return;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);

    ctx.fillStyle = "#03A9F4"; // цвет для заливки фигур
    ctx.strokeStyle = "#03A9F4";

    ctx.beginPath();
    ctx.arc(150, 150, radius * 10, 0, Math.PI / 2, false); // круг
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.fillRect(150 - radius * 20, 150, radius * 20, radius * 20); // прямоугольник
    ctx.moveTo(150, 150 - radius * 10);
    ctx.lineTo(150 + radius * 10, 150);
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    showAxes(ctx);
    redrawPoints();
}

function sign(context, radius) {
    context.strokeStyle = "#000000";
    context.fillStyle = "#000000";

    context.font = "18px Arial";
    context.fillText("x", 290, 140);
    context.fillText("y", 135, 15);


    if (isNaN(radius)) {
        context.fillText('R', 160, 35);
        context.fillText('R/2', 160, 95);
        context.fillText('-R/2', 160, 214);
        context.fillText('-R', 160, 274);
        context.fillText('-R', 20, 140);
        context.fillText('-R/2', 70, 140);
        context.fillText('R/2', 197, 140);
        context.fillText('R', 265, 140);
    } else {
        context.fillText(radius, 160, 35);
        context.fillText(radius / 2, 160, 95);
        context.fillText(-radius / 2, 160, 214);
        context.fillText(-radius, 160, 274);
        context.fillText(-radius, 20, 140);
        context.fillText(-radius / 2, 70, 140);
        context.fillText(radius / 2, 197, 140);
        context.fillText(radius, 265, 140);
    }

    context.beginPath();
    // верхний R по x
    context.moveTo(145, 30);
    context.lineTo(155, 30);

    // верхний R/2 по x
    context.moveTo(145, 90);
    context.lineTo(155, 90);

    // нижний R/2 по x
    context.moveTo(145, 210);
    context.lineTo(155, 210);

    // нижний R по х
    context.moveTo(145, 270);
    context.lineTo(155, 270);

    // левый R по х
    context.moveTo(30, 145);
    context.lineTo(30, 155);

    // левый R/2 по х
    context.moveTo(90, 145);
    context.lineTo(90, 155);

    // правый R/2 по х
    context.moveTo(210, 145);
    context.lineTo(210, 155);

    // правый R по х
    context.moveTo(270, 145);
    context.lineTo(270, 155);
    context.closePath();

    context.stroke();
}

function check(pointX, pointY, currentR) {
    if (pointX >= 0 && pointY >= 0 && -1 * pointY >= pointX - currentR / 2) return true;
    if (pointX >= -currentR && pointX <= 0 && pointY <= 0 && pointY >= -currentR) return true;
    return pointX >= 0 && pointY <= 0 && pointX * pointX + pointY * pointY <= currentR * currentR / 4;
}

function redrawPoints() {
    let values = $("#res_table td").toArray();

    for (let i = values.length-1; i > 0; i-=4) {


        let px = values[i - 3].innerHTML;
        let py = values[i - 2].innerHTML;

        if (!isNaN(px)) {
            document.getElementById('clear_btn').disabled=false;
            drawPoint(px, py, check(px, py, r) ? '#FF0000' : '#00FF00');
        }
    }
}

function drawPoint(relX, relY, color) {
    let canvas = document.getElementById("zoneCanvas");
    let context = canvas.getContext("2d");
    context.fillStyle = color;
    context.beginPath();
    context.arc(relX * 20 + 150, 150 - relY * 20, 4, 0, 2 * Math.PI);
    context.fill();
}