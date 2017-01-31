/**
 * Created by Rolf on 30.01.2017.
 */

var paperPlane = {
    img: new Image(), //create new image element
    x: 0,
    y: 20,
    lastY: 0,
    lastX: 0,
    draw: function () { //draws the paperPlane
        this.img.src = 'svg/papierflieger.svg';
        drawRotatedImage(this.img,this.x,this.y,calculatePaperPlaneRotation());
        //context.drawImage(this.img, this.x, this.y);
    }
};


var currentAnimationStep = 0;
var stepsForLooping = 80;

/**
 * method to alter the plane position in each animation step
 */
function movePaperPlane() {

    //save current position before altering values.
    paperPlane.lastY = paperPlane.y;
    paperPlane.lastX = paperPlane.x;

    //default flight
    paperPlane.x = animationCycle;
    paperPlane.y = 0.3 * animationCycle;

    if (paperPlane.x > canvasWidth / 2 && currentAnimationStep < stepsForLooping) {
        loopPaperPlane();
        console.log("loop");
    }
    console.log("paperPlane x = " + paperPlane.x + " paperPlane y = " + paperPlane.y);
}


function loopPaperPlane(){
    currentAnimationStep ++;
    paperPlane.x = 100 * Math.cos(animationCycle%canvasWidth * 0.1) + animationCycle%canvasWidth * 0.8;
    paperPlane.y = 100 * Math.sin(animationCycle%canvasWidth * 0.1) + animationCycle%canvasWidth * 0.01;
}


function calculatePaperPlaneRotation() {
    var deltaY = paperPlane.y - paperPlane.lastY;
    var deltaX = paperPlane.x - paperPlane.lastX;
    var angle = Math.atan(deltaY/deltaX);
    console.log("rotation angel" + angle + "°");
    return angle;
}



