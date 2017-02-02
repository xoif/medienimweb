var canvas, context, canvasWidth, canvasHeight, myTimer, animationCycle, framesPerSeconds;

function init() {

    framesPerSecond = 20;

    canvas = document.getElementById("canvas"); //gets the predefined canvas element
    context = canvas.getContext("2d"); //gets the canvas' context to draw on

    updateCanvasSize();

    barrier.y = canvasHeight - barrier.height; //set initial barrier position

    draw();
    drawTutorialScreen();
}

function go() {
    animationCycle = 1;
    myTimer = setInterval(loop, 1000 / framesPerSeconds);
}

function draw() {

    /* Animation steps
     1) Clear the canvas
     Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is using the clearRect() method.
     2) [optional] Save the canvas state
     If you're changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
     3) Draw animated shapes
     The step where you do the actual frame rendering.
     4) [optional] Restore the canvas state
     If you've saved the state, restore it before drawing a new frame.
     */

    context.clearRect(0, 0, canvasWidth, canvasHeight); //1) clear the canvas before animating

    // 3) draw objects that should be animated. 

    sun.draw();
    cloud1.draw();
    cloud2.draw();
    paperPlane.draw();
    if (tutorialState >= 3) {
        barrier.draw();
    }
    if (tutorialState >= 5) {
        balloon.draw();
    }
    console.log("balloon x: " + balloon.x + "  balloon y: "+ balloon.y + "canvas height = " +  canvasHeight + "canvas width = " + canvasWidth);

    if (shouldShowHitboxes) {
        drawHitboxes();
    }
}


//loop function
function loop() {

    draw();
    movePaperPlane();
    moveClouds();
    moveSun();

    // stop the the animation if it runs out-of-canvas
    if (paperPlane.x > canvasWidth) {
        stop();
        alert("You win!");
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        window.location.reload(true);
    } else if (checkCollision()) {
        stop();
        alert("You loose!");
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        window.location.reload(true);
    }

    animationCycle++;
}

window.onload = init;
window.addEventListener('resize', updateCanvasSize, true);

