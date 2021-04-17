
const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = document.documentElement.clientWidth,
    h = canvas.height = document.documentElement.clientHeight,
    stars = [],
    maxStars = 300;

// Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
const canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
canvas2.width = 100;
canvas2.height = 100;
const half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
gradient2.addColorStop(0.025, 'rgba(119, 23, 23, 1)');
gradient2.addColorStop(0.1, 'rgba(172, 36, 36, 1)');
gradient2.addColorStop(0.25, 'rgba(216, 50, 50, 1)');
gradient2.addColorStop(1, 'white');

ctx2.fillStyle = gradient2;
ctx2.beginPath();
ctx2.arc(half, half, half, 0, Math.PI * 2);
ctx2.fill();

// End cache

const random = (min = 0, max = 0) => Math.floor(Math.random() * (max - min + 1)) + min;


const maxOrbit = (x, y) => {
    let max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max ** 2 + max ** 2));
    return diameter / 2;
}

const Star = function () {

    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 5; // 12
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 700000; // 50000
    stars.push(this);
}

Star.prototype.draw = function () {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed -= this.speed;
}


const animation = () => {
    ctx.fillStyle = 'rgba(65, 13, 13, 0.863)';
    ctx.fillRect(0, 0, w, h);
    stars.forEach(star => star.draw());

    window.requestAnimationFrame(animation);
}

for (let i = 0; i < maxStars; i++) {
    new Star();
}

animation();