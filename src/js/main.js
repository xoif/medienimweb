var canvas, context, canvasWidth, canvasHeight;

function init() {
    canvas = document.getElementById("canvas"); //gets the predefined canvas element
    context = canvas.getContext("2d"); //gets the canvas' context to draw on

    canvas.width = window.innerWidth-100;
    canvas.height = window.innerHeight-100;

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    barrier.y = canvasHeight - barrier.height;

    draw();

    canvas.addEventListener("mousedown", function(e) {
            barrier.height = e.clientY;
            barrier.draw(true);
            console.log("test");
    });
}


function draw() {

    context.clearRect(0,0,canvasWidth,canvasHeight);

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

    bird.draw();
    barrier.draw(false);

    /* Animation steps
     1) Clear the canvas
     Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is using the clearRect() method.
     2) Save the canvas state
     If you're changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
     3) Draw animated shapes
     The step where you do the actual frame rendering.
     4) Restore the canvas state
     If you've saved the state, restore it before drawing a new frame.
     */
}

var bird = {
    img: new Image(), //create new image element
    x: 10,
    y: 200,
    width: 100,
    height: 100,
    vx: 100,
    vy: 10,
    draw: function() {
        this.img.src = 'http://freepngimages.com/wp-content/uploads/2014/06/stork_1.png';
        context.drawImage(this.img, this.x, this.y, this.width, this.height); //position image and scale
    }
}

var barrier = {
    width: 50,
    height: 300,
    x: 300,
    y: 0,
    draw: function (repeat) {
        //draw barrier
        context.fillStyle = "rgb(100,20,222)";
        context.fillRect(this.x,this.y, this.width, this.height);
        if (repeat == true){
            this.draw()
            console.log("nice");
        }
    }
}

function moveBird() {
    bird.x += bird.vx;
    bird.y += bird.vy;
    window.requestAnimationFrame(draw);
}

window.onload = init