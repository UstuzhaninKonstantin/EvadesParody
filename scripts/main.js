/*
main.js
файл где все собирается в кучу и программа запускается
*/

import { objUpdate, objRender, keydownCheck, keyupCheck } from './functions.js';
import { canvas, allObjects } from './constants.js';
import { createObjects } from './classes.js'


function main() {
    if (!canvas.getContext) {
        return;
    }
    createObjects();
    document.addEventListener('keydown', keydownCheck);
    document.addEventListener('keyup', keyupCheck);
    setInterval(() => {objUpdate(allObjects); objRender(allObjects)}, 1000 / 60);
}

main();
