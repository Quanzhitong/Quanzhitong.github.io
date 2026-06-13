function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Bug fix: original used arr.length - 1 which never picks last element
function charIndex(arr: number[]): number {
	return Math.floor(Math.random() * arr.length);
}

class Symbol {
	x: number;
	y: number;
	speed: number;
	changeRate: number;
	colour: [number, number, number];
	yThreshold: number;
	character: string = '';

	private poem = [0x4F60, 0x770B, 0x6211, 0x4E91, 0x5F88, 0x8FD1, 0x8FDC, 0x4E00, 0x4F1A, 0x89C9, 0x5F97, 0x65F6, 0x3002, 0xFF0C];
	private mingPin = [0x5ba2, 0x6237, 0x81f3, 0x4e0a, 0x8bda, 0x4fe1, 0x8d1f, 0x8d23, 0x0020, 0x8d64, 0x5154, 0x540d, 0x54c1, 0x0020, 0x8ffd, 0x6c42, 0x5353, 0x8d8a];
	private fo = [0x55e1, 0x561b, 0x5462, 0x5457, 0x54aa, 0x543d];

	constructor(options: { x: number; y: number; speed: number; changeRate: number; colour: [number, number, number]; yThreshold: number }) {
		this.x = options.x;
		this.y = options.y;
		this.speed = options.speed;
		this.changeRate = options.changeRate;
		this.colour = options.colour;
		this.yThreshold = options.yThreshold;
	}

	draw() {
		if (frameCount % this.changeRate === 0 || !this.character) {
			this.character = String.fromCharCode(this.mingPin[charIndex(this.mingPin)]);
		}
		this.y = this.y > this.yThreshold ? 0 : this.y + this.speed;
		fill(this.colour);
		text(this.character, this.x, this.y);
	}
}

class Stream {
	symbols: Symbol[] = [];

	constructor(options: { x: number; y: number; speed: number; length: number; yThreshold: number }) {
		const { x, y, speed, length, yThreshold } = options;
		for (let i = 0; i < length; i += 1) {
			const baseLightness = 1 - i / length;
			const lightnessMultiplier = i < 3 ? 100 - i * 5 : 50;
			const symbol = new Symbol({
				x,
				y: y - textSize() * i,
				speed,
				changeRate: randomInt(100, 400),
				colour: [120, 100, baseLightness * lightnessMultiplier],
				yThreshold,
			});
			this.symbols.push(symbol);
		}
	}

	draw() {
		this.symbols.forEach((symbol) => symbol.draw());
	}
}

class Streams {
	streams: Stream[] = [];

	constructor() {
		for (let i = 0; i < window.innerWidth / textSize(); i += 1) {
			const stream = new Stream({
				x: i * textSize(),
				y: randomInt(-1000, 0),
				speed: randomInt(1, 3),
				length: randomInt(1, window.innerHeight / 2 / textSize()),
				yThreshold: height + textSize(),
			});
			this.streams.push(stream);
		}
	}

	draw() {
		this.streams.forEach((stream) => stream.draw());
	}
}

export let streams: Streams | null = null;

export function initDigitalRain(p5: any, canvasParent: HTMLElement) {
	const p5Instance = new p5((p: any) => {
		p.setup = () => {
			const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
			canvas.parent(canvasParent);
			p.textFont('monospace', 12);
			p.colorMode(p.HSL);
			streams = new Streams();
		};

		p.draw = () => {
			p.background(0, 0, 0, 0.6);
			if (streams) {
				streams.draw();
			}
		};

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight);
			streams = new Streams();
		};
	});
	return p5Instance;
}