// ----- Fireworks -----
const fireworksCanvas = document.getElementById("fireworks");
const fwCtx = fireworksCanvas.getContext("2d");
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: x,
        y: y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        radius: 2,
        life: 100,
      });
    }
  }
  draw() {
    this.particles.forEach(p => {
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      fwCtx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
      fwCtx.fill();
    });
  }
  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;
    });
  }
}

let fireworks = [];
function animateFireworks() {
  fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  if (Math.random() < 0.05) {
    fireworks.push(new Firework(
      Math.random() * fireworksCanvas.width,
      Math.random() * fireworksCanvas.height / 2,
      ["#ff0", "#f0f", "#0ff", "#ff5733", "#fff"]
    ));
  }
  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles[0].life <= 0) fireworks.splice(i, 1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// ----- Confetti -----
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    size: Math.random() * 7 + 3,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  });
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.size, c.size);
    c.y += c.speed;
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();
