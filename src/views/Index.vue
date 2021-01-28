<template>
  <h1>Vue@Next</h1>

  <h2>ref相关</h2>
  <p>setUp-{{num}}</p>
  <div>
    <p>count-{{count}}</p>
    <button @click="updateCount">count++</button>
  </div>

  <h2>reactive相关</h2>
  <p>名字：{{user.name}}</p>
  <p>年龄：{{user.age}}</p>
  <p>朋友：{{user.friend}}</p>
  <div>
    <button @click="updateUser">更新数据</button>
  </div>

  <h2>Index是父组件</h2>
  <p>Msg: {{msg}}</p>
  <div>
    <button @click="msg+='?!_!'">更新数据</button>
  </div>
  <child :msg="msg"></child>
</template>

<script lang="ts">
  import {defineComponent, ref, reactive} from 'vue';
  import Child from '../components/Child.vue';

  export default defineComponent({
    name: 'Index',
    components: {
      Child
    },
    //setUp函数是组合式api的入口函数
    setup() {
      const num = 10;
      //ref函数，定义一个响应式数据，返回reference对象，对象中包含value属性，通过操作value属性，实现双向绑定
      //ref一般用来定义基本数据类型的响应式数据
      let count = ref(0);

      function updateCount() {
        console.log(count);
        count.value++
      }

      //reactive函数，一般用于定义引用类型的响应式数据
      const user = reactive({
        name: '小明',
        age: 20,
        friend: {
          name: '小王',
          age: 18,
          cars: ['奔驰', '宝马', '奥迪']
        }
      });

      function updateUser() {
        user.name = '小张';
        user.age+=3;
        user.friend.name = '小李';
        user.friend.cars[0] = '玛莎拉蒂';
        user.friend.cars.push('法拉利');
      }

      const msg = ref('What are you doing now ?');

      return {
        num,
        count,
        updateCount,
        user,
        updateUser,
        msg
      }
    }
  })
</script>
