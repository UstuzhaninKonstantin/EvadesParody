/*
classes.js
файл только для классов проекта
*/

import { ctx, allObjects, keysPressed } from "./constants.js";
import { drawCircle } from "./functions.js";


/* класс стены. Используется в работе с шаром(для коллизий). Может
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
        // я не знаю что здесь нужно
    }

}


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
        for (let wall of allObjects['walls']) {
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


/* класс игрока. */
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
        drawCircle(this.color, this.x, this.y, this.radius);
    }


    update() {
        if (keysPressed['KeyW'] || keysPressed['ArrowUp']) {
            this.y -= this.speed
        }
        if (keysPressed['KeyD'] || keysPressed['ArrowRight']) {
            this.x += this.speed
        }
        if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) {
            this.x -= this.speed
        }
        if (keysPressed['KeyS'] || keysPressed['ArrowDown']) {
            this.y += this.speed
        }
    }

}


export { Wall, Circle, Player }