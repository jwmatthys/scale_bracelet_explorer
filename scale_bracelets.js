const RING_SIZE = 400;
const BEAD_SIZE = 80;
let circles = [];
let scaleNum = 0;
let rotation;
let nextRotation = [];
let circlesOffset = 0;
let myFont;
let circleCenter;

function preload() {
  myFont = loadFont('assets/Lora-Regular.ttf');
}

function setup() {
  createCanvas(640, 640);
  circleCenter = (height/2) - 30;
  angleMode(DEGREES);
  smooth();
  textFont(myFont);
  textSize(24);
  //frameRate(1);
  for (let i=0; i<12; i++) { 
    circles[i] = false;
  }
  rotation = new Integrator(0);
}


function draw() {
  background(200);
  stroke(0);
  strokeWeight(1);
  line(0, height-80, width, height-80);
  line (width/2, height-80, width/2, height);
  noStroke();
  fill(0);
  textAlign(CENTER);
  text("Rotate left", width/4, height-30);
  text("Rotate right", width*3/4, height-30);
  translate(width/2, circleCenter);
  strokeWeight(2);
  stroke(0);
  fill(255);
  ellipse(0, 0, RING_SIZE, RING_SIZE);
  noStroke();
  fill(0);
  text("Scale "+scaleNum, 0, 0);
  stroke(0);
  strokeWeight(2);
  rotate(180);
  if (rotation.targeting) {
    rotation.tick();
  }
  if (rotation.arrived) {
    if (rotation.target === 30) {
      console.log("arrived - rotate right");
      circlesOffset = (circlesOffset + 11) % 12;
      rotation.target = rotation.value = 0;
    } else if (rotation.target === -30) {
      console.log("arrived - rotate left");
      circlesOffset++;
      rotation.target = rotation.value = 0;
    }
    recalcScaleNum();

    if (nextRotation.length > 0) {
      rotation.setTarget(nextRotation.pop());
    }
  }
  rotate(rotation.get());

  for (let i=0; i < 12; i++)
  {
    push();
    rotate(30*i);
    translate(0, RING_SIZE/2);
    fill (circleVal(i) ? 0 : 255);
    ellipse(0, 0, BEAD_SIZE, BEAD_SIZE);
    pop();
  }
}

function mouseClicked()
{
  let d = dist(mouseX, mouseY, width/2, circleCenter);
  let a = atan2(circleCenter - mouseY, (width / 2) - mouseX);
  if (abs(d) < RING_SIZE / 4)
  {
    open("https://ianring.com/musictheory/scales/"+scaleNum);
    return;
  }
  if (mouseY >= height-80) {
    if (mouseX < width/2) { 
      nextRotation.push(-30);
    } else { 
      nextRotation.push(30);
    }
  } else if ((d > (RING_SIZE - BEAD_SIZE) / 2) &&
    (d < (RING_SIZE + BEAD_SIZE) / 2))
  {
    flipCircleVal((9+round(a/30))%12);
    recalcScaleNum();
  }
}

function recalcScaleNum()
{
  scaleNum = 0;
  for (let i = 0; i < 12; i++)
  {
    if (circleVal(i)) { 
      scaleNum += pow(2, i);
    }
  }
}


function keyPressed()
{
  if (keyCode === LEFT_ARROW) {
    nextRotation.push(-30);
  }
  if (keyCode === RIGHT_ARROW) {
    nextRotation.push(30);
  }
}

function circleVal (i) {
  return circles[(i + circlesOffset) % 12];
}

function flipCircleVal (i) {
  let oldVal = circles[(i + circlesOffset) % 12];
  circles[(i + circlesOffset) % 12] = !oldVal;
}
