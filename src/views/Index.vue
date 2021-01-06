<template>
  <div class="about">
    <p>Vue@Next</p>
    <p>setUp-{{num}}</p>
    <div>
      <p>count-{{count}}</p>
      <button @click="updateCount">count++</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';

  export default defineComponent({
    name: 'Index',
    setup() {
      const num = 10;
      //ref函数，定义一个响应式数据，返回reference对象，对象中包含value属性，通过操作value属性，实现双向绑定
      //ref一般用来定义基本数据类型的响应式数据
      let count = ref(0);

      function updateCount() {
        console.log(count);
        count.value++
      }
      return {
        num,
        count,
        updateCount
      }
    }
  })
</script>
