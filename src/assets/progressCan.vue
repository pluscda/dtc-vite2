<template>
  <section>
    <header class="flex justify-around mb-4">
      <div class="canvas-wrap">
        <canvas id="canvas1" width="300" height="300"></canvas>
        <span id="procent1"></span>
      </div>
      <div class="canvas-wrap">
        <canvas id="canvas2" width="300" height="300"></canvas>
        <span id="procent2"></span>
      </div>
      <div class="canvas-wrap">
        <canvas id="canvas3" width="300" height="300"></canvas>
        <span id="procent3"></span>
      </div>
    </header>

    <h4>Details about the Item</h4>
    <p v-show="!fullText" @click="fullText = true">A limited....</p>
    <p v-show="fullText" @click="fullText = false">A limited ehst idfkjfgj klfjglklfdgklj gdklfdg fgdfgkjdfklglkfdjglkdfjgdfg</p>

    <button>Call for Action</button>
  </section>
</template>

<script>
const radian = Math.PI / 180;
export default {
  data() {
    return {
      fullText: false,
    };
  },
  methods: {},

  mounted() {
    var can = document.getElementById('canvas1'),
      spanProcent = document.getElementById('procent1'),
      c = can.getContext('2d');

    var posX = can.width / 2,
      posY = can.height / 2,
      fps = 1000 / 200,
      procent = 0,
      oneProcent = 360 / 100,
      curNum = ((4.7 / 5) * 100).toFixed(),
      result = oneProcent * curNum;

    c.lineCap = 'round';
    arcMove();

    function arcMove() {
      var deegres = 0;
      var acrInterval = setInterval(function () {
        deegres += 1;
        c.clearRect(0, 0, can.width, can.height);
        procent = deegres / oneProcent;

        spanProcent.innerHTML = procent.toFixed();

        c.beginPath();
        c.arc(posX, posY, 70, radian * 270, radian * (270 + 360));
        c.strokeStyle = '#b1b1b1';
        c.lineWidth = '10';
        c.stroke();

        c.beginPath();
        c.strokeStyle = '#3949AB';
        c.lineWidth = '10';
        c.arc(posX, posY, 70, radian * 270, radian * (270 + deegres));
        c.stroke();
        if (deegres >= result) clearInterval(acrInterval);
      }, fps);
    }
  },
};
</script>

<style lang="scss">
.canvas-wrap {
  position: relative;
  width: 300px;
  height: 300px;
  span {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 50px;
    transform: translate(-50%, -50%);
    color: #3949ab;
  }

  span::after {
    content: '%';
  }
}
</style>
