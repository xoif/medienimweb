/**
 * Created by Rolf on 30.01.2017.
 */

var paperPlane = {
    img: new Image(), //create new image element
    x: 0,
    y: 20,
    draw: function () { //draws the paperPlane
        this.img.src = 'svg/papierflieger.svg';
        //   drawRotatedImage(this.img,this.x,this.y,calculatePaperPlaneRotation());
        context.drawImage(this.img, this.x, this.y);
    }
};

/**
 * method to alter the plane position in each animation step
 */
function movePaperPlane() {

    paperPlane.x = 100 * Math.cos(animationCycle * 0.1 + 300) + animationCycle * 2;
    paperPlane.y = 100 * Math.sin(animationCycle * 0.1 + 300) + animationCycle * 0.5;

    console.log("paperPlane x = " + paperPlane.x + " paperPlane y = " + paperPlane.y);
}

function calculatePaperPlaneRotation() {
    var rotation = animationCycle % 360;
    console.log("rotation " + rotation + "°");
    return -rotation;
    /*   console.log("delta y = " + (paperPlane.y - 20 - animationCycle * 5));
     console.log("delta x = " + (paperPlane.x - animationCycle * 20));
     return 180;*/
}



