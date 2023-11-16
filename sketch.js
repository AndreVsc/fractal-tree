const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
var slider;
var sliderRed;
var sliderGreen;
var sliderBlue;
var angle = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    slider = createSlider(0, Math.PI * 2, Math.PI / 4, 0);
    sliderRed = createSlider(0, 255);
    sliderGreen = createSlider(0, 255);
    sliderBlue = createSlider(0, 255);
}

function draw() {
    background(255);
    angle = slider.value();
    translate(Number.parseInt(WIDTH / 2), HEIGHT);
    branch(200);
}

function branch(length) {
    let r = sliderRed.value();
    let g = sliderGreen.value();
    let b = sliderBlue.value();

    stroke(Number.parseInt((r - length)), Number.parseInt((g - length)), Number.parseInt((b - length)));
    line(0, 0, 0, -length);
    translate(0, -length);

    if (length > 3) {
        push();
        rotate(angle);
        branch(length * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(length * 0.67);
        pop();
    }
}