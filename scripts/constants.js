/*
constants.js
файл с основными значениями проекта, на которых
он и основан (ctx, canvas и подобное)
*/

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keysPressed = {};

const ctx = canvas.getContext('2d');
ctx.font = '13px sans-serif';
ctx.textAlign = 'center';

const allObjects = {
    "circles": [],
    "walls": [],
    "player": []
};


export { canvas, ctx, allObjects, keysPressed }