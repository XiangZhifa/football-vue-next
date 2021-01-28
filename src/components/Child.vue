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
    setup() {

      return {}
    }
  })
</script>
