<template>
  <h2>Child是子组件</h2>
  <p>
    来自父组件的数据：{{msg}}
  </p>
</template>

<script lang="ts">
  import {defineComponent, ref, reactive} from 'vue';

  export default defineComponent({
    name: 'Child',
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    //setUp中的参数
    //props参数是一个proxy对象，包含父组件向子组件传递的数据
    setup(props, context) {
      console.log(props);
      console.log(props.msg);
      console.log(context);
      console.log(context.attrs);
      console.log(context.attrs.msg2);
      console.log(context.emit);
      return {}
    }
  })
</script>
