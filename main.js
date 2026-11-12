const r = require("raylib");
const sp = require("./space");
const ls = require("./light");

const config = {
    screen: {
        width: 701,
        height: 501,
        title: "Reflection",
        fps: 50,
    }
}

function setup(){
    const {screen} = config;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps);

    config.space1 = sp.createSpace(200, 200, 400, 500, r.RED);
    config.light1 = ls.createLightSource(350, 450, 5, r.RED);
    config.ray1 = ls.createLightRay(config.light1);
    config.angle1 = {base: 360, incident: 135};
    config.direction1 = ls.getSlop(config.angle1.base - config.angle1.incident)
       
    return config;
}

function loop(world){
    while (!r.WindowShouldClose()) {
        update(world);          
        draw(world);
    }
}

function update(world){
    // console.log(world.direction1);
    
    ls.reflectLightRay(world.space1, world.ray1, world.angle1, world.direction1);
    ls.projectLight(world.ray1, world.direction1, 1);
}

function draw(world){
    r.BeginDrawing();
    // r.ClearBackground(r.WHITE);

    sp.drawSpace(world.space1);
    ls.drawLightSource(world.light1);
    ls.drawLightRay(world.ray1, r.BLUE);

    r.EndDrawing();
}

function main(){
    const world = setup();
    loop(world);
}
main();