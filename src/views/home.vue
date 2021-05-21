<template>
  <div class="myCan relative">
    <canvas id="can1" @click="interactWithCanvas($event)" @pointermove="interactWithCanvas($event)"></canvas>
  </div>
</template>
<script>
let hsl = 0;
class Partical {
  constructor(canvas, ctx, mouse) {
    this.x = mouse ? mouse.x : Math.random() * canvas.width;
    this.y = mouse ? mouse.y : Math.random() * canvas.height;
    this.size = Math.random() * 8 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.ctx = ctx;
    this.color = `hsl(${hsl}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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
      this.R.range(1, 10).forEach(() => {
        this.parArr.push(new Partical(this.canvas, this.ctx, this.mouse));
      });
    },

    init() {
      for (let i = 0; i < 20; ++i) {
        this.parArr.push(new Partical(this.canvas, this.ctx));
      }
    },
    displayPartical() {
      const arr = [...this.parArr];
      arr.forEach((s, i) => {
        s.update();
        s.draw();
        s.size <= 0.3 ? this.parArr.splice(i, 1) : "";
      });
    },
    animate() {
      hsl++;
      this.ctx.fillStyle = "rgba(0,0,0,0.02)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
    //  this.init();
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
