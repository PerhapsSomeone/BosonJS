import { engine } from "./core.js";

let entityList = [];

let entity = {
    "addImage": addImage,
    "addRectangle": addRectangle,
    "removeEntity": removeEntity,
    "removeAllEntities": removeAllEntities,
    "getAllEntities": getAllEntities
};

function entitySort(el1, el2) {
    return el1.zLevel - el2.zLevel;
}

function addImage(name, x, y, zLevel, pictureURL, scaleX = 1, scaleY = 1) {
    entityList.push({
        "name": name,
        "x": x,
        "y": y,
        "zLevel": zLevel,
        "type": "image",
        "pictureURL": pictureURL,
        "scaleX": scaleX,
        "scaleY": scaleY,
        "needsRedraw": true
    });

    entityList.sort(entitySort);
}

function addRectangle(name, x1, y1, x2, y2, zLevel, width, lineColor, fill = false, fillColor = "#000000") {
    entityList.push({
        "name": name,
        "x1": x1,
        "y1": y2,
        "x2": x2,
        "y2": y2,
        "zLevel": zLevel,
        "type": "rectangle",
        "needsRedraw": true
    });

    entityList.sort(entitySort);
}

function removeEntity(name) {
    entityList.filter((entity) => {
        return entity.name !== name; // Entities with name matching fail check
    });
    entityList.forEach((entity) => {
        entity.needsRedraw = true;
    });

    entityList.sort(entitySort);
    engine.internalCanvas.clearCanvas();
}

function removeAllEntities() {
    entityList = [];
    engine.internalCanvas.clearCanvas();
}

function getAllEntities() {
    return entityList;
}

export { entity };
