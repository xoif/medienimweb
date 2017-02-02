/**
 * Created by Rolf on 30.01.2017.
 */

var paperPlane = {
    img: new Image(), //create new image element
    x: -100,
    y: 20,
    lastY: 20,
    lastX: -100,
    setup: function(){
        this.img.src = 'images/papierflieger.png';
    },
    draw: function () { //draws the paperPlane
        drawRotatedImage(this.img,this.x,this.y,calculatePaperPlaneRotation());
    },
    getHitbox: function () {
        return { //x and y are positioned in the middle, because of drawRotatedImage()
            "top":  this.y - 0.5 * this.img.height,
            "bottom":   this.y + 0.5 * this.img.height,
            "left":     this.x - 0.5 * this.img.width,
            "right":    this.x + 0.5 * this.img.width
        }
    }
};


var currentLoopingFrame = 0;
var loopingComplete = 100;

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


    if (paperPlane.x > 2 * (canvasWidth / 3) && currentLoopingFrame < loopingComplete) {
        loopPaperPlane();
     //  demo();
        console.log("loop");
    }

    console.log("paperPlane x = " + paperPlane.x + " paperPlane y = " + paperPlane.y);
}

function demo(){
    paperPlane.y = paperPlane.y + 0.3 * animationCycle;
}

function loopPaperPlane(){

    currentLoopingFrame++;

    paperPlane.x = 90 * Math.sin(0.05* currentLoopingFrame) + paperPlane.x;
    paperPlane.y = 90 * Math.cos(0.05* currentLoopingFrame) + paperPlane.y;
}


function calculatePaperPlaneRotation() {
    var deltaY = paperPlane.y - paperPlane.lastY;
    var deltaX = paperPlane.x - paperPlane.lastX;
    var angle = Math.atan(deltaY/deltaX);
    return angle;
}




