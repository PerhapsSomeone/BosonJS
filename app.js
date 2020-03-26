import { engine } from "./engine/core.js";

engine.start("canvas", 1920, 1080);


let x = 0;
setInterval(() => {
    //engine.entities.removeEntity("bg");
    engine.entities.removeAllEntities();
    engine.entities.addImage("bg", x, 10, 1, "assets/img1.jpg", 0.5, 0.5)

    console.log(JSON.stringify(engine.entities.getAllEntities()));

    x += 10;
}, 1000);
