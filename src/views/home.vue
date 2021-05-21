<template>
  <div class="myCan relative">
    <canvas id="can1" @click="interactWithCanvas($event)" @pointermove="interactWithCanvas($event)"></canvas>
  </div>
</template>
<script>
class Partical {
  constructor(canvas, ctx) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.ctx = ctx;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default {
  data() {
    return {
      canvas: "",
      ctx: "",
      mouse: {},
      parArr: [],
    };
  },
  methods: {
    drawRect() {
      if (!this.ctx) return;
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(10, 10, 100, 20);
    },
    interactWithCanvas(e) {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    },

    init() {
      for (let i = 0; i < 100; ++i) {
        this.parArr.push(new Partical(this.canvas, this.ctx));
      }
    },
    displayPartical() {
      this.parArr.forEach((s) => {
        s.update();
        s.draw();
      });
    },
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.displayPartical();
      requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.canvas = document.querySelector("#can1");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "white";
    this.init();
    this.animate();
    //window.addEventListener("resize", this.drawRect);
  },
};
</script>

<style lang="scss" scoped>
.myCan {
  width: 100vw;
  height: calc(100vh);
  background: var(--dark);
  color: var(--light);
  > canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
