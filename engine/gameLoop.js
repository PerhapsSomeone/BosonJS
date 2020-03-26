import { entity } from "./entity.js";
import { engine } from "./core.js";

let interval = null;

let gameLoopAPI = {
    "startLoop": startLoop,
    "stopLoop": stopLoop,
};

function startLoop(interval) {
    interval = setInterval(gameLoop, interval);
}

function stopLoop() {
    clearInterval(interval);
}

function gameLoop() {
    drawEntities();
    console.log("Looped!");
}

function drawEntities() {
    entity.getAllEntities().forEach((e) => {
        if(!e.needsRedraw) return;

        if(e.type === "image") {
            let img = new Image();
            img.src = e.pictureURL;
            img.onload = () => {
                console.log(`Drew at ${e.x} ${e.y}`);
                engine.internalCanvas.ctx().drawImage(img, e.x, e.y, img.width * e.scaleX, img.height * e.scaleY);
            };

            e.needsRedraw = false;

            console.log("Drew " + e.name);
        }

    })
}

export { gameLoopAPI };