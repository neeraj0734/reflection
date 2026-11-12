const r = require("raylib");

function createLightSource(x, y, radii, color) {
    return  {x, y, radii, color}
}

function createLightRay(ls) {
    const st = {x: ls.x, y: ls.y};
    const end = {x: ls.x, y: ls.y};

    return {st, end};
}

function drawLightRay(lr, color) {
    r.DrawLineV(lr.st, lr.end, color);
}

function drawLightSource(ls) {
    r.DrawCircle(ls.x, ls.y, ls.radii, ls.color);
}

function toRadian(angle){
    return (Math.PI ) * angle/180;
}

function sin(radian) {
    return Math.sin(radian);
}
function cos(radian) {
    return Math.cos(radian);
}

function getCircumPoint(ls, angle) {
    const x = ls.x + ls.radii * cos(toRadian(angle));
    const y = ls.y + ls.radii * sin(toRadian(angle));

    return {x, y};
}

function getSlop(angle) {
    const radian = toRadian(angle);

    return {
        x: cos(radian), 
        y: sin(radian)
    };
}

function isOutOfBound(space, ray) {
    const hBound = (ray.end.x <= space.x) || (space.x + space.width <= ray.end.x);
    const vBound = (ray.end.y <= space.y) || (space.y + space.height <= ray.end.y);
    
    return hBound || vBound;
}

function checkIncident(space, ray) {
    const isBound = isOutOfBound(space, ray);
    // console.log("isBound :", isBound);
    
    return isBound;
}

function reflectLightRay(space, ray, angle, direction) {
    if(checkIncident(space, ray)){
        angle.incident = (angle.incident % 360) + 90; 
        direction = getSlop(angle.base - angle.incident)
        console.log("Direction :", direction);
        console.log("Ray :", ray);
        
    }
}

function projectLight(lr, direction, speed) {
    lr.end.x += direction.x * speed;
    lr.end.y += direction.y * speed;
    
}

module.exports = {
    createLightSource,
    drawLightSource,
    createLightRay,
    projectLight,
    drawLightRay,
    getSlop,
    reflectLightRay,
}
