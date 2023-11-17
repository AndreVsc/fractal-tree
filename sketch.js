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
    sliderLength.attribute('title', 'This can cause some lags');
    lengthDiv.child(lengthText);
    lengthDiv.child(sliderLength);

    let facDiv = createDiv();
    facDiv.addClass('fac');
    
    facText = createP(`Fac`);
    sliderFac = createSlider(0, 80, 67);
    sliderFac.attribute('title', 'This can cause too lags');
    facDiv.child(facText);
    facDiv.child(sliderFac);
    
    let windStrengthDiv = createDiv();
    windStrengthDiv.addClass('wind-strength');
    
    windStrengthText = createP(`Wind Strength`);
    sliderWindStrength = createSlider(0, 100, 10);
    windStrengthDiv.child(windStrengthText);
    windStrengthDiv.child(sliderWindStrength);

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
    headerDiv.child(facDiv);
    headerDiv.child(windStrengthDiv);
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
    facText.html(`Fac: ${sliderFac.value()/100} CAUTION!`);
    windStrengthText.html(`Wind Strength: ${sliderWindStrength.value()/100}`);
    redText.html(`Red: ${sliderRed.value()}`);
    greenText.html(`Green: ${sliderGreen.value()}`);
    blueText.html(`Blue: ${sliderBlue.value()}`);
}

function branch(length) {
    var r = sliderRed.value();
    var g = sliderGreen.value();
    var b = sliderBlue.value();
    var framing = frameCount * 0.05
    
    // Natural Tree movement
    const nonWindVariation = 0.002 * sin(framing);
    
    // Wind
    const windStrength = sliderWindStrength.value() / 200;

    angleVariation = windStrength * sin(framing);

    const calculatedWind = angleVariation + nonWindVariation;
    
    const fac = sliderFac.value()/100; // -> recursive length of next branch (the closer to 1 the more denser and lag)

    stroke(Number.parseInt((r - length)), Number.parseInt((g - length)), Number.parseInt((b - length)));
    line(0, 0, 0, -length);
    translate(0, -length);

    // Length limit (The smaller the more lag)
    if (length > 3) {
        push();
        rotate(angle + calculatedWind);
        branch(length * fac);
        pop();
        push();
        rotate(-angle + calculatedWind);
        branch(length * fac);
        pop();
    }
}