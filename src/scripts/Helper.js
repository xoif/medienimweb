/**
 * Created by Rolf on 30.01.2017.
 */

var shouldShowHitboxes = false;
var tutorialState = 1;

function drawDemoObjects() { //draws demo objects
    //Draw rectangle
    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 55, 50);

    //Draw triangle
    context.fillStyle = "rgb(000, 200, 000)";
    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(100, 75);
    context.lineTo(100, 25);
    context.fill();

    // Quadratric curves example -> Speach Bubble
    context.beginPath();
    context.moveTo(75, 25);
    context.quadraticCurveTo(25, 25, 25, 62.5);
    context.quadraticCurveTo(25, 100, 50, 100);
    context.quadraticCurveTo(50, 120, 30, 125);
    context.quadraticCurveTo(60, 120, 65, 100);
    context.quadraticCurveTo(125, 100, 125, 62.5);
    context.quadraticCurveTo(125, 25, 75, 25);
    context.stroke();
}


function getMousePos(canvas, evt) { //returns the current mouse position in canvas
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawRotatedImage(image, x, y, angle) {

    // save the current co-ordinate system
    // before we screw with it
    context.save();

    // move to the middle of where we want to draw our image
    context.translate(x, y);

    // rotate around that point
    context.rotate(angle);

    // draw it up and to the left by half the width
    // and height of the image
    context.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    context.restore();
}

function checkCollision() {
    return isBarrierHit();
}

function drawHitboxes() {
    context.fillStyle = "rgb(255, 255, 0)";
    context.fillRect(paperPlane.getHitbox().left, paperPlane.getHitbox().top, paperPlane.img.width, paperPlane.img.height);  //x,y,w,h
    context.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);  //x,y,w,h
}

function toggleHitboxes(){
    shouldShowHitboxes = !shouldShowHitboxes;
}

function stop(){
    clearInterval(myTimer);
}

function drawTutorialScreen() {
    context.fillStyle = "rgba(255, 100, 100, 0.8)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "rgb(0,0,0)";
    context.font = "80px Georgia";
    context.textAlign = "center";

    switch (tutorialState) {
        case 1: {
            context.fillText("Welcome to", canvasWidth / 2, canvasHeight / 2);
            context.fillText("Paperplane!", canvasWidth / 2, canvasHeight / 2 + 110);
            break;
        }
        case 2: {
            context.fillText("Drag the blue barrier", canvasWidth / 2, canvasHeight / 2);
            context.fillText("to adjust height!", canvasWidth / 2, canvasHeight / 2 + 110);
            break;
        }
        case 4: {
            context.fillText("Great! Now moove the", canvasWidth / 2, canvasHeight / 2);
            context.fillText("blue balloon!", canvasWidth / 2, canvasHeight / 2 + 110);
            break;
        }
        case 6: {
            context.fillText("Great! You got it", canvasWidth / 2, canvasHeight / 2);
            context.fillText("Click start to see the plane flying!", canvasWidth / 2, canvasHeight / 2 + 110);
            break;
        }
    }

}

function next() {
    draw();
    tutorialState++;
    var button = document.getElementById("buttonNext");
    switch (tutorialState) {
        case 2: {
            drawTutorialScreen();
            break;
        }
        case 3: {
            //if the mouse button gets clicked, the method "handleMouseClickDownForBarrier" should be loaded
            canvas.addEventListener("mousedown", handleMouseClickDownForBarrier, false);
            break;
        }
        case 4: {
            drawTutorialScreen();
            canvas.removeEventListener("mousedown", handleMouseClickDownForBarrier, false);
            break;
        }
        case 5: {
            //if the mouse button gets clicked, the method "handleMouseClickDownForBarrier" should be loaded
            canvas.addEventListener("mousedown", handleMouseClickDownForBalloon, false);
            break;
        }
        case 6: {
            drawTutorialScreen();
            canvas.removeEventListener("mousedown", handleMouseClickDownForBarrier, false);
            button.firstChild.data = "start plane";
            break;
        }
        case 7: {
            go();
            button.firstChild.data = "cancel";
            break;
        }
        case 8: {
            stop();
            button.firstChild.data = "try again";
            break;
        }
        case 9: {
            location.reload();
            break;
        }
    }
}

/*
 fit height dynamicly to screen width
 */
function updateHeight() {
    var div = document.getElementsByClassName("container");
    var width = div.width();
    div.css('height', 0.5626 * width);
}