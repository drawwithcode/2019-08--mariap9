var myMap;
var canvas;
var myPos;

var mappa = new Mappa('Leaflet');
//
var puppyLat = 4.635035;
var puppyLng = -74.0724867;
//
var options = {
  lat: 0,
  lng: 0,
  zoom: 3,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

var puppy = {
  lat: puppyLat,
  lng: puppyLng,
}

function preload() {
  myPos = getCurrentPosition();
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  options.lat = myPos.latitude;
  options.lng = myPos.longitude;

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)


  myMap.onChange(drawPoint);
}

function draw() {}

function drawPoint() {
  clear();
  var disAway = calcGeoDistance(myPos.latitude, myPos.longitude, puppyLat, puppyLng, "km");

  push();
  var titlepuppy = "There's no color in my life if my puppy is ";
  drawingContext.font = "normal 20px Roboto Slab";
  fill(255);
  noStroke()
  text(titlepuppy + Math.round(disAway) + 'Km away...', 70, 70);
  pop();


  push();
  var puppy = myMap.latLngToPixel(puppyLat, puppyLng);
  ellipse(puppy.x, puppy.y, 8, 8);
  noFill();
  stroke(255, 217, 0);
  pop();

  push();
  fill(255, 217, 0);
  noStroke();
  var me = myMap.latLngToPixel(myPos.latitude, myPos.longitude);
  ellipse(me.x, me.y, 5, 5);
  pop();

  push();
  stroke(255, 217, 0);
  strokeWeight(0.8);
  line(me.x,me.y,puppy.x,puppy.y);

}
