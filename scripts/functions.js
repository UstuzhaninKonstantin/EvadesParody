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


function keydownCheck(event) {
    keysPressed[event.code] = true;
}


function keyupCheck(event) {
    keysPressed[event.code] = false;
}


function moveCamera(x, y) {
    for (let key of movingObjects) {
        for (let obj of allObjects[key]) {
            obj.x += x;
            obj.y += y;
        }
    }
}


export { objUpdate, objRender, drawCircle, keydownCheck, keyupCheck, moveCamera }