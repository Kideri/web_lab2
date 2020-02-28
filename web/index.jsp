<%@ page import="server.ResultsHolder" %>
<%@ page pageEncoding="UTF-8" %>
<%
    ResultsHolder results;
    Object appObject = session.getAttribute("results");
    if (!(appObject instanceof ResultsHolder)) {
        results = new ResultsHolder();
        session.setAttribute("results", results);
    } else {
        results = (ResultsHolder) appObject;
    }
%>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №2</title>

    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="beauty.css">

    <script src="validator.js" type="text/javascript"></script>
    <script src="zoneDrawer.js" type="text/javascript"></script>
    <script src="mouseListener.js" type="text/javascript"></script>
    <script src="jquery-3.3.1.js" type="text/javascript"></script>


    <script>
        function clearForm() {
            document.forms[0].reset();
        }
    </script>

</head>

<body onload="clearForm();addListener('zoneCanvas');">
<header>
    <h1>Терновой Даниил Дмитриевич P3213</h1>
    <h2>Вариант: 213777</h2>
</header>

<div class="block">

    <div class="flex">
        <div>
            <canvas height="300px" width="300px" id="zoneCanvas"></canvas>
        </div>

        <form id="post-form" action="control" method="post">

            <table>
                <tr>
                    <td rowspan="2">
                        <p>Координата X:</p>
                        <p>
                            <label for="x4">4</label>
                            <input id="x4" type="radio" onclick="validateX()" name="x" value=4>
                        </p>
                        <p>
                            <label for="x3">3</label>
                            <input id="x3" type="radio" onclick="validateX()" name="x" value=3>
                        </p>
                        <p>
                            <label for="x2">2</label>
                            <input id="x2" type="radio" onclick="validateX()" name="x" value=2>
                        </p>
                        <p>
                            <label for="x1">1</label>
                            <input id="x1" type="radio" onclick="validateX()" name="x" value=1>
                        </p>
                        <p>
                            <label for="x0">0</label>
                            <input id="x0" type="radio" onclick="validateX()" name="x" value=0>
                        </p>
                        <p>
                            <label for="x-1">-1</label>
                            <input id="x-1" type="radio" onclick="validateX()" name="x" value=-1>
                        </p>
                        <p>
                            <label for="x-2">-2</label>
                            <input id="x-2" type="radio" onclick="validateX()" name="x" value=-2>
                        </p>
                        <p>
                            <label for="x-3">-3</label>
                            <input id="x-3" type="radio" onclick="validateX()" name="x" value=-3>
                        </p>
                        <p>
                            <label for="x-4">-4</label>
                            <input id="x-4" type="radio" onclick="validateX()" name="x" value=-4>
                        </p>
                    </td>
                    <td>

                        <label>Координата Y:
                            <br>
                            <input id="Y_input" name="y" oninput="validateY()"  placeholder="[-5 ... 5]"
                                   autocomplete="off">
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label> Радиус:
                            <select id="r_select" size="1" required onchange="validateR()" name="r">
                                <option value=1>1</option>
                                <option value=2>2</option>
                                <option value=3 selected>3</option>
                                <option value=4>4</option>
                                <option value=5>5</option>
                            </select>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td onmouseenter="show_error()" onmouseleave="hide_error()">
                        <button name="submit_btn" class="white_box" disabled type="submit" id="submit">Отправить
                            данные
                        </button>
                    </td>
                    <td onmouseenter="table_error()" onmouseleave="hide_error()">
                        <button id="clear_btn" class="white_box" type="button" disabled onclick="console.log('clear')">
                            Очистить историю
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span id="error-message"></span>
                    </td>
                </tr>
            </table>
        </form>
    </div>

</div>
<%=results.toString()%>

<script type="text/javascript">
    validateAll();
    let form = $('#post-form');

    $(document).ready(function () {
        form.submit(function () {
            $.ajax({
                data: $(this).serialize(),
                type: $(this).attr('method'),
                url: $(this).attr('action'),

                success: function (data) {
                    document.getElementById('tbody').innerHTML =
                        (data + document.getElementById('tbody').innerHTML);
                    // document.getElementById('tbody').innerHTML += data;
                    redrawPoints();
                },
                error: function (e, x, r) { // on error..
                    document.getElementById("error-message").innerHTML = e
                }
            });
            return false;
        });
    });

    $('#clear_btn').click(function () {
        $.ajax({
            data: 'clear=clear',
            type: form.attr('method'),
            url: form.attr('action'),

            success: function (data) {
                $('#clear_btn').attr('disabled', 'disabled');
                $("#res_table :not(thead) tr").remove();
                validateR();
            },
            error: function (e, x, r) { // on error..
                document.getElementById("error-message").innerHTML = e
            }
        });
        return false;
    });

</script>
</body>
</html>
