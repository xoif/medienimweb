/**
 * Created by Rolf on 30.01.2017.
 */

var paperPlane = {
    img: new Image(), //create new image element
    x: 10,
    y: 200,
    width: 100,
    height: 100,
    vx: 100, //paperPlane should move 100pixels to the right in every animation cycle
    vy: 10, //paperPlane should move down 10 pixels in every animation cycle
    draw: function () { //draws the paperPlane
        this.img.src = 'svg/papierflieger.svg';
        context.drawImage(this.img, this.x, this.y, this.width, this.height); //position image and scale
    }
};

/**
 * method to alter the birds position according to the given velocity values
 */
function movePaperPlane() {
    paperPlane.x += paperPlane.vx;
    paperPlane.y += paperPlane.vy;
    window.requestAnimationFrame(draw);
}


