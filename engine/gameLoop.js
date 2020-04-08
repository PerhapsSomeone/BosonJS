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
            let entityX = convertRelativeCoords(e.x, "w");
            let entityY = convertRelativeCoords(e.y, "h");
            let img = new Image();
            img.src = e.pictureURL;
            img.onload = () => {
                console.log(`Drew at ${e.x} ${e.y}`);
                engine.internalCanvas.ctx().drawImage(img, entityX, entityY, img.width * e.scaleX, img.height * e.scaleY);
            };

            e.needsRedraw = false;

            console.log("Drew " + e.name);
        } else if (e.type === "rectangle") {
            let x1 = convertRelativeCoords(e.x, "w");
            let y1 = convertRelativeCoords(e.y, "h");
            let height = convertRelativeCoords(e.height, "w");
            let width = convertRelativeCoords(e.width, "h");

            console.table(e);

            engine.internalCanvas.ctx().beginPath();
            engine.internalCanvas.ctx().lineWidth = e.lineWidth;
            engine.internalCanvas.ctx().strokeStyle = e.lineColor;

            engine.internalCanvas.ctx().rect(x1, y1, width, height);

            if(e.fill) {
                engine.internalCanvas.ctx().fillStyle = e.fillColor;
                engine.internalCanvas.ctx().fill();
            } else {
                engine.internalCanvas.ctx().stroke();
            }

            console.log(`Drew at ${x1} ${y1} with width ${width} and height ${height}`);

            e.needsRedraw = false;
        }
    })
}

function convertRelativeCoords(coord, type) {
    // type: w = width, h = height
    if(type == "w") {
        return (coord / 100) * engine.internalCanvas.canvas().width;
    } else if (type == "h") {
        return (coord / 100) * engine.internalCanvas.canvas().height;
    } else {
        console.warn("convertRelativeCoords called with invalid type!");
        return -1;
    }
}

export { gameLoopAPI };