var canvas, context, canvasWidth, canvasHeight;

function init() {
    canvas = document.getElementById("canvas"); //gets the predefined canvas element
    context = canvas.getContext("2d"); //gets the canvas' context to draw on

    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    barrier.y = canvasHeight - barrier.height; //set initial barrier position 

    //if the mouse button gets clicked, the method "handleMouseClickDown" should be loaded
    canvas.addEventListener("mousedown", handleMouseClickDown, false);

    draw();

}

var bird = {
    img: new Image(), //create new image element
    x: 10,
    y: 200,
    width: 100,
    height: 100,
    vx: 100,  //bird should move 100pixels to the right in every animation cycle
    vy: 10,     //bird should move down 10 pixels in every animation cycle
    draw: function() { //draws the bird
        this.img.src = 'http://freepngimages.com/wp-content/uploads/2014/06/stork_1.png';
        context.drawImage(this.img, this.x, this.y, this.width, this.height); //position image and scale
    }
}

var barrier = {
    width: 50,
    height: 300,
    x: 300,
    y: 0,
    draw: function() {
        //draw barrier
        context.fillStyle = "rgb(100,20,222)";
        context.fillRect(this.x, this.y, this.width, this.height);
        console.log("y: " + this.y + " height: " + this.height);
    }
}

function draw() {

    /* Animation steps
     1) Clear the canvas
     Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is using the clearRect() method.
     2) [optional] Save the canvas state
     If you're changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
     3) Draw animated shapes
     The step where you do the actual frame rendering.
     4) [optional] Restore the canvas state
     If you've saved the state, restore it before drawing a new frame.
     */

    context.clearRect(0, 0, canvasWidth, canvasHeight); //1) clear the canvas before animating

    // 3) draw objects that should be animated. 
    bird.draw();
    barrier.draw();
    //drawDemoObjects();
}



function handleMouseClickDown(event) {
    var mousePos = getMousePos(canvas, event);

    //check if the barrier is clicked (mouse pointer position x & y must be in the area that is occupied by the barrier.
    if (mousePos.y > barrier.y && mousePos.y < barrier.y + barrier.height && mousePos.x > barrier.x && mousePos.x < barrier.x + barrier.width) {
        console.log("hallo");
        alterBarrierHeight(event)
    }
}

function alterBarrierHeight(event) {

    var startAnimation = function(evt) { // track mouse position, and change the height of the barrier according to the current mouse pointer position
        var mousePos = getMousePos(canvas, evt);
        barrier.y = mousePos.y;
        barrier.height = canvasHeight;
        window.requestAnimationFrame(draw);
    }

    var stopAnimation = function(evt) { //animation should stop, if mouse click ended
        canvas.removeEventListener('mousemove', startAnimation)
        canvas.removeEventListener('mouseup', stopAnimation)
        console.log("stop");
    }

    canvas.addEventListener('mousemove', startAnimation, false); //on every mousepointer move,
    // dragAnimation will be invoked

    canvas.addEventListener('mouseup', stopAnimation, false);
}


/**
 * method to alter the birds position according to the given velocity values
 */
function moveBird() {
    bird.x += bird.vx;
    bird.y += bird.vy;
    window.requestAnimationFrame(draw);
}


//Helper Methods

function getMousePos(canvas, evt) { //returns the current mouse position in canvas
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawDemoObjects() {  //draws demo objects
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
}


window.onload = init