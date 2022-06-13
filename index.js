
var canvas = new fabric.Canvas('canvas', {
    width: 1000,
    height: 600
})
var mouseClick = false;
console.log(canvas)
canvas.on("mouse:down", () => {
    mouseClick = true;
})
canvas.on("mouse:up", () => {
    mouseClick = false;
})

const reader = new FileReader();
const addImage = (e) => {
    console.log(e);
    const img = document.getElementById('upload-img').files[0];
    console.log(img)
    reader.readAsDataURL(img)
}

const imgInp = document.getElementById('upload-img')
imgInp.addEventListener('change', addImage);
var CanvaImage;
reader.addEventListener("load", () => {
    CanvaImage = fabric.Image.fromURL(reader.result, img => {
        img.scale(0.6)
        canvas.add(img);
        canvas.viewportCenterObjectV(img)
        canvas.viewportCenterObjectH(img)
        canvas.requestRenderAll();
    })
})

canvas.on('mouse:move', (event) => {

    if (mouseClick) {
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.relativePan(delta)
    }
})


var mPosX, mPosY;
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    console.log(opt.e.clientX)
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) {
        zoom = 1;
        var objects = canvas.getObjects();
        canvas.viewportCenterObjectV(objects[0])
        canvas.viewportCenterObjectH(objects[0])
    }
    if (delta < 0) {

        mPosX = opt.e.clientX;
        mPosY = opt.e.clientY;
        console.log("while zoomin ", mPosX, mPosY);  
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }
    else {

        if (mPosX == opt.e.clientX && mPosY == opt.e.clientY) {
            console.log('equ')
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        }
        else {
            var objects = canvas.getObjects();
            canvas.viewportCenterObjectV(objects[0])
            canvas.viewportCenterObjectH(objects[0])
            const delta = new fabric.Point(40, 40);
            canvas.zoomToPoint({ x: mPosX, y: mPosY }, zoom);
            canvas.absolutePan(delta)
        }
    }
    opt.e.preventDefault();
    opt.e.stopPropagation();
});


const reset = () => {
    const delta = new fabric.Point(0, 0)
    canvas.absolutePan(delta);
    canvas.setZoom(1);
}