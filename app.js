const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveButton = document.getElementById("jsSave");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

// fill canvas with white background by default
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

// manage painting state
let painting = false;
function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}

let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting) {   // if mouse is not being held down
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "🎨mymasterpiece🎨";  // download is an attribute of the anchor tag (HTML)
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange)   // range event is called "input"
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveButton) {
    saveButton.addEventListener("click", handleSaveClick);
}