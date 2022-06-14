/*
main.js
файл где все собирается в кучу и программа запускается
*/

import { objUpdate, objRender } from './functions.js';
import { canvas, allObjects } from './constants.js';
import { Circle, Wall, Player } from './classes.js'


/* постоянно изменяемая функция. создает все
необходимые объекты */
function createObjects() {
    for (let i = 0; i < 10; i++) {
        allObjects["circles"].push(new Circle(500, 250, 15, 1, '#ffff00'));
    }
    allObjects['walls'].push(new Wall(10, 10, 1000, 1, '#000000', 'h'));
    allObjects['walls'].push(new Wall(10, 510, 1000, 1, '#000000', 'h'));
    allObjects['walls'].push(new Wall(10, 10, 1, 500, '#000000', 'v'));
    allObjects['walls'].push(new Wall(1010, 10, 1, 500, '#000000', 'v'));
}

const player = new Player(500, 250, 15, 'imposter', '#ff00ff', 3);
allObjects['player'].push(player);

createObjects();


function main() {
    if (!canvas.getContext) {
        return;
    }
    document.addEventListener('keydown', player.playerMovement.bind(player));
    setInterval(() => {objUpdate(allObjects); objRender(allObjects)}, 10);
}

main();