<template>
  <div class="grid place-items-center">
    <h1 class="mt-12 text-2xl" @click="sub.next(111)">HOME under construction {{ test }}</h1>
  </div>
</template>

<script setup>
import { Subject, pipe } from 'rxjs';
import { mapTo, throttleTime, tap, switchMap } from 'rxjs/operators';
const test = 'test';
const sub = new Subject();

const t = pipe(
  tap(console.log),
  throttleTime(4000),
  tap(() => console.log('click'))
);
const getData = async () => {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then((s) => s.json());
};
sub.pipe(t, switchMap(getData)).subscribe(console.log);
</script>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="scss" scoped></style>
