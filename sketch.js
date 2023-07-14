let myShape;
let myRoad;
let verts = [];
let R = 40;
let drawing = true;
let rasterGrootte = 50;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight-4);
}

function mouseClicked() {
  if (!drawing) {
    return;
  }
  if (verts.length > 2 && verts[0].dist(createVector(mouseX-width/2, mouseY-height/2)) <= 15) {
    drawing = false;
    myShape = new Shape(verts, createVector(0, height/2));
    myShape.generateContourPoints();

    myRoad = new Road(myShape, height/2);
    translate(-width/2, 0);
  } else {
    if (verts.length == 0) {
      verts.push(createVector(mouseX-width/2, mouseY-height/2))
    } else if (verts[verts.length - 1].angleBetween(createVector(mouseX-width/2, mouseY-height/2)) < 0) {
      verts.push(createVector(mouseX-width/2, mouseY-height/2));
    }
    
  }
  
}

function draw() {
  if (drawing) {
    background(220);
    strokeWeight(1);
    translate(width/2, height/2);
    for (let i = -floor((width/2)/rasterGrootte)*rasterGrootte; i < width/2; i += rasterGrootte) {
      line(i, -height/2, i, height/2);
    }
    for (let i = -floor((height/2)/rasterGrootte)*rasterGrootte; i < height/2; i += rasterGrootte) {
      line(-width/2, i, width/2, i);
    }
    
    textAlign(CENTER);
    textSize(24);
    fill(0, 102, 160);
    text("Go counter-clockwise around the dot", 0, -height/2 + 50);
    //text("Try to avoid concave shapes", 0, -height/2 + 100);
    
    strokeWeight(10);
    point(0, 0);
    noFill();
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < verts.length; i++) {
      vertex(verts[i].x, verts[i].y);
    }
    endShape();
    return;
  }
  background(220);
  stroke(248,1,1);
  line(0, height/2, width, height/2);
  myShape.axle.x = mouseX;
  if (myShape.axle.x > width)
    myShape.axle.x = width;
  
  let i = 0;
  while (myShape.axle.x > myRoad.anglesPerX[i][0]) {
    i++;
    if (i >= myRoad.anglesPerX.length) {
      i = myRoad.anglesPerX.length - 1;
      break;
    }
  }
  if (i < myRoad.anglesPerX.length - 1) {
    myShape.angle = map(myShape.axle.x, myRoad.anglesPerX[i][0], myRoad.anglesPerX[i+1][0], myRoad.anglesPerX[i][1], myRoad.anglesPerX[i+1][1]);
  } else {
    myShape.angle = myRoad.anglesPerX[i][1];
  }
  
    
  
  myRoad.show();
  myShape.draw();
}
