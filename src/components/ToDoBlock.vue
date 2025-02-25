<template>
  <div class="flex flex-column gap-2 ">
    <h3 class="mb-4">{{ title }} {{ tasks.length }}</h3>
    <div v-for="task of localTasks" :key="task.id"  class="flex justify-content-between task" >
      <div class="flex items-center gap-2">
        <Chip class="chip" :icon="`pi ${task.icon}`" />
        <Checkbox
          v-model="localSelectedCategories"
          name="task"
          :inputId="task.id"
          :value="task.id"
          @change="onChange"
        />
        <label :for="task.id">{{ task.title }}</label>
      </div>
      <div class="flex items-center gap-4">
        <i :class="`pi pi-file-edit delete`" style="font-size: 1rem" @click="toggleModal(true, 'Редактирование задачи', 'Редактировать', task)" />
<!--      todo: прикрепить модальное окно с подтверждением выбора удаления-->
      <i :class="`pi pi-trash delete`" style="font-size: 1rem" @click="tasksStore.fetchDeleteTask(task.id)" />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref , watch, defineProps } from 'vue'
  import Checkbox from 'primevue/checkbox';
  import Chip from 'primevue/chip';
  import type { TaskFullProps } from '@/store/tasks.ts'
  import { useTasksStore } from "../store/tasks";

  const tasksStore = useTasksStore();

  const props = defineProps<{
    title: string;
    tasks: TaskFullProps[];
    selectedCategories: string[];
    toggleModal: (value: boolean, headerName: string, buttonName: string, task: TaskFullProps) => void;
  }>();

  const localSelectedCategories = ref([...props.selectedCategories]);
  const localTasks = ref([...props.tasks]);

  watch(() => props.selectedCategories, (newVal) => {
    localSelectedCategories.value = [...newVal];
  });

  watch(() => props.tasks, (newVal) => {
    localTasks.value = newVal;
  });

  const onChange =(event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const objectId: string = event.target.id;
      const obj: TaskFullProps = localTasks.value.find((obj: TaskFullProps) => obj.id === objectId)!;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { icon, ...objWithoutIcon } = obj;
      tasksStore.fetchUpdateTask({...objWithoutIcon, isComplete: !objWithoutIcon?.isComplete});
    } else {
      console.error('Что-то пошло не так');
    }
  }
</script>

<style>
.chip {
  display: flex;
  align-items: center;
  padding: 4px 0;
  background-color: transparent;
  font-size: 12px;
}

.chip .pi {
  color: #34d399;
}

.delete {
  cursor: pointer;
  align-content: center;
}

.task:hover {
  opacity: 0.5;
  color: #34d399;
}
</style>
