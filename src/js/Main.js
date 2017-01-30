var canvas, context, canvasWidth, canvasHeight, myTimer;
var dynamic = 10;
var testX = 0;


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
}

/*
 //loop function
 function loop() {

 // change dynamic
 dynamic = dynamic * 1.1;
 x = dynamic;
 y = dynamic * 1.2;

 // stop the the animation if it runs out-of-canvas
 if (x > canvas.width || y > canvas.height) {
 c.clearRect(0, 0, canvas.width, canvas.height);
 clearInterval(myTimer);
 alert("animation done!");
 }

 // clear the canvas for this loop's animation
 c.clearRect(0, 0, canvas.width, canvas.height);
 c.fillStyle = '#87CEEB';

 // draw
 c.beginPath();
 c.arc(x, y, 10, 0, Math.PI * 2, false);
 c.fill();
 }

 $("#go").click(function(){ dynamic=10; myTimer=setInterval(loop,20); });
 */


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
    paperPlane.draw();
    barrier.draw();
}


window.onload = init;