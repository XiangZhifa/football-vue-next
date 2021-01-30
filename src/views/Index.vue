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
  <child :msg="msg" msg2="真香"></child>

  <h2>计算属性和监视</h2>
  <div style="border: 1px solid #ccc;margin-bottom: 20px;padding: 16px;">
    <div>姓名操作</div>
    <div style="margin-top: 16px">
      姓氏：<input v-model="nameInfo.firstName" type="text" placeholder="请输入姓氏"/>
    </div>
    <div style="margin-top: 16px">
      名字：<input v-model="nameInfo.lastName" type="text" placeholder="请输入名字"/>
    </div>
  </div>
  <div style="border: 1px solid #ccc;margin-bottom: 20px;padding: 16px;">
    <div>计算属性和监视的演示</div>
    <div style="margin-top: 16px">
      姓名：<input v-model="fullName1" type="text" placeholder="显示姓名"/>
    </div>
    <div style="margin-top: 16px">
      姓名：<input v-model="fullName2" type="text" placeholder="显示姓名"/>
    </div>
    <div style="margin-top: 16px">
      姓名：<input v-model="fullName3" type="text" placeholder="显示姓名"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, reactive, computed, watch, watchEffect} from 'vue';
  import Child from '../components/Child.vue';

  export default defineComponent({
    name: 'Index',
    components: {
      Child
    },
    //setUp函数是组合式api的入口函数
    //!!!尽量不要混合使用setUp和data，setUp和methods
    //!!!在setUp方法中，无法访问data和methods中的属性
    setup(props, context) {
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
        user.age += 3;
        user.friend.name = '小李';
        user.friend.cars[0] = '玛莎拉蒂';
        user.friend.cars.push('法拉利');
      }

      const msg = ref('What are you doing now ?');

      const nameInfo = reactive({
        firstName: '张',
        lastName: '三'
      });
      //计算属性
      //计算属性如果只传入一个函数，表示的是get(只读)
      //返回类型是一个ref对象
      const fullName1 = computed(() => {
        return nameInfo.firstName + '_' + nameInfo.lastName
      });
      console.log(fullName1);

      //传入对象包含，get和set方法
      const fullName2 = computed({
        get: () => {
          return nameInfo.firstName + '_' + nameInfo.lastName
        },
        set: (val) => {
          const nameArr = val.split('_');
          nameInfo.firstName = nameArr[0];
          nameInfo.lastName = nameArr[1];
        }
      });

      let fullName3 = ref('');
      //watch监视
      watch(nameInfo, ({firstName, lastName}) => {
        fullName3.value = firstName + '_' + lastName
      }, {immediate: true,deep: true});

      //watchEffect
      watchEffect(()=>{
        const nameArr = fullName3.value.split('_');
        nameInfo.firstName = nameArr[0];
        nameInfo.lastName = nameArr[1];
      });

      return {
        num,
        count,
        updateCount,
        user,
        updateUser,
        msg,
        nameInfo,
        fullName1,
        fullName2,
        fullName3
      }
    },
    //!!!如果属性或方法有重名，setUp中的属性、方法优先
    data() {
      return {
        count: 10086
      }
    },
    mounted() {
      console.log(this);
      console.log(this.count);
    }
  })
</script>
