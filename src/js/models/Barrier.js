/**
 * Created by Rolf on 30.01.2017.
 */

var barrier = {
    width: 50,
    height: 300,
    x: 300,
    y: 0,
    draw: function () {
        //draw barrier
        context.fillStyle = "rgb(100,20,222)";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};


function handleMouseClickDown(event) {
    var mousePos = getMousePos(canvas, event);

    //check if the barrier is clicked (mouse pointer position x & y must be in the area that is occupied by the barrier.
    if (mousePos.y > barrier.y && mousePos.y < barrier.y + barrier.height && mousePos.x > barrier.x && mousePos.x < barrier.x + barrier.width) {
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

