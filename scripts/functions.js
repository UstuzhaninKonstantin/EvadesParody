/*
functions.js
файл для различных полезных для проекта функций,
которые можно применить в разработке или без 
которых работа программы невозможна
*/

import { ctx, keysPressed, allObjects, movingObjects } from "./constants.js";


/* рисует шарики разных координат, размеров и цветов
взависимости от указанных параметров */
function drawCircle(color, x, y, radius) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, 0);
    ctx.fill();
}


/* функция вызывает функцию update
для все объектов */
function objUpdate(allObjects) {
    for (let arr of Object.values(allObjects)) {
        for (let elem of arr) {
            elem.update();
        }
    }
}


/* функция очищает канвас и вызывает функцию draw
для все объектов */
function objRender(allObjects) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let arr of Object.values(allObjects)) {
        for (let elem of arr) {
            elem.draw();
        }
    }
}


/* функция-обработчик нажатия клавиш */
function keydownCheck(event) {
    keysPressed[event.code] = true;
}


/* функция-обработчик отпускания клавиш */
function keyupCheck(event) {
    keysPressed[event.code] = false;
}


/* функция двигает все объекты на указанные
значения по оси x и y */
function moveCamera(x, y) {
    for (let key of movingObjects) {
        for (let obj of allObjects[key]) {
            obj.x += x;
            obj.y += y;
        }
    }
}


/* принимает на вход цвет(в hex) и значение,
после чего возвращает затемненный или освятленный цвет */
function LightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


export { objUpdate, objRender, drawCircle, keydownCheck, keyupCheck, moveCamera, LightenDarkenColor }