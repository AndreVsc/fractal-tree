const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
var slider;
var sliderRed;
var sliderGreen;
var sliderBlue;
var angle = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    
    let angleDiv = createDiv();
    angleDiv.addClass('angle');
    
    angleText = createP(`Angle`);
    sliderAngle = createSlider(0, Math.PI * 2, 0.500, 0);
    angleDiv.child(angleText);
    angleDiv.child(sliderAngle);

    let lengthDiv = createDiv();
    lengthDiv.addClass('length');
    
    lengthText = createP(`Length`);
    sliderLength = createSlider(0, HEIGHT/2.5, 200);
    lengthDiv.child(lengthText);
    lengthDiv.child(sliderLength);
    
    let colorsDiv = createDiv();
    colorsDiv.addClass('colors');
    
    redText = createP(`Red`);
    sliderRed = createSlider(0, 255);
    colorsDiv.child(redText);
    colorsDiv.child(sliderRed);
    
    greenText = createP(`Green`);
    sliderGreen = createSlider(0, 255);
    colorsDiv.child(greenText);
    colorsDiv.child(sliderGreen);
    
    blueText = createP(`Blue`);
    sliderBlue = createSlider(0, 255);
    colorsDiv.child(blueText);
    colorsDiv.child(sliderBlue);

    let headerDiv = createDiv();
    headerDiv.addClass('header');

    headerDiv.child(angleDiv);
    headerDiv.child(lengthDiv);
    headerDiv.child(colorsDiv);
    headerDiv.addClass('flex-col');
}

function draw() {
    background(255);
    angle = sliderAngle.value();

    // Origin position
    translate(Number.parseInt(WIDTH / 2), HEIGHT);

    // Start branch
    branch(sliderLength.value());

    // Labels
    angleText.html(`Angle: ${sliderAngle.value().toFixed(3)} rad`);
    lengthText.html(`Length: ${sliderLength.value()}px (initial branch)`);
    redText.html(`Red: ${sliderRed.value()}`);
    greenText.html(`Green: ${sliderGreen.value()}`);
    blueText.html(`Blue: ${sliderBlue.value()}`);
}

function branch(length) {
    let r = sliderRed.value();
    let g = sliderGreen.value();
    let b = sliderBlue.value();

    const fac = 0.69; // -> recursive length of next branch (the closer to 1 the more denser and lag)

    stroke(Number.parseInt((r - length)), Number.parseInt((g - length)), Number.parseInt((b - length)));
    line(0, 0, 0, -length);
    translate(0, -length);

    // Length limit (The smaller the more lag)
    if (length > 3) {
        push();
        rotate(angle);
        branch(length * fac);
        pop();
        push();
        rotate(-angle);
        branch(length * fac);
        pop();
    }
}