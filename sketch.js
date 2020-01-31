var myMap;
var canvas;
var myLoc;
var data;
var tLat = 34.169701;
var tLon = 28.311039;

var mappa = new Mappa("Mapbox", "pk.eyJ1IjoibWFyaWFwOTI1IiwiYSI6ImNrMnVrNGN5ajExNTMzYm56dDJ3b2JyaDIifQ.G5Wzsmz_LCuwx7Y6DOBOlQ");

var options = {
  lat: tLat,
  lng: tLon,
  zoom: 5,
  studio: true,
  style: "mapbox://styles/mariap925/ck619aqyi06vs1ikbcim1n8l5",
}

function preload() {
  // access json data with coordinates of world wonders
  data = loadJSON("assets/wonders.json");
  myLoc = getCurrentPosition();
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  console.log(data);


}

function draw() {
  clear();

  // get my current Position
  push();

  var me = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  noStroke();
  fill(138, 66, 245, 60);
  ellipse(me.x, me.y, 25);
  fill(138, 66, 245, 180);
  ellipse(me.x, me.y, 10);
  pop();

  // extract the data from json file array and graphic the coordinates
  push();
  var wonders = data.wonders;
  for (var i = 0; i < data.wonders.length; i++) {
    var wonders = myMap.latLngToPixel(data.wonders[i].latitude, data.wonders[i].longitude); {
      stroke("blue");
      strokeWeight(5)
      noFill();
      ellipse(wonders.x, wonders.y, 8);
    }
  }
  pop();

  //the line between me and 7 wonders
  push();
  stroke(102, 102, 232, 100);
  strokeWeight(2);
  line(me.x, me.y, wonders.x, wonders.y);
  pop();

  //calculate the distance between previous data
  push();
  fill(255);
  noStroke();
  rect((width / 8) - 50, (height / 2) + 235, 480, 18);
  var distance = calcGeoDistance(tLat, tLon, me.x, me.y, "km");
  var far = "km separete you from ancient seven wonders ";
  textSize(15);
  textFont("courier new");
  fill(48, 6, 125);
  strokeWeight(0.5);
  stroke(48, 6, 125);
  text(Math.round(distance) + far, (width / 8) - 50, (height / 2) + 250);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
