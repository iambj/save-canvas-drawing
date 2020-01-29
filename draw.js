const saveBtn = document.getElementById("save");
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth - 2;
// canvas.height = window.innerHeight - 2;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
ctx.lineWidth = "10";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "#BADA55";
// ctx.globalCompositeOperation = "overlay";

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
}

function saveImage() {
    let data = canvas.toDataURL();
    console.log(data);
    return;
    window.location.href = data;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    draw(e);
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
saveBtn.addEventListener("click", saveImage);
