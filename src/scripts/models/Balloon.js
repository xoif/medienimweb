/**
 * Created by Rolf on 30.01.2017.
 */

var balloon = {
    img: new Image(), //create new image element
    x: 300,
    y: 50,
    draw: function () {
        //draw balloon
        this.img.src = 'images/Ballon_rot.svg';
        context.drawImage(this.img, this.x, this.y);
    },
    getHitbox: function () {
        return {
            "top":      this.y,
            "bottom":   this.y + this.img.height,
            "left":     this.x,
            "right":    this.x + this.img.width
        }
    }
};


function handleMouseClickDownForBalloon(event) {
    var mousePos = getMousePos(canvas, event);

    //check if the balloon is clicked (mouse pointer position x & y must be in the area that is occupied by the balloon.
    if (mousePos.y > balloon.getHitbox()["top"] && mousePos.y < balloon.getHitbox()["bottom"] && mousePos.x > balloon.getHitbox()["left"] && mousePos.x < balloon.getHitbox()["right"]) {
        alterBalloonHeight(event)
    }
}

function alterBalloonHeight(event) {

    var startAnimation = function (evt) { // track mouse position, and change the height of the balloon according to the current mouse pointer position
        var mousePos = getMousePos(canvas, evt);
        balloon.y = mousePos.y;
        balloon.height = canvasHeight;
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
function isBalloonHit() {

        //check horizontal hit
        if (balloon.getHitbox()["left"] <= paperPlane.getHitbox()["right"] && balloon.getHitbox()["right"] >= paperPlane.getHitbox()["left"]) {
            //check vertical hit
            if (balloon.getHitbox()["bottom"] >= paperPlane.getHitbox()["top"] && balloon.getHitbox()["top"] <= paperPlane.getHitbox()["bottom"]) {
                console.log("balloon top: " + balloon.getHitbox()["top"] + " balloon bottom " + balloon.getHitbox()["bottom"] + "balloon left " + balloon.getHitbox()["left"] + " balloon right " + balloon.getHitbox()["right"]);
                console.log("plane top: " + paperPlane.getHitbox()["top"] + " plane bottom " + paperPlane.getHitbox()["bottom"] + "plane left " + paperPlane.getHitbox()["left"] + " plane right " + paperPlane.getHitbox()["right"]);
                return true;
            }
        } else {
            return false;
        }
}
