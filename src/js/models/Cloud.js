/**
 * Created by ML on 31.01.2017.
 */

var cloud1 = {
    img: new Image(), //create new image element
    x: 30,
    y: 170,
    draw: function() { //draws the cloud
        this.img.src = 'svg/wolke.svg';
        context.drawImage(this.img, this.x, this.y);
    }
};

/**
 * move cloud
 */

function moveCloud1() {
    cloud1.x = cloud1.x + 1;
}


var cloud2 = {
    img: new Image(), //create new image element
    x: 20,
    y: 35,
    draw: function() { //draws the cloud
        this.img.src = 'svg/wolke2.svg';
        context.drawImage(this.img, this.x, this.y);
    }
};

/**
 * move cloud
 */

function moveCloud2() {
    cloud2.x = cloud2.x + 0.4;
}