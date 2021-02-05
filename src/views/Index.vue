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

  <h2>hooks获取鼠标点击位置</h2>
  <div>X: {{mouseX}}</div>
  <div>Y: {{mouseY}}</div>

  <h2>hooks发送请求</h2>
  <div v-if="loading">正在加载中……</div>
  <div v-else>{{data || errorMsg}}</div>

  <h2>toRefs使用</h2>
  <div>{{name}}</div>
  <div>{{age}}</div>

  <h2>shallowReactive 和 shallowRef</h2>
  <p>reactive: {{s1}}</p>
  <p>shallowReactive: {{s2}}</p>
  <p>ref: {{s3}}</p>
  <p>shallowRef: {{s4}}</p>
  <button @click="updateData">更新数据</button>

  <h2>readonly 和 shallowReadonly</h2>
  <p>state: {{stateData}}</p>
  <button @click="updateStateData">更新数据</button>

  <h2>toRaw 和 markRaw</h2>
  <p>rawData: {{rawData}}</p>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw" style="margin-left:20px">测试markRaw</button>

  <h2>toRef的使用</h2>
  <p>state: {{toRefData}}</p>
  <p>age: {{age}}</p>
  <p>money: {{money}}</p>
  <button @click="updateToRefData">更新数据</button>

  <h2>customRef的使用</h2>
  <input v-model="keyWord" type="text"/>
  <p>
    keyWord: {{keyWord}}
  </p>

  <h2>响应式数据的判断</h2>
  <p>isRef: 判断数据是否是ref对象</p>
  <p>isReactive: 判断数据是否是reactive的响应式代理</p>
  <p>isReadonly: 判断数据是否是readonly创建的只读代理</p>
  <p>isProxy: 判断数据是否是 reactive 或 readonly 方法创建的代理</p>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    toRef,
    reactive,
    shallowRef,
    shallowReactive,
    readonly,
    shallowReadonly,
    toRefs,
    customRef,
    computed,
    watch,
    watchEffect,
    toRaw,
    markRaw,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
  } from 'vue';
  import getMousePosition from '../hooks/getMousePosition';
  import sendRequest from '../hooks/sendRequest';
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
      }, {immediate: true, deep: true});

      //watchEffect
      watchEffect(() => {
        const nameArr = fullName3.value.split('_');
        nameInfo.firstName = nameArr[0];
        nameInfo.lastName = nameArr[1];
      });

      //Vue3中的生命周期
      onBeforeMount(() => {
        console.log('Vue 3.x中的onBeforeMount')
      });
      onMounted(() => {
        console.log('Vue 3.x中的onMounted')
      });
      onBeforeUpdate(() => {
        console.log('Vue 3.x中的onBeforeUpdate')
      });
      onUpdated(() => {
        console.log('Vue 3.x中的onUpdated')
      });
      onBeforeUnmount(() => {
        console.log('Vue 3.x中的onBeforeUnmount')
      });
      onUnmounted(() => {
        console.log('Vue 3.x中的onUnmounted')
      });

      //引入封装好的hooks
      const {mouseX, mouseY} = getMousePosition();

      const {loading, data, errorMsg} = sendRequest('地址1');

      //toRefs将每个非响应式数据，转化为响应式数据
      const wuXia = reactive({
        name: '自来也',
        age: 20
      });
      const wuXiaRef = toRefs(wuXia);
      setTimeout(() => {
        wuXia.name += '!!!'
      }, 5000);

      //shallowRef和shallowReactive
      const s1 = reactive({
        name: '张三',
        age: 20,
        car: {
          name: '奔驰',
          color: 'Blue '
        }
      });

      const s2 = shallowReactive({
        name: '张三',
        age: 20,
        car: {
          name: '奔驰',
          color: 'Blue '
        }
      });

      const s3 = ref({
        name: '张三',
        age: 20,
        car: {
          name: '奔驰',
          color: 'Blue '
        }
      });

      const s4 = shallowRef({
        name: '张三',
        age: 20,
        car: {
          name: '奔驰',
          color: 'Blue '
        }
      });

      function updateData() {
        //reactive 深度劫持
        s1.name += '=';
        s1.car.name += '!';
        //shallowReactive 浅劫持
        s2.name += '==';
        s2.car.name += '!!';
        //ref
        s3.value.name += '===';
        s3.value.car.name += '!!!';
        //shallowRef
        s4.value.name += '====';
        s4.value.car.name += '!!!!';
      }

      //readonly 和 shallowReadonly
      const stateData = reactive({
        name: '李四',
        age: 20,
        car: {
          name: '奔驰',
          color: 'Black'
        }
      });

      const stateData2 = readonly(stateData);
      const stateData3 = shallowReadonly(stateData);

      function updateStateData() {
        // readonly 深度只读，无法修改数据（深层次数据也无法修改）
        // stateData2.name+='==='
        // stateData2.car.name+='==='

        // shallowReadonly 浅只读，对深层次数据不做只读监控
        // stateData2.name+='===';
        // stateData2.car.name+='===';
      }

      const rawData = reactive<any>({
        name: '小明',
        age: 20
      });

      function testToRaw() {
        //把代理对象变成普通对象，数据变化，界面不变化
        const user = toRaw(rawData);
        user.name += '==';
      }

      function testMarkRaw() {
        //markRaw标记的对象，从此以后都不能再成为代理对象
        const likes = ['吃', '喝'];
        rawData.likes = markRaw(likes);
        setInterval(() => {
          console.log('定时器执行了');
          rawData.likes += '==';
        })
      }

      //toRef拷贝一份数据，操作时，源数据也会随之变化；ref相当于生成新数据，操作时源数据不会发生变化
      const toRefData = reactive({
        age: 5,
        money: 100
      });

      //把响应式数据 toRefData 中的 age 属性，变成ref对象
      const age = toRef(toRefData,'age');
      const money = ref(toRefData.money);

      function updateToRefData() {
        // toRefData.age += 2
        // age.value += 3
        money.value+=10
      }

      //customRef的使用
      const keyWord = useDebouncedRef('abc',500);

      function useDebouncedRef<T>(value: T, delay = 200) {
        let timeOutId: number;
        return customRef((track, trigger) => {
          return {
            get() {
              //Vue追踪数据
              track();
              return value
            },
            set(newVal: T) {
              //清理定时器
              clearTimeout(timeOutId);
              //设置定时器
              timeOutId = setTimeout(()=>{
                value = newVal;
                //Vue更新数据
                trigger();
              },delay)
            }
          }
        })
      }

      //自定义浅劫持，shallowReactive
      function customShallowReactive(target) {
        //判断传入数据是否为对象
        if (target && typeof target === 'object') {
          return new Proxy(target, ShallowReactiveHandler);
        }
      }

      //shallowReactive处理器
      const ShallowReactiveHandler = {
        //获取属性值
        get(target, prop) {
          const result = Reflect.get(target, prop);
          console.log('拦截读取数据', prop, result);
          return result
        },
        //修改 或 添加 属性值
        set(target, prop, val) {
          const result = Reflect.set(target, prop, val);
          console.log('拦截修改 或 添加 数据', target, prop, val);
          return result
        },
        //删除某个属性
        deleteProperty(target, prop) {
          const result = Reflect.delete(target, prop);
          console.log('拦截删除数据', target, prop);
          return result
        }
      };

      //自定义深劫持，reactive
      function customReactive(target) {
        //判断传入数据是否为对象
        if (target && typeof target === 'object') {
          //深劫持，需要对对象或数组中的所有数据进行递归处理
          //先判断当前的数据是不是数组
          if (Array.isArray(target)) {
            target.forEach((item, index) => {
              target[index] = customReactive(item)
            })
          } else {
            //再判断当前的数据是不是对象
            Object.keys(target).forEach(key => {
              target[key] = customReactive(target[key])
            })
          }
          return new Proxy(target, ReactiveHandler);
        }
      }

      const ReactiveHandler = {
        //获取属性值
        get(target, prop) {
          const result = Reflect.get(target, prop);
          console.log('拦截读取数据', prop, result);
          return result
        },
        //修改 或 添加 属性值
        set(target, prop, val) {
          const result = Reflect.set(target, prop, val);
          console.log('拦截修改 或 添加 数据', target, prop, val);
          return result
        },
        //删除某个属性
        deleteProperty(target, prop) {
          const result = Reflect.delete(target, prop);
          console.log('拦截删除数据', target, prop);
          return result
        }
      };
      
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
        fullName3,
        mouseX,
        mouseY,
        loading,
        data,
        errorMsg,
        //直接解构赋值会导致响应式数据，变成非响应式数据
        // ...wuXia,
        //需要使用toRefs解构
        ...wuXiaRef,
        s1,
        s2,
        s3,
        s4,
        updateData,
        stateData,
        stateData2,
        stateData3,
        updateStateData,
        rawData,
        testToRaw,
        testMarkRaw,
        toRefData,
        age,
        money,
        updateToRefData,
        keyWord,
        customShallowReactive,
        customReactive,
        customShallowReadonly
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
