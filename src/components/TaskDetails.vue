vbase
<template>
  <div class="task">
    <h3>{{ props.task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="store.deleteTask(task.id)">delete</i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="store.toggleFav(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/TaskStore.js";
const store = useTaskStore();
const props = defineProps({
  task: {
    type: Object,
    require: true,
    default() {
      return {};
    },
  },
});
</script>

<style scoped></style>
