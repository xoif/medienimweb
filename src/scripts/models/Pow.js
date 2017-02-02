/**
 * Created by ML on 31.01.2017.
 */

var pow = {
    img: new Image(), //create new image element
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    setup: function () {
        this.img.src = 'images/Boom.svg';
    },
    draw: function () { //draws the cloud
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
};

function animatePow() {
    if (pow.height < 200) {
        pow.x = paperPlane.x;
        pow.y = paperPlane.y;
        pow.height += 2;
        pow.width += 2;
    } else {
        stop();
        alert("You loose!");
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        window.location.reload(true);
    }
}