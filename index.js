
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

reader.addEventListener("load", () => {
    // console.log(reader.result);
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img);
        canvas.requestRenderAll();
    })
})

canvas.on('mouse:move', (event) => {
    if (mouseClick) {
        const mEvent = event.e;
        // console.log(mEvent)
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.relativePan(delta)
    }
})


canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    // console.log(canvas.getZoom())
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    if (delta < 0) {
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }
    else {
        const delta = new fabric.Point(0, 0);
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        // canvas.setZoom(zoom);
        canvas.absolutePan(delta)
    }
    opt.e.preventDefault();
    opt.e.stopPropagation();
});


const reset= ()=>{
    const delta = new fabric.Point(0, 0)
    canvas.absolutePan(delta);
    canvas.setZoom(1);
}