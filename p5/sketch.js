let mic;
let volHistory = [];
var angle = 0;
var state = "record"
let tracksArray = [];
let btnImage1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  btnImage1 = createImg("./img/recordbutton.png", 'the record button');
  createTrack();
  angleMode(DEGREES);


}

function handleTrackButtonClick(trackObject) {
  if (trackObject.state === "idle" && mic.enabled) {
    trackObject.recorder.record(trackObject.soundFile);
    state = "recording";
    trackObject.state = "recording";
	btnImage1.elt.src  = "./img/stopbutton.png"; 
  } else if (trackObject.state === "recording") {
    trackObject.recorder.stop();
     state = "stopped";
    trackObject.state = "stopped";
	btnImage1.elt.src  = "./img/playbutton.png";
  } else if (trackObject.state === "stopped") {
    state = "playing";
    trackObject.state = "playing";
    btnImage1.elt.src  = "./img/stopbutton.png";
	trackObject.soundFile.loop();
    
  } else if (trackObject.state === "playing") {
    trackObject.soundFile.stop();
    state = "stopped";
    trackObject.state = "stopped";
    btnImage1.elt.src  = "./img/playbutton.png";
  }
}

function createTrack() {
  const newTrackObject = {
    button: btnImage1,
    state: "idle",
    recorder: new p5.SoundRecorder(),
    soundFile: new p5.SoundFile()
  };
  
  btnImage1.mouseClicked(function() {
     handleTrackButtonClick(newTrackObject);
  });
  
  newTrackObject.recorder.setInput(mic);
  
  tracksArray.push(newTrackObject);
}

function draw() {
  background(0,0,0,8);
  let vol = mic.getLevel();
  volHistory.push(vol);
  translate(width/2, height/2)
 
  r = random(229); 
  g = random(204); 
  b = random(1255); 
  a = random(220); 
  fill(r, g, b, a);
  noStroke();

 
  if(state === "recording" || state === "playing"){
    beginShape();
    for (let i = 0; i < 360; i++) {
      stroke(255);
      let r = map(volHistory[i], 0, 1, 10, 1000);
      let x = r * cos(i);
      let y = r * sin(i);
      vertex(x, y);
    }
    endShape();
  }

  if(volHistory.length > 360) {
    volHistory.splice(0,1);
  }
}
