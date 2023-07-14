class Shape {
    constructor(vertices, axle) {
      this.vertices = vertices;
      this.axle = axle;
      this.angle = 0;
      this.contourPoints = [];
      this.numPointsPerEdge = 50; // Number of contour points per edge
      this.generateContourPoints();
    }
  
    draw() {
      push();
      translate(this.axle.x, this.axle.y);
      rotate(this.angle);
      stroke(0);
      noFill();
      strokeWeight(2);
      beginShape();
      for (let i = 0; i < this.vertices.length; i++) {
        vertex(this.vertices[i].x, this.vertices[i].y);
      }
      endShape(CLOSE);
      strokeWeight(5);
      point(0, 0);
  
      pop();
    }
  
    rotate(angle) {
      this.angle += angle;
    }
  
    generateContourPoints() {
      const numVertices = this.vertices.length;
  
      for (let i = 0; i < numVertices; i++) {
        const currentVertex = this.vertices[i];
        const nextVertex = this.vertices[(i + 1) % numVertices];
  
        for (let j = 0; j < this.numPointsPerEdge; j++) {
          const t = j / this.numPointsPerEdge;
          const point = this.interpolateVertices(currentVertex, nextVertex, t);
          this.contourPoints.push(point);
        }
      }
    }
  
    interpolateVertices(vertex1, vertex2, t) {
      const x = lerp(vertex1.x, vertex2.x, t);
      const y = lerp(vertex1.y, vertex2.y, t);
      return createVector(x, y);
    }
  }