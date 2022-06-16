/*
classes.js
файл только для классов проекта
*/

import { ctx, allObjects, keysPressed, movingObjects } from "./constants.js";
import { drawCircle, moveCamera } from "./functions.js";


/* класс стены. Используется в работе с шаром и игроком(для коллизий). Может
быть разных координат, размеров и цветов.
обязательно задать ему тип: v(vertical)/h(horizontal)
пример создания:
new Wall(10, 10, 1000, 1, '#000000', 'h', ctx);
это стена с координатами (10, 10) длинной в 1000px и
шириной в 1px черного цвета горизонтального типа */
class Wall {

    constructor(x, y, width, height, color, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        /* в этой функции не нужно ничего писать, но если
        ее удалить, то будет ошибка, поэтому она есть */
    }

}


class SaveZoneWall extends Wall {}


/* обычный шарик который просто летает с заданной скоростью
и меняется взависимости от других данных ему параметров.
пример создания:
new Circle(600, 360, 15, 1, '#ff00ff', ctx);
это шар с координатами (600, 360) радиусом в 15px
со скоростью 1 розового цвета */
class Circle {

    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        let angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    draw() {
        drawCircle(this.color, this.x, this.y, this.radius);
    }
    
    update() {
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
        this.checkCollision();
    }

    /* функция проверки шарика на столкновение с другими объектами (стенами) */
    checkCollision() {
        for (let wall of allObjects['walls'].concat(allObjects['saveZoneWalls'])) {
            if (wall.type == 'v') {
                if ( (this.x <= wall.x + this.radius) && (this.x >= wall.x - this.radius) ) {
                    this.vx *= -1;
                }
            } else if (wall.type == 'h') {
                if ( (this.y <= wall.y + this.radius) && (this.y >= wall.y - this.radius) ) {
                    this.vy *= -1;
                }
            }
        }
    }

}


/* класс игрока. в данном проекте игрок - шар, который изменяет свою
позицию взависимости от нажатых пользователем клавиш. то есть игрок - 
это своего рода шарик, но двигается он не по случайно заданому направлению,
а взависимости от указаний пользователя с помощью клавиатуры
Пример создания
new Player(500, 250, 15, 'test', '#ff00ff', 3); 
это игрок с начальными координатами (500, 250) радиусом в
15px с именем "test" розового цвета со скоростью передвижения 3.
*/
class Player {

    constructor(x, y, radius, name, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.name = name;
        this.color = color;
        this.speed = speed;
    }

    draw() {
        ctx.fillStyle = '#000000';
        ctx.fillText(this.name, this.x, this.y - this.radius - 10);
        drawCircle(this.color, this.x, this.y, this.radius);
    }

    /* в данной функции идет проверка на нажатие клавиш и организация движений */
    update() {
        if (keysPressed['KeyW'] || keysPressed['ArrowUp']) {
            moveCamera(0, this.speed);
            if (this.checkCollision()) {
                moveCamera(0, -this.speed);
            }
        }
        if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
            moveCamera(-this.speed, 0);
            if (this.checkCollision()) {
                moveCamera(this.speed, );
            }
        }
        if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
            moveCamera(this.speed, 0);
            if (this.checkCollision()) {
                moveCamera(-this.speed, 0);
            }
        }
        if (keysPressed['KeyS'] || keysPressed['ArrowDown']) {
            moveCamera(0, -this.speed);
            if (this.checkCollision()) {
                moveCamera(0, this.speed);
            }
        }
    }

    /* функция проверки шарика на столкновение с другими объектами (стенами) */
    checkCollision() {
        for (let wall of allObjects['walls']) {
            if (wall.type == 'v') {
                if ( (this.x < wall.x + this.radius) && (this.x > wall.x - this.radius) ) {
                    return true;
                }
            } else if (wall.type == 'h') {
                if ( (this.y < wall.y + this.radius) && (this.y > wall.y - this.radius) ) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

}


export { Wall, SaveZoneWall, Circle, Player }