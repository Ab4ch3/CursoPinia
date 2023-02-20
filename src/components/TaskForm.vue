<template>
  <form @submit.prevent="handleSubmit">
    <input
      id="inputTask"
      v-model="newTask"
      type="text"
      placeholder="I need to ....."
      name="task"
    />
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore.js";
const store = useTaskStore();
const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    store.addTask({
      title: newTask.value,
      isFav: false,
      id: Math.floor(Math.random() * 10000),
    });
    newTask.value = "";
  }
  return { handleSubmit, newTask };
};
</script>

<style scoped></style>
