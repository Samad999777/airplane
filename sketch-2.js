var canvas;
var points = [];
var pointsonground = [];
var mult = 0.01;
var density;
var space;

function setup() {
    canvas = createCanvas(windowWidth,1500);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    angleMode (DEGREES);
    noiseDetail(1);
     density = 30;
    space = width / density;
  
  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector (x + random (-10, 10), y + random(-10, 10) )
      points.push(p)
  
    }
  }
}

function draw() {
    background(0);
    noStroke();
  fill(255);
  
  for (var i = 0; i < points.length; i++) {
    var angle = map(noise(points[i].x * mult, points[i].y * mult),0,2,0,650)
    points[i].add(createVector(cos(angle), sin(angle)))
    if(points[i].y>height - 1) {
      points[i].y = 0;
      points[i].x += random(-30,30);
      var p = createVector (points[i].x, height-1 )
      pointsonground.push(p) 



    
    }
    ellipse(points[i].x, points[i].y, 3) 
    }
    
    for (var i = 0; i < pointsonground.length; i++) {
      ellipse(pointsonground[i].x, pointsonground[i].y, 3) 
    }

   
  

}