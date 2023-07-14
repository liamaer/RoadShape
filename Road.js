class Road {
    constructor(shape, h) {
      this.vertices = [];
      this.anglesPerX = [];
      let currX = 0;
      let currAngle = shape.contourPoints[0].angleBetween(createVector(0,1));
      this.vertices.push(createVector(0, shape.contourPoints[0].mag()));
      this.anglesPerX.push([0, currAngle]);
      for (let i = 0; currX <= width; i = (i+1) % shape.contourPoints.length) {
        let deltaAngle = abs(myShape.contourPoints[i].angleBetween(myShape.contourPoints[(i+1) % shape.contourPoints.length]));
        let x = deltaAngle * myShape.contourPoints[i].mag();
        let y = myShape.contourPoints[(i+1) % shape.contourPoints.length].mag();
        currX += x;
        currAngle += deltaAngle;
        this.vertices.push(createVector(currX, y));
        this.anglesPerX.push([currX, currAngle]);
      }
      this.h = h;
    }
    
    show() {
      push();
      noFill();
      stroke(0);
      strokeWeight(2);
      translate(0, this.h);
      beginShape();
      for (let i = 0; i < this.vertices.length; i++) {
        vertex(this.vertices[i].x, this.vertices[i].y);
      }
      endShape();
      pop();
    }
  }