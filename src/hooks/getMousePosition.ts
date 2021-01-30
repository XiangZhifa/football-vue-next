import {ref, onMounted, onBeforeUnmount} from 'vue';

export default function () {
  const mouseX = ref(0);
  const mouseY = ref(0);

  const getPosition = (event: MouseEvent) => {
    mouseX.value = event.pageX;
    mouseY.value = event.pageY;
  };

  onMounted(() => {
    window.addEventListener('click', getPosition)
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', getPosition)
  });

  return {mouseX, mouseY}
}