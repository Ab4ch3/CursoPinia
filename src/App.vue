<template>
  <main>
    <!-- Heading -->

    <header>
      <img src="@/assets/node.png" alt="" srcset="" />
      <h1>{{ store.title }}</h1>
    </header>

    <!-- New Task Form -->
    <div class="new-task-form">
      <TaksForm />
    </div>

    <!-- filters -->
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Fav Task</button>
    </nav>

    <!-- Loading -->
    <div v-if="store.loading" class="loading">Loading tasks ....</div>
    <!-- task List -->
    <div v-if="filter === 'all'" class="task-list">
      <p>You have {{ store.totalCount }} task left to do</p>
      <div v-for="task in store.tasks" :key="task.id">
        <TaksDetails :task="task" />
      </div>
    </div>
    <div v-if="filter === 'favs'" class="task-list">
      <p>You have {{ store.favCount }} task left to do</p>

      <div v-for="task in store.favs" :key="task.id">
        <TaksDetails :task="task" />
      </div>
    </div>

    <button @click="store.$reset">Reset</button>
  </main>
</template>

<script setup>
import TaksDetails from "@/components/TaskDetails.vue";
import TaksForm from "@/components/TaskForm.vue";
import { useTaskStore } from "@/stores/TaskStore.js";
import { ref } from "vue";
// import { storeToRefs } from "pinia";

const store = useTaskStore();
const filter = ref("all");
store.getTasks();

// Se puede desesctrutura el store para realizar cambios reactivos sobre las propiedades
// const { tasks } = storeToRefs(store);
</script>

<style scoped></style>
