const canvas = document.querySelector('#draw');
const colorSelect = document.querySelector('#lineColor');
const brushWidth = document.querySelector('#lineWidth'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//brush style 
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let rainbow = false;
let lastX = 0;
let lastY = 0;

// line color
let hue = 0;
let line = 25;
let lineColor = '#696969';

function draw(e) {
    if(!isDrawing) return;
    if(rainbow) { 
        setRainbow()
    }  else {
    ctx.strokeStyle = lineColor;
    }
    ctx.lineWidth = line;
    ctx.beginPath();
    
    // line begins here
    ctx.moveTo(lastX, lastY);
    
    // offset is the line drawn
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    
}

function setLineColor(e) {
    if(e === 'setRainbow') {
        return rainbow = true;
    }
    lineColor = e.target.value;
    return rainbow = false
}

function setRainbow() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue++;
    if(hue >= 360) {
        hue = 0;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    });
canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', () => {
        isDrawing = false;
        });
    canvas.addEventListener('touchcancel', () => {
        isDrawing = false;
        });

colorSelect.addEventListener('change', setLineColor);
brushWidth.addEventListener('change', (e) => {
    line = e.target.value;
})

