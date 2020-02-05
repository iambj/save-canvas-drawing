// For demo to work, use the data from the URL and save to the text file.

// This is the "editor"/"originator" class

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
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
    undo.setContent(canvas.toDataURL()); // On mouse up save image to state.
    history.push(undo.createState());
    if (e.which !== 1) return; // stop if the left click isn't used.
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    draw(e);
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
saveBtn.addEventListener("click", saveImage);

let undo = new Editor();
let history = new History();
undo.setContent("");
history.push(undo.createState());

undoBtn.addEventListener("click", () => {
    console.log(history.listStates());
    let lastState = history.pop();
    if (!lastState) return;
    if (lastState.data.length === 0) {
        ctx.clearRect(0, 0, 500, 500);
        undo.setContent("");
    } else {
        let img = new Image();
        img.src = lastState.getContent();
        img.onload = function() {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(img, 0, 0);
        };
    }
});

// TODO
// redoBtn.addEventListener("click", () => {
//     let redo = history.redoStates.pop();
//     if (redo) {
//         history.states.push(redo);
//         console.log(redo.getContent());
//         let img = new Image();
//         img.src = redo.getContent();
//         img.onload = function() {
//             ctx.clearRect(0, 0, 500, 500);
//             ctx.drawImage(img, 0, 0);
//         };
//     }
// });
