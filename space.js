const r = require("raylib");

function createSpace(x, y, width, height, color) {
    return {
        x, y, width, height, color
    }
}

function drawSpace(s) {
    r.DrawRectangleLines(s.x, s.y, s.width, s.height, s.color);
}

module.exports = {
    createSpace,
    drawSpace,
}