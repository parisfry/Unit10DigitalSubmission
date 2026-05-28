// SKETCH 1 - MOUSE REACTIVE

new p5((p) => {

  let cols = 50;
  let rows = 50;

  p.setup = function () {
    const container = document.getElementById("sketch1");
    const canvas = p.createCanvas(container.offsetWidth, container.offsetWidth * 0.66);
    canvas.parent("sketch1");
  }

  p.windowResized = function () {
  const container = document.getElementById("sketch1");
  p.resizeCanvas(container.offsetWidth, container.offsetWidth * 0.66);
};

  p.draw = function () {
    p.background(0);
    p.stroke(255);
    p.noFill();

    let t = p.frameCount * 0.04;

    let inside = p.mouseX >= 0 && p.mouseX <= p.width &&
                 p.mouseY >= 0 && p.mouseY <= p.height;

    let cx = inside ? p.mouseX : p.width / 2;
    let cy = inside ? p.mouseY : p.height / 2;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {

        let px = x * (p.width / cols);
        let py = y * (p.height / rows);

        let d = p.dist(px, py, cx, cy);
        let influence = p.map(d, 0, 400, 20, 0);

        let offset = p.sin(t + d * 0.02) * influence;

        p.circle(px + offset, py + offset, 3);
      }
    }
  };

});

// SKETCH 2 - MOUSE REACTIVE
new p5((p) => {

  let cols = 60;
  let rows = 60;
  let points = 3;

  p.setup = function () {
    const container = document.getElementById("sketch2");
    const canvas = p.createCanvas(container.offsetWidth, container.offsetWidth * 0.66);
    canvas.parent("sketch2");

    p.noFill();
    p.stroke(255);
  };

  p.windowResized = function () {
    const container = document.getElementById("sketch2");
    p.resizeCanvas(container.offsetWidth, container.offsetWidth * 0.66);
  };

  p.draw = function () {
    p.background(0);

    let t = p.frameCount * 0.05;

    let xStep = p.width / cols;
    let yStep = p.height / rows;

    let inside = p.mouseX >= 0 && p.mouseX <= p.width &&
                 p.mouseY >= 0 && p.mouseY <= p.height;

    let mx = inside ? p.mouseX : p.width / 2;
    let my = inside ? p.mouseY : p.height / 2;

    let influences = [];
    for (let i = 0; i < points; i++) {
      influences.push({
        x: mx + p.cos(t * (0.5 + i * 0.3) + i) * 120,
        y: my + p.sin(t * (0.3 + i * 0.2) + i) * 120
      });
    }

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {

        let px = x * xStep;
        let py = y * yStep;

        let offsetX = 0;
        let offsetY = 0;
        let minDist = Infinity;

        for (let pt of influences) {
          let dx = px - pt.x;
          let dy = py - pt.y;
          let d = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));

          minDist = Math.min(minDist, d);

          let strength = p.map(d, 0, 300, 10, 0);
          offsetX += (dx / d) * strength;
          offsetY += (dy / d) * strength;
        }

        let size = p.constrain(p.map(minDist, 0, 200, 6, 2), 2, 6);
        let wave = p.sin(px * 0.015 + py * 0.015 + t) * 1.5;

        p.circle(px + offsetX + wave, py + offsetY + wave, size);
      }
    }
  };

});


