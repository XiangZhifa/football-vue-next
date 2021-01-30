import {ref} from 'vue';
import axios from 'axios';

export default function <T>(url: string) {
  //状态码
  const loading = ref(true);
  //请求成功的数据
  const data = ref<T | null>(null);
  //错误信息
  const errorMsg = ref('');

  //发送请求
  axios.get(url).then(res => {
    data.value = res.data;
  }).catch(err => {
    data.value = err;
    errorMsg.value = '请求失败';
  }).finally(() => {
    loading.value = false;
  });

  return {
    loading,
    data,
    errorMsg
  }
}