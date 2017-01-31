/**
 * Created by ML on 31.01.2017.
 */

var sun = {
    img: new Image(), //create new image element
    x: 450,
    y: 150,
    draw: function() { //draws the cloud
        this.img.src = 'images/sonne.svg';
        context.drawImage(this.img, this.x, this.y);
    }
};

function moveSun() {
    sun.y = sun.y - 0.1;
}