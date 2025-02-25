<template>
  <div class="card flex flex-column justify-center">
    <Button type="button" outlined label="Новая задача" @click="toggleModal(true, 'Создание новой задачи', 'Добавить')" />
    <ModalTask  v-model:visible="isVisibleModal" :header="headerModal" :buttonText="buttonModal" @formSubmit="onFormSubmit"/>
    <ToDoBlock title="Запланированные задачи:" :tasks="tasks" :selectedCategories="selectedCategories"/>
    <ToDoBlock title="Другие задачи:" :tasks="otherTasks" :selectedCategories="otherSelectedCategories"/>
  </div>
</template>

<script setup lang="ts">
  import ToDoBlock from '../components/ToDoBlock.vue'
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { type TasksProps, useTasksStore } from '../store/tasks.ts'
  import { getIcon } from '@/helpers.ts'

  import ModalTask from '@/components/ModalTask.vue'
  import Button from 'primevue/button'
  const tasksStore = useTasksStore();
  const { allTasksByDate, otherTasks } = storeToRefs(tasksStore);
  const isVisibleModal = ref(false);
  const headerModal = ref('');
  const buttonModal = ref('');

  function toggleModal(value: boolean, headerName: string, buttonName: string) {
    isVisibleModal.value = value;
    headerModal.value = headerName;
    buttonModal.value = buttonName;
  }
  onMounted(() => {
    tasksStore.fetchTasks()
    tasksStore.fetchTasksByDate()
  });

const tasks = computed(() => allTasksByDate.value.map(task => ({
    ...task,
    icon: getIcon(task.type),
})));

const selectedCategories = computed(() => allTasksByDate.value.filter(task => task.isComplete).map(task => {
  return task.id
}));
  const otherSelectedCategories = computed(() => otherTasks.value.filter(task => task.isComplete).map(task => {
    return task.id
  }));

  const onFormSubmit = async (values: TasksProps) => {
    await tasksStore.fetchNewTask(values); // Вызываем функцию из store
    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  };


</script>

<style>
  .card {
    gap: 2rem;
  }
</style>
