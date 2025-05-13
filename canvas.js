let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let showCentipede = windowWidth >= 700;
let showCritter = windowWidth >= 700;

console.log("Window dimentions:", windowWidth, windowHeight);

window.addEventListener("resize", function() {
	windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
	
	particles = [];
	init();
	
	showCentipede = windowWidth >= 700;
	canvas.width = Math.max(windowWidth, windowWidth);
	canvas.height = windowHeight;
	
	//if (showCentipede && !centipede) centipede = initializeCentipede();
});

// Document (page) event listening

let Input = {
  keys: [],
  mouse: {
    left: false,
    right: false,
    middle: false,
    x: 0,
    y: 0
  }
};
/*
for (var i = 0; i < 230; i++) {
    Input.keys.push(false);
}
*/
document.addEventListener("keydown", function(event) {
    Input.keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
    Input.keys[event.keyCode] = false;
});
document.addEventListener("mousedown", function(event) {
	if ((event.button === 0)) {
	    Input.mouse.left = true;
	}
	if ((event.button === 1)) {
		Input.mouse.middle = true;
	}
	if ((event.button === 2)) {
		Input.mouse.right = true;
	}
});
document.addEventListener("mouseup", function(event) {
	if ((event.button === 0)) {
		Input.mouse.left = false;
	}
	if ((event.button === 1)) {
		Input.mouse.middle = false;
	}
	if ((event.button === 2)) {
		Input.mouse.right = false;
	}
});
document.addEventListener("mousemove", function(event) {
    Input.mouse.x = event.x;
    Input.mouse.y = event.y;
	// Make 1 particle appear
	//particles.push(new Particle());
	// Make 2 or more particles appear
    //createParticles();
});
document.addEventListener("click", event => {
	bounceSound.play();
	Input.mouse.x = event.x;
	Input.mouse.y = event.y;
	// Make 1 particle appear
	//particles.push(new Particle());
	// Make 2 or more particles appear
	//removeParticles = true;
	createDparticles();
	
	if (options.style.display === "block" && !options.contains(event.target) && event.target !== optionsB && !cConOpen && !sConOpen) {
		options.style.display = "none";
		optionsOpened = false;
	}
});

// Canvas set up

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = Math.max(window.innerWidth, window.innerWidth);
canvas.style.backgroundColor = "rgb(8, 8, 8)";

//                        Options

const optionsB = document.getElementById("Options-b");
const options = document.querySelector(".Options");

const colorChangeB = document.getElementById("color-change");
const colorOptions = document.querySelector(".color-settings");
let cConOpen = false;

let optionsOpened = false;

optionsB.onclick = () => {
	optionsOpened ? options.style.display = "none" : options.style.display = "block"
	optionsOpened = !optionsOpened;
}

colorChangeB.onmouseover = () => { colorChangeB.style.background = "rgba(89, 89, 89, 0.5)"  }
colorChangeB.onmouseout = () => { if (!cConOpen) colorChangeB.style.background = "rgba(8, 8, 8, 0.1)"  }

colorChangeB.onclick = () => {
	switch(cConOpen) {
		case false:
			colorChangeB.style.background = "rgba(89, 89, 89, 0.5)";
			colorOptions.style.display = "block";
			if (sConOpen) { 
				particleSpeedB.style.background = "rgba(8, 8, 8, 0.1)";
				speedOptions.style.display = "none";
				sConOpen = false;
			}
		break;
		case true:
			colorChangeB.style.background = "rgba(8, 8, 8, 0.1)";
			colorOptions.style.display = "none";
		break;
	}
	cConOpen = !cConOpen;
}

const particleSpeedB = document.getElementById("particle-speed");
const speedOptions = document.querySelector(".speed-settings");
let sConOpen = false;

particleSpeedB.onclick = () => {
	switch(sConOpen) {
		case false:
			particleSpeedB.style.background = "rgba(89, 89, 89, 0.5)";
			speedOptions.style.display = "block";
			if (cConOpen) { 
				colorChangeB.style.background = "rgba(8, 8, 8, 0.1)";
				colorOptions.style.display = "none";
				cConOpen = false;
			}
		break;
		case true:
			particleSpeedB.style.background = "rgba(8, 8, 8, 0.1)";
			speedOptions.style.display = "none";
		break;
	}
	sConOpen = !sConOpen;
}
particleSpeedB.onmouseover = () => { particleSpeedB.style.background = "rgba(89, 89, 89, 0.5)"  }
particleSpeedB.onmouseout = () => { if (!sConOpen) particleSpeedB.style.background = "rgba(8, 8, 8, 0.1)"  }

// Color change functioning

const randomizeB = document.getElementById("randomly");
const ascensionB = document.getElementById("ascending");
const descensionB = document.getElementById("descending");

let colors = [
	"rgba(225, 0, 0, 0.7)", "rgba(100, 0, 0, 0.7)", "rgba(208 ,49, 45, 0.7)", "rgba(153, 15, 4, 0.7)", "rgba(95, 10, 3, 255)", "rgba(76, 8, 5, 0.7)", "rgba(66, 13, 9, 0.7)", "rgba(94, 24, 22, 0.7)", // red, darkred, lightred, cherry, garenet, wine, mahogany, sangria
	"rgba(0, 255, 0, 0.7)", "rgba(0, 100, 0, 0.7)", "rgba(125, 251, 1, 0.7)", "rgba(50, 205, 51, 0.7)", "rgba(50, 205, 51, 0.7)", "rgba(0, 92, 41, 0.7)", "rgba(19, 53 ,36, 0.7)", "rgba(152, 254,152, 0.7)", // green, darkgreen, lightgreen, lime, india, cadmium, phthatlo, mint 
	"rgba(0, 0, 255, 0.7)", "rgba(0, 0, 100, 0.7)", "rgba(174, 200, 222, 0.7)", "rgba(0, 255, 255, 0.7)", "rgba(138, 206, 233, 0.7)", "rgba(2, 0, 130, 0.7)", "rgba(32, 144, 255, 0.7)", "rgba(20, 94, 190, 0.7)", // blue, darkblue, lightblue, cyan, sky, navy, dodger, denim
	"rgba(103, 44, 126, 0.7)", "rgba(122, 73, 136, 0.7)", "rgba(113, 1, 147, 0.7)", "rgba(96, 26, 53, 0.7)", "rgba(102, 48, 70, 0.7)", "rgba(164, 94, 229, 0.7)", "rgba(49, 20, 50, 0.7)", "rgba(76, 1, 33, 0.7)",  // purple, mauve, violet, plum, grape, amethyst, eggplant, mulberry
	"rgba(255, 192 ,203 ,0.7)", "rgba(122, 72 ,103 ,0.7)", "rgba(252, 115, 254, 0.7)", "rgba(217, 24, 131, 0.7)", "rgba(251, 68, 112, 0.7)", "rgba(255, 146, 165, 0.7)", "rgba(252, 15, 193, 0.7)", // pink, darkpink, flamingo, barbie, fiery, salmon, shocking, shocking
	"rgba(252, 107, 2, 0.7)", "rgba(236, 151, 6, 0.7)", "rgba(249, 129, 42, 0.7)", "rgba(188, 86, 2, 0.7)", "rgba(255, 229, 180, 0.7)", // orange, honey, tangerine, ginger, peach
	"rgba(126, 72, 28, 0.7)", "rgba(121, 92 ,52 ,0.7)", "rgba(54, 38, 15, 0.7)", "rgba(75, 55, 28, 0.7)", "rgba(58, 30, 8, 0.7)", "rgba(74, 55, 40, 0.7)", "rgba(82, 41 ,21, 0.75)", "rgba(98, 43, 12, 0.7)",  // brown, peanut, carob, coffee, tortilla, brunette, cedar, penny, cinnamon
	"rgba(255, 255, 0, 0.7)", "rgba(252, 222, 55, 0.7)", "rgba(253, 165, 15, 0.7)", "rgba(194, 146, 0, 0.7)",  "rgba(162, 136, 52, 0.7)" // yellow, lightyellow, fire, dijon, gold
];

let ac = 0;
let dc = colors.length;

function changeRandomly(){
	var rc = Math.floor(Math.random() * colors.length);
	if (rc === color) rc = Math.floor(Math.random() * colors.length);
	color = colors[rc];
	framesTxt.style.color = color;
	//colors.splice(rc, 1);
	// console.log("Picked color:", colors[c]);
	//console.log("Colors left:", colors.length);
}

function changeAscending(){
	color = colors[ac];
	ac++;
	if (ac === colors.length) ac = 0
	framesTxt.style.color = color;
}

function changeDescending() {
	color = colors[dc];
	dc--;
	if (dc === 0) dc = colors.length
	framesTxt.style.color = color;
}

randomizeB.onclick = () => { changeRandomly() }

ascensionB.onclick = () => { changeAscending() }

descensionB.onclick = () => { changeDescending() }

// Particle speed change functioning 

const decreaseB = document.getElementById("decrease");
const increaseB = document.getElementById("increase");

const speedTxt = document.getElementById("speed");

let speedMax = 2;
let speedMin = speedMax / 2;

let speed = 50;

function updateSpeed(speedMax, speedMin) {
	for (var particle in particles) {
		particles[particle].speedY = Math.random() * speedMax - speedMin;
		particles[particle].speedX = Math.random() * speedMax - speedMin;
	}
}

decreaseB.onclick = () => {
	if (speed !== 0) {
		speedMax -= 0.1;
		speedMin -= 0.1;
		speed -= 5;
		speedTxt.innerText = speed;
		updateSpeed(speedMax, speedMin);
	}
}

increaseB.onclick = () => {
	if (speed !== 100) {
		speedMax += 0.1;
		speedMin += 0.1;
		speed += 5;
		speedTxt.innerText = speed;
		updateSpeed(speedMax, speedMin);
	}
}

//canvas.height = Math.max(window.innerWidth, window.innerWidth);

canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";

//            Particles set up

const bounceSound = new Audio("Bounce sound.wav");

let particles = [];

function drawMainCircle() {
	ctx.fillStyle = "rgba(88, 88, 88, 222)";
	ctx.strokeStyle =  color; // "rgba(164, 94, 229, 0.7)";
	ctx.beginPath();
	var size = 12;
	ctx.arc(Input.mouse.x, Input.mouse.y, size, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke()
}

let frames = 0;

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = "rgba(0,0,0,0.1)";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (showCentipede && centipede) centipede.follow(Input.mouse.x, Input.mouse.y);
	particlation();
	drawMainCircle();
	frames++;
	requestAnimationFrame(animate);
}

const framesTxt = document.getElementById("FPS");

setInterval(() => {
	framesTxt.innerText = frames;
	frames = 0;
}, 1000);

let color = "rgba(75, 75, 75, 0.7)";

class Particle {
	constructor() {
		this.x = Input.mouse.x;
		// To make particle appear at random places in the canvas: Math.random() * canvas.width; To make make it appear at mouse postion: Input.mouse.x
		this.y = Input.mouse.y;
		// To make particle appear at random places in the canvas: Math.random() * canvas.height; To make make it appear at mouse postion: Input.mouse.y
		this.size = 7; // Randomize: Math.random() * 7 + 1;
		this.speedX = Math.random() * speedMax - speedMin;
		this.speedY = Math.random() * speedMax - speedMin;
		this.minSize = undefined;
		this.remove = false;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		// Make the particles bounce off of the canvas
		if (this.x - this.size <= 0 || this.x + this.size >= canvas.width) this.speedX *= -1; // For friction this.speedX *= 0.98;
		if (this.y - this.size <= 0 || this.y + this.size >= canvas.height) this.speedY *= -1; // For friction this.speedY *= 0.98;
		
		//Make particles shrink to whatever size you want
		this.minSize = 5;
		if (this.size > this.minSize) this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = color;
		ctx.beginPath();
		var size = Math.random() * 11 + 1;
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function particlation() {
	for (var index = 0; index < particles.length; index++) {
		let particle = particles[index];
		particle.update();
		particle.draw();
		
		// Add lines between particles based on specified distances
		for (var i = index; i < particles.length; i++) {
			let dx = particle.x - particles[i].x;
			let dy = particle.y - particles[i].y;
			let distance = Math.sqrt(dx * dx + dy * dy);
			if (distance <= 100) {
				let skipLine = false;

				if (showCentipede && centipede) {
					const segments = getAllSegments(centipede);

					// Midpoint of the line between the two particles
					const mx = (particle.x + particles[i].x) / 2;
					const my = (particle.y + particles[i].y) / 2;
					
					// Remove drawing lines between particles if they are between a segment of a creature
					for (let seg of segments) {
						const dx = mx - seg.x;
						const dy = my - seg.y;
						const distToSeg = Math.sqrt(dx * dx + dy * dy);
						if (distToSeg < 15) {
							skipLine = true;
							break;
						}
					}
				}

				if (!skipLine) {
					ctx.beginPath();
					
					if (distance <= 100) ctx.strokeStyle = "rgba(48, 48, 48, 0.2)";
					if (distance <= 80) ctx.strokeStyle = "rgba(48, 48, 48, 0.3)";
					if (distance <= 70) ctx.strokeStyle = "rgba(48, 48, 48, 0.4)";
					if (distance <= 60) ctx.strokeStyle = "rgba(48, 48, 48, 0.5)";
					if (distance <= 50) ctx.strokeStyle = "rgba(48, 48, 48, 0.6)";
					if (distance <= 40) ctx.strokeStyle = "rgba(48, 48, 48, 0.7)";
					ctx.lineWidth = particles[index].size / 2;
					ctx.moveTo(particle.x, particle.y);
					ctx.lineTo(particles[i].x, particles[i].y);
					ctx.stroke();
				}
			}
		}
		
		// Make particles disappear
		if (particle.remove === true) {
			particle.size -= 0.1;
			if (particle.size <= 0.5) {
				particles.splice(index, 1);
				//console.log("Particles present:", particles.length);
				index--;
			}
		}
		
		// Make particles bounce off of the centipede:
		
		let segments = showCentipede && centipede ? getAllSegments(centipede) : [];
		
		segments.forEach(seg => {
			particles.forEach(parti => {
				const dx = parti.x - seg.x;
				const dy = parti.y - seg.y;
				var distance = Math.sqrt(dx * dx + dy * dy);
				const minDist = 10; // Radius around each segment for bounce

				if (distance < minDist) {
					const angle = Math.atan2(dy, dx);
					const speed = Math.sqrt(parti.vx ** 2 + parti.vy ** 2);

					// Reflect particle velocity
					const normalX = dx / distance;
					const normalY = dy / distance;
					const dot = parti.vx * normalX + parti.vy * normalY;

					parti.vx -= 2 * dot * normalX;
					parti.vy -= 2 * dot * normalY;

					// Push particles out of the segment zone
					parti.x = seg.x + normalX * minDist;
					parti.y = seg.y + normalY * minDist;
				}
			});
		});
	}
}
 
// Make particles appear on initial page load

function init() {
	let amount = 52;
	for(var particle = 0; particle < amount; particle++) {
		particles.push(new Particle());
		particles[particle].x = Math.random() * canvas.width;
		particles[particle].y = Math.random() * canvas.height;
	}
}

init();

// Creates disappearing particles

function createDparticles() {
	let amount = particles.length + 4; // Set the amount of particles
	for (var particle = particles.length; particle < amount; particle++) {
		particles.push(new Particle());
		particles[particle].remove = true;
	} 
}

// Just creates more particles

function createParticles() {
	let amount = particles.length + 4; // Set the amount of particles
	for (var particle = particles.length; particle < amount; particle++) {
		particles.push(new Particle());
	} 
}

// Segmentation

let segmentCount = 0;

class Segment {
	constructor(parent, size, angle, range, stiffness) {
		segmentCount++;
		this.isSegment = true;
		this.parent = parent; //Segment which this one is connected to
		if (typeof parent.children == "object") {
			parent.children.push(this);
		}
		this.children = []; //Segments connected to this segment
		this.size = size; //Distance from parent
		this.relAngle = angle; //Angle relative to parent
		this.defAngle = angle; //Default angle relative to parent
		this.absAngle = parent.absAngle + angle; //Angle relative to x-axis
		this.range = range; //Difference between maximum and minimum angles
		this.stiffness = stiffness; //How closely it conforms to default angle
		this.updateRelative(false, true);
	}
	updateRelative(iter, flex) {
		this.relAngle = this.relAngle - 2 * Math.PI * Math.floor((this.relAngle - this.defAngle) / 2 / Math.PI + 1 / 2);
		if (flex) {
			this.relAngle = Math.min(this.defAngle + this.range / 2,Math.max(this.defAngle - this.range / 2, (this.relAngle - this.defAngle) / this.stiffness + this.defAngle));
		}
		this.absAngle = this.parent.absAngle + this.relAngle;
		this.x = this.parent.x + Math.cos(this.absAngle) * this.size; //Position
		this.y = this.parent.y + Math.sin(this.absAngle) * this.size; //Position
		if (iter) {
		    for (var i = 0; i < this.children.length; i++) {
				this.children[i].updateRelative(iter, flex);
		    }
		}
	}
	draw(iter) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(this.parent.x, this.parent.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
			if (iter) {
				for (var i = 0; i < this.children.length; i++) {
					this.children[i].draw(true);
				}
			}
	}
	follow(iter) {
		var x = this.parent.x;
		var y = this.parent.y;
		var dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
		this.x = x + this.size * (this.x - x) / dist;
		this.y = y + this.size * (this.y - y) / dist;
		this.absAngle = Math.atan2(this.y - y, this.x - x);
		this.relAngle = this.absAngle - this.parent.absAngle;
		this.updateRelative(false, true);
		//this.draw();
		if (iter) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].follow(true);
			}
		}
	}
}
class LimbSystem {
	constructor(end, length, speed, creature) {
		this.end = end;
		this.length = Math.max(1, length);
		this.creature = creature;
		this.speed = speed;
		creature.systems.push(this);
		this.nodes = [];
		var node = end;
		for (var i = 0; i < length; i++) {
			this.nodes.unshift(node);
			//node.stiffness=1;
			node = node.parent;
			if (!node.isSegment) {
				this.length = i + 1;
				break;
			}
		}
		this.hip = this.nodes[0].parent;
	}
	moveTo(x, y) {
		this.nodes[0].updateRelative(true, true);
		var dist = ((x - this.end.x) ** 2 + (y - this.end.y) ** 2) ** 0.5;
		var len = Math.max(0, dist - this.speed);
		for (var i = this.nodes.length - 1; i >= 0; i--) {
			var node = this.nodes[i];
			var ang = Math.atan2(node.y - y, node.x - x);
			node.x = x + len * Math.cos(ang);
			node.y = y + len * Math.sin(ang);
			x = node.x;
			y = node.y;
			len = node.size;
		}
		for (var i = 0; i < this.nodes.length; i++) {
			var node = this.nodes[i];
			node.absAngle = Math.atan2(
			node.y - node.parent.y,
			node.x - node.parent.x
			);
			node.relAngle = node.absAngle - node.parent.absAngle;
			for (var ii = 0; ii < node.children.length; ii++) {
				var childNode = node.children[ii];
				if (!this.nodes.includes(childNode)) {
					childNode.updateRelative(true, false);
				}
			}
		}
		//this.nodes[0].updateRelative(true,false)
	}
	update() {
		this.moveTo(Input.mouse.x, Input.mouse.y);
	}
}

class LegSystem extends LimbSystem {
	constructor(end, length, speed, creature) {
		super(end, length, speed, creature);
		this.goalX = end.x;
		this.goalY = end.y;
		this.step = 0; //0 stand still, 1 move forward,2 move towards foothold
		this.forwardness = 0;

		//For foot goal placement
		this.reach = 0.9 * ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) ** 0.5;
		var relAngle = this.creature.absAngle - Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x);
		relAngle -= 2 * Math.PI * Math.floor(relAngle / 2 / Math.PI + 1 / 2);
		this.swing = -relAngle + (2 * (relAngle < 0) - 1) * Math.PI / 2;
		this.swingOffset = this.creature.absAngle - this.hip.absAngle;
		//this.swing*=(2*(relAngle>0)-1);
	}
	update(x, y) {
		this.moveTo(this.goalX, this.goalY);
		//this.nodes[0].follow(true,true)
		if (this.step == 0) {
			var dist = ((this.end.x - this.goalX) ** 2 + (this.end.y - this.goalY) ** 2) ** 0.5;
			if (dist > 1) {
				this.step = 1;
				//this.goalX=x;
				//this.goalY=y;
				this.goalX = this.hip.x + this.reach * Math.cos(this.swing + this.hip.absAngle + this.swingOffset) + (2 * Math.random() - 1) * this.reach / 2;
				this.goalY = this.hip.y + this.reach *
				Math.sin(this.swing + this.hip.absAngle + this.swingOffset) + (2 * Math.random() - 1) * this.reach / 2;
			}
		} else if (this.step == 1) {
			var theta = Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x) - this.hip.absAngle;
			var dist = ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) ** 0.5;
			var forwardness2 = dist * Math.cos(theta);
			var dF = this.forwardness - forwardness2;
			this.forwardness = forwardness2;
			if (dF * dF < 1) {
				this.step = 0;
				this.goalX = this.hip.x + (this.end.x - this.hip.x);
				this.goalY = this.hip.y + (this.end.y - this.hip.y);
			}
		}
		//	ctx.strokeStyle='blue';
		//	ctx.beginPath();
		//	ctx.moveTo(this.end.x,this.end.y);
		//	ctx.lineTo(this.hip.x+this.reach*Math.cos(this.swing+this.hip.absAngle+this.swingOffset),
		//				this.hip.y+this.reach*Math.sin(this.swing+this.hip.absAngle+this.swingOffset));
		//	ctx.stroke();
		//	ctx.strokeStyle='black';
	}
}

class Creature {
	constructor( x, y, angle, fAccel, fFric, fRes, fThresh, rAccel, rFric, rRes, rThresh) {
		this.x = x; //Starting position
		this.y = y;
		this.absAngle = angle; //Staring angle
		this.fSpeed = 0; //Forward speed
		this.fAccel = fAccel; //Force when moving forward
		this.fFric = fFric; //Friction against forward motion
		this.fRes = fRes; //Resistance to motion
		this.fThresh = fThresh; //minimum distance to target to keep moving forward
		this.rSpeed = 0; //Rotational speed
		this.rAccel = rAccel; //Force when rotating
		this.rFric = rFric; //Friction against rotation
		this.rRes = rRes; //Resistance to rotation
		this.rThresh = rThresh; //Maximum angle difference before rotation
		this.children = [];
		this.systems = [];
	}
	follow(x, y) {
		var dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
		var angle = Math.atan2(y - this.y, x - this.x);
		//Update forward
		var accel = this.fAccel;
		if (this.systems.length > 0) {
			var sum = 0;
			for (var i = 0; i < this.systems.length; i++) {
				sum += this.systems[i].step == 0;
			}
			accel *= sum / this.systems.length;
		}
		this.fSpeed += accel * (dist > this.fThresh);
		this.fSpeed *= 1 - this.fRes;
		this.speed = Math.max(0, this.fSpeed - this.fFric);
		//Update rotation
		var dif = this.absAngle - angle;
		dif -= 2 * Math.PI * Math.floor(dif / (2 * Math.PI) + 1 / 2);
		if (Math.abs(dif) > this.rThresh && dist > this.fThresh) {
			this.rSpeed -= this.rAccel * (2 * (dif > 0) - 1);
		}
		this.rSpeed *= 1 - this.rRes;
		if (Math.abs(this.rSpeed) > this.rFric) {
			this.rSpeed -= this.rFric * (2 * (this.rSpeed > 0) - 1);
		} else {
			this.rSpeed = 0;
		}

		//Update position
		this.absAngle += this.rSpeed;
		this.absAngle -= 2 * Math.PI * Math.floor(this.absAngle / (2 * Math.PI) + 1 / 2);
		this.x += this.speed * Math.cos(this.absAngle);
		this.y += this.speed * Math.sin(this.absAngle);
		this.absAngle += Math.PI;
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].follow(true, true);
		}
		for (var i = 0; i < this.systems.length; i++) {
			this.systems[i].update(x, y);
		}
		this.absAngle -= Math.PI;
		this.draw(true);
	}
	draw(iter) {
		var r = 4;
		ctx.beginPath();
		ctx.arc(this.x, this.y, r, Math.PI / 4 + this.absAngle, 7 * Math.PI / 4 + this.absAngle);
		ctx.moveTo( this.x + r * Math.cos(7 * Math.PI / 4 + this.absAngle), this.y + r * Math.sin(7 * Math.PI / 4 + this.absAngle));
		ctx.lineTo( this.x + r * Math.cos(this.absAngle) * 2 ** 0.5, this.y + r * Math.sin(this.absAngle) * 2 ** 0.5);
		ctx.lineTo( this.x + r * Math.cos(Math.PI / 4 + this.absAngle), this.y + r * Math.sin(Math.PI / 4 + this.absAngle));
		ctx.stroke();
		if (iter) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].draw(true);
			}
		}
	}
}

// Centipede setup according to screen sizes

let size;
let legs;
let tail;
if (windowWidth >= 1920) {
	size = 2;
	legs = 8;
	tail = 28;
} else if (windowWidth >= 1550) {
	size = 1.7;
	legs = 8;
	tail = 24;
} else if (windowWidth >= 1200) {
	size = 1.5;
	legs = 6;
	tail = 20;
} else if (windowWidth >= 820) {
	size = 1.3;
	legs = 4;
	tail = 16;
} else if (windowWidth >= 700) {
	size = 1;
	legs = 4;
	tail = 12;
} else {
	init();
}

function getAllSegments(segment) {
	const segments = [];
	
	function recurse(seg) {
		if (!seg) return;
		segments.push(seg);
		if (Array.isArray(seg.children)) {
			seg.children.forEach(child => recurse(child));
		}
	}

	recurse(segment);
	return segments;
}

function setCentipede() {
    var centipede = new Creature(
		window.innerWidth / 2,
		window.innerHeight / 2,
		0,
		size * 10,
		size * 2,
		0.5,
		16,
		0.5,
		0.085,
		0.5,
		0.3
	);
	var spinal = centipede;
	//(parent,size,angle,range,stiffness)
	//Neck
	for (var i = 0; i < 6; i++) {
		spinal = new Segment(spinal, size * 4, 0, 3.1415 * 2 / 3, 1.1);
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, size * 3, ii, 0.1, 2);
			for (var iii = 0; iii < 3; iii++) {
				node = new Segment(node, size * 0.1, -ii * 0.1, 0.1, 2);
		    }
		}
    }
	//Torso and legs
	for (var i = 0; i < legs; i++) {
		if (i > 0) {
			//Vertebrae and ribs
			for (var ii = 0; ii < 6; ii++) {
				spinal = new Segment(spinal, size * 4, 0, 1.571, 1.5);
				for (var iii = -1; iii <= 1; iii += 2) {
					var node = new Segment(spinal, size * 3, iii * 1.571, 0.1, 1.5);
					for (var iv = 0; iv < 3; iv++) {
						node = new Segment(node, size * 3, -iii * 0.3, 0.1, 2);
					}
				}
			}
		}
		//Legs and shoulders
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, size * 12, ii * 0.785, 0, 8); //Hip
			node = new Segment(node, size * 16, -ii * 0.785, 6.28, 1); //Humerus
			node = new Segment(node, size * 16, ii * 1.571, 3.1415, 2); //Forearm
			// Fingers
			for ( var iii = 0; iii < 4; iii++) {
				new Segment(node, 3 * 4, (iii / 3 - 0.5) * 1.571, 0.1, 4);
			}
			new LegSystem(node, 3, 3* 12, centipede, 4);
		}
    }
	//Tail
	for (var i = 0; i < tail; i++) {
		spinal = new Segment(spinal, size * 4, 0, 3.1415 * 2 / 3, 1.1);
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, size * 3, ii, 0.1, 2);
			for (var iii = 0; iii < 3; iii++) {
				node = new Segment(node, size * 3 * (tail - i) / tail, -ii * 0.1, 0.1, 2);
			}
		}
	}

	return centipede;
}

let centipede;

if (showCentipede) {
  centipede = setCentipede();
}

function setSpider() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
	var critter = new Creature(
		window.innerWidth / 2,
		window.innerHeight / 2,
		0,
		size * 10,
		size * 3,
		0.5,
		16,
		0.5,
		0.085,
		0.5,
		0.3
	);
	var legNum = 8;
	var jointNum = 32;
	for (var i = 0; i < legNum; i++) {
		var node = critter;
		var ang = Math.PI / 2 * (i / (legNum - 1) - 0.5);
		for (var ii = 0; ii < jointNum; ii++) {
			var node = new Segment( node, size * 64 / jointNum, ang * (ii == 0), 3.1416,1.2);
		}
		//(end,length,speed,creature,dist)
		var leg = new LegSystem(node, jointNum, size * 30, critter);
	}
	
	return critter;
}

let critter;
if (showCritter) {
	critter = setSpider();
}

animate();

/*

function setupSimple() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  var critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    12,
    1,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var node = critter;
  //(parent,size,angle,range,stiffness)
  for (var i = 0; i < 128; i++) {
    var node = new Segment(node, 8, 0, 3.14159 / 2, 1);
  }
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(Input.mouse.x, Input.mouse.y);
  }, 33);
}

function setupTentacle() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  var critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    12,
    1,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var node = critter;
  //(parent,size,angle,range,stiffness)
  for (var i = 0; i < 32; i++) {
    var node = new Segment(node, 8, 0, 2, 1);
  }
  //(end,length,speed,creature)
  var tentacle = new LimbSystem(node, 32, 8, critter);
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
    ctx.fill();
  }, 33);
}
function setupArm() {
	//(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
	var critter = new Creature(
		window.innerWidth / 2,
		window.innerHeight / 2,
		0,
		12,
		1,
		0.5,
		16,
		0.5,
		0.085,
		0.5,
		0.3
	);
	var node = critter;
	//(parent,size,angle,range,stiffness)
	for (var i = 0; i < 3; i++) {
		var node = new Segment(node, 80, 0, 3.1416, 1);
	}
	var tentacle = new LimbSystem(node, 3, critter);
	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		critter.follow(canvas.width / 2, canvas.height / 2);
	}, 33);
	ctx.beginPath();
	ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
	ctx.fill();
}

function setupSpider(size, legs) {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
	var critter = new Creature(
		window.innerWidth / 2,
		window.innerHeight / 2,
		0,
		size * 10,
		size * 3,
		0.5,
		16,
		0.5,
		0.085,
		0.5,
		0.3
	);
	var legNum = legs;
	var jointNum = 32;
	for (var i = 0; i < legNum; i++) {
		var node = critter;
		var ang = Math.PI / 2 * (i / (legNum - 1) - 0.5);
		for (var ii = 0; ii < jointNum; ii++) {
			var node = new Segment( node, size * 64 / jointNum, ang * (ii == 0), 3.1416,1.2);
		}
		//(end,length,speed,creature,dist)
		var leg = new LegSystem(node, jointNum, size * 30, critter);
	}
	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		critter.follow(Input.mouse.x, Input.mouse.y);
	}, 33);
}

function setupCentipede(size, legs, tail) {
	var s = size;
	//(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
	critter = new Creature(
		window.innerWidth / 2,
		window.innerHeight / 2,
		0,
		s * 10,
		s * 2,
		0.5,
		16,
		0.5,
		0.085,
		0.5,
		0.3
	);
	var spinal = critter;
	//(parent,size,angle,range,stiffness)
	//Neck
	for (var i = 0; i < 6; i++) {
		spinal = new Segment(spinal, s * 4, 0, 3.1415 * 2 / 3, 1.1);
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, s * 3, ii, 0.1, 2);
			for (var iii = 0; iii < 3; iii++) {
				node = new Segment(node, s * 0.1, -ii * 0.1, 0.1, 2);
		    }
		}
    }
	//Torso and legs
	for (var i = 0; i < legs; i++) {
		if (i > 0) {
			//Vertebrae and ribs
			for (var ii = 0; ii < 6; ii++) {
				spinal = new Segment(spinal, s * 4, 0, 1.571, 1.5);
				for (var iii = -1; iii <= 1; iii += 2) {
					var node = new Segment(spinal, s * 3, iii * 1.571, 0.1, 1.5);
					for (var iv = 0; iv < 3; iv++) {
						node = new Segment(node, s * 3, -iii * 0.3, 0.1, 2);
					}
				}
			}
		}
		//Legs and shoulders
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, s * 12, ii * 0.785, 0, 8); //Hip
			node = new Segment(node, s * 16, -ii * 0.785, 6.28, 1); //Humerus
			node = new Segment(node, s * 16, ii * 1.571, 3.1415, 2); //Forearm
			// Fingers
			for ( var iii = 0; iii < 4; iii++) {
				new Segment(node, s * 4, (iii / 3 - 0.5) * 1.571, 0.1, 4);
			}
			new LegSystem(node, 3, s * 12, critter, 4);
		}
    }
	//Tail
	for (var i = 0; i < tail; i++) {
		spinal = new Segment(spinal, s * 4, 0, 3.1415 * 2 / 3, 1.1);
		for (var ii = -1; ii <= 1; ii += 2) {
			var node = new Segment(spinal, s * 3, ii, 0.1, 2);
			for (var iii = 0; iii < 3; iii++) {
				node = new Segment(node, s * 3 * (tail - i) / tail, -ii * 0.1, 0.1, 2);
			}
		}
	}
	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		critter.follow(Input.mouse.x, Input.mouse.y);
	}, 33 );
}

*/
