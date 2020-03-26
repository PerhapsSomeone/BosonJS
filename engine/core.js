import { entity } from "./entity.js";
import { gameLoopAPI } from "./gameLoop.js"

let canvasID;
let canvas;
let ctx;

let engine = {
    "start": startGame,
    "entities": entity,
    "internalCanvas": {
        "canvas": getCanvas,
        "ctx": getCanvasContext,
        "clearCanvas": clearCanvas
    }
};

function startGame(canvasId, width, height) {
    canvasID = canvasId;

    canvas = document.getElementById(canvasID);

    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");

    gameLoopAPI.startLoop(10);
}

function getCanvasContext() {
    return ctx;
}

function getCanvas() {
    return canvas;
}

function clearCanvas() {
    console.log("Cleared " + canvas.width + " " + canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export { engine } ;
