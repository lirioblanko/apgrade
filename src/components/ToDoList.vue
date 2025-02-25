<template>
  <div class="card flex flex-column justify-center">
    <Button type="button" outlined label="Новая задача" @click="toggleModal(true, 'Создание новой задачи', 'Добавить')" />
    <ModalTask  v-model:visible="isVisibleModal" :header="headerModal" :buttonText="buttonModal" @formSubmit="onFormSubmit" :selectedTask="task"/>
    <ToDoBlock title="Запланированные задачи:" :tasks="tasks" :selectedCategories="selectedCategories" :toggleModal="toggleModal"/>
    <ToDoBlock title="Другие задачи:" :tasks="otherTasks" :selectedCategories="otherSelectedCategories" :toggleModal="toggleModal"/>
  </div>
</template>

<script setup lang="ts">
  import ToDoBlock from '../components/ToDoBlock.vue'
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { type TaskFullProps, type TasksProps, useTasksStore } from '../store/tasks.ts'
  import { getIcon } from '@/helpers.ts'

  import ModalTask from '@/components/ModalTask.vue'
  import Button from 'primevue/button'
  const tasksStore = useTasksStore();
  const { allTasksByDate, otherTasks } = storeToRefs(tasksStore);
  const isVisibleModal = ref(false);
  const headerModal = ref('');
  const buttonModal = ref('');
  const task = ref<TaskFullProps | undefined>(undefined);

  function toggleModal(isOpen: boolean, headerName: string, buttonName: string, selectedTask?: TaskFullProps) {
    isVisibleModal.value = isOpen;
    headerModal.value = headerName;
    buttonModal.value = buttonName;
    task.value = selectedTask ? { ...selectedTask } : undefined;
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
    if (task.value === undefined) {
    await tasksStore.fetchNewTask(values);
    } else {
      await tasksStore.fetchUpdateTask(values);
      isVisibleModal.value=false
    }
  };
</script>

<style>
  .card {
    gap: 2rem;
    margin-bottom: 4rem;
  }
</style>
