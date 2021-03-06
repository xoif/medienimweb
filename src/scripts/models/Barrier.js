/**
 * Created by Rolf on 30.01.2017.
 */

var barrier = {
    width: 50,
    height: 300,
    x: 0,
    y: 0,
    setup: function(){
        barrier.x = canvasWidth/3;
        barrier.y = canvasHeight - barrier.height; //set initial barrier position
    },
    draw: function () {
        //draw barrier
        context.fillStyle = "rgb(100,20,222)";
        context.fillRect(this.x, this.y, this.width, this.height);
    },
    getHitbox: function () {
        return { //x and y are positioned in the middle, because of drawRotatedImage()
            "top":      this.y,
            "bottom":   this.y + this.height,
            "left":     this.x,
            "right":    this.x + this.width
        }
    }
};

function handleMouseClickDownForBarrier(event) {
    var mousePos = getMousePos(canvas, event);

    console.log("barrier positionX: " + barrier.x + " barrier positionY: " + barrier.y + " mouseX: " + mousePos.x + " mouseY: " + mousePos.y);

    //check if the barrier is clicked (mouse pointer position x & y must be in the area that is occupied by the barrier.
    if (mousePos.y > barrier.getHitbox()["top"] && mousePos.y < barrier.getHitbox()["bottom"] && mousePos.x > barrier.getHitbox()["left"] && mousePos.x < barrier.getHitbox()["right"]) {
        console.log("go");
        alterBarrierHeight(event)
    }
}

function alterBarrierHeight(event) {

    var startAnimation = function (evt) { // track mouse position, and change the height of the barrier according to the current mouse pointer position
        var mousePos = getMousePos(canvas, evt);
        barrier.y = mousePos.y;
        barrier.height = canvasHeight;
        window.requestAnimationFrame(draw);
    };

    var stopAnimation = function (evt) { //animation should stop, if mouse click ended
        canvas.removeEventListener('mousemove', startAnimation);
        canvas.removeEventListener('mouseup', stopAnimation);
        console.log("stop");
    };

    canvas.addEventListener('mousemove', startAnimation, false); //on every mousepointer move,
    // dragAnimation will be invoked
    canvas.addEventListener('mouseup', stopAnimation, false);
}


/*
 check if obstacles hitbox overlaps the hitbox of the paperplane
 */
function isBarrierHit() {

        //check horizontal hit
        if (barrier.getHitbox()["left"] <= paperPlane.getHitbox()["right"] && barrier.getHitbox()["right"] >= paperPlane.getHitbox()["left"]) {
            //check vertical hit
            if (barrier.getHitbox()["bottom"] >= paperPlane.getHitbox()["top"] && barrier.getHitbox()["top"] <= paperPlane.getHitbox()["bottom"]) {
                console.log("barrier top: " + barrier.getHitbox()["top"] + " barrier bottom " + barrier.getHitbox()["bottom"] + "barrier left " + barrier.getHitbox()["left"] + " barrier right " + barrier.getHitbox()["right"]);
                console.log("plane top: " + paperPlane.getHitbox()["top"] + " plane bottom " + paperPlane.getHitbox()["bottom"] + "plane left " + paperPlane.getHitbox()["left"] + " plane right " + paperPlane.getHitbox()["right"]);
                return true;
            }
        } else {
            return false;
        }
}
