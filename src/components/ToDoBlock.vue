<template>
  <div>
    <h3 class="mb-4">{{ title }} {{ tasks.length }}</h3>
    <div v-for="task of localTasks" :key="task.id" class="flex items-center gap-2">
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
</style>
