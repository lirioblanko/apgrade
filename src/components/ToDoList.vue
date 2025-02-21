<template>
  <div class="card flex flex-column justify-center">
    <ToDoBlock title="Запланированные задачи:" :tasks="tasks" :selectedCategories="selectedCategories"/>
    <ToDoBlock title="Другие задачи:" :tasks="otherTasks" :selectedCategories="selectedCategories"/>
<!--    <h3 class="mb-4">Запланированные задачи: {{ tasks.length }}</h3>-->
<!--    <div v-for="task of tasks" :key="task.id" class="flex items-center gap-2">-->
<!--      <Chip class="chip" :icon="`pi ${task.icon}`" />-->
<!--      <Checkbox v-model="selectedCategories" :inputId="task.id" name="category" :value="task.title" />-->
<!--      <label :for="task.id">{{ task.title }}</label>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
  import ToDoBlock from '../components/ToDoBlock.vue'
  import { computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useTasksStore } from '../store/tasks.ts'
  // import Checkbox from 'primevue/checkbox';
  // import Chip from 'primevue/chip';
  import { getIcon } from '@/helpers.ts'

  const tasksStore = useTasksStore();
  const { allTasksByDate, otherTasks } = storeToRefs(tasksStore);

  onMounted(() => {
    tasksStore.fetchTasks()
    tasksStore.fetchTasksByDate()
  });

const tasks = computed(() => allTasksByDate.value.map(task => ({
    ...task,
    icon: getIcon(task.type),
})));

const selectedCategories = computed(() => allTasksByDate.value.filter(task => task.isComplete).map(task => task.title));

</script>

<style>
  .card {
    gap: 2rem;
  }
</style>
