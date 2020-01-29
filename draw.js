// For demo to work, use the data from the URL and save to the text file.

const saveBtn = document.getElementById("save");
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
ctx.lineWidth = "10";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "#BADA55";

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
    window.location.href = data;
    console.log(data);
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
