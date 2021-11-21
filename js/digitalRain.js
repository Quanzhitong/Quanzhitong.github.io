

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function charIndex (arr) {
	return  Math.floor(Math.random() * (arr.length - 1));
}
  class Symbol {
	constructor(options) {
	  this.x = options.x;
	  this.y = options.y;
	  this.speed = options.speed;
	  this.changeRate = options.changeRate;
	  this.colour = options.colour;
	  this.yThreshold = height + textSize();
	}
  

	draw() {
	  if (frameCount % this.changeRate === 0 || !this.character) {
		// 诗句
		var poem = [0x4F60, 0x770B, 0x6211, 0x4E91, 0x5F88, 0x8FD1, 0x8FDC, 0x4E00, 0x4F1A, 0x89C9, 0x5F97, 0x65F6, 0x3002, 0xFF0C];
		// 名品
		var mingPin = [0x5ba2,0x6237,0x81f3,0x4e0a,0x8bda,0x4fe1,0x8d1f,0x8d23,0x0020,0x8d64,0x5154,0x540d,0x54c1,0x0020,0x8ffd,0x6c42,0x5353,0x8d8a];
		// 六字真言
		var fo = [0x55e1,0x561b,0x5462,0x5457,0x54aa,0x543d];
		// 
		// this.character = char(randomInt(65381, 65440)); // 适合快速，小字
		this.character = char(mingPin[charIndex(mingPin)]);
	  }
	  this.y = (this.y > this.yThreshold) ? 0 : this.y + this.speed;
	  fill(this.colour);
	  text(this.character, this.x, this.y);
	}
  }
  
  class Stream {
	constructor(options) {
	  const {
		x,
		y,
		speed,
		length,
	  } = options;
  
	  this.symbols = [];
  
	  for (let i = 0; i < length; i += 1) {
		const baseLightness = (1 - (i / length));
		const lightnessMultiplier = (i < 3) ? (100 - (i * 5)) : 50;
  
		const symbol = new Symbol({
		  x,
		  y: y - (textSize() * i),
		  speed,
		  changeRate: randomInt(100, 400),
		  colour: [120, 100, baseLightness * lightnessMultiplier],
		});
  
		this.symbols.push(symbol);
	  }
	}
  
	draw() {
	  this.symbols.forEach((symbol) => symbol.draw());
	}
  }
  
  class Streams {
	constructor() {
	  this.streams = [];
  
	  for (let i = 0; i < window.innerWidth / textSize(); i += 1) {
		const stream = new Stream({
		  x: i * textSize(),
		  y: randomInt(-1000, 0),
		  speed: randomInt(1, 3),
		  length: randomInt(1, window.innerHeight / 2 / textSize()),
		});
  
		this.streams.push(stream);
	  }
	}
  
	draw() {
	  this.streams.forEach((stream) => stream.draw());
	}
  }
  
  let streams;

  window.onload = function() {
	$('body').prepend($('#defaultCanvas0'))
  }

  window.setup = () => {
	createCanvas(window.innerWidth, window.innerHeight);
	textFont('monospace', 12);
	colorMode(HSL);
	streams = new Streams();
  };
  
  window.draw = () => {
	background(0, 0, 0, 0.6);
	streams.draw();
  };
  
  window.windowResized = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
	streams = new Streams();
  };
  