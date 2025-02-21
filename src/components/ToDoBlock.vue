<template>
  <div>
    <h3 class="mb-4">{{title}} {{ tasks.length }}</h3>
    <div v-for="task of tasks" :key="task.id" class="flex items-center gap-2">
      <Chip class="chip" :icon="`pi ${task.icon}`" />
      <Checkbox v-model="localSelectedCategories" :inputId="task.id" name="category" :value="task.title" />
      <label :for="task.id">{{ task.title }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Checkbox from 'primevue/checkbox';
  import Chip from 'primevue/chip';
  import { ref , watch} from 'vue'
  import type { TaskFullProps } from '@/store/tasks.ts'

  const props = defineProps<{
    title: string;
    tasks: TaskFullProps[];
    selectedCategories: string[];
  }>();

  const localSelectedCategories = ref(props.selectedCategories);

  watch(() => props.selectedCategories, (newVal) => {
    localSelectedCategories.value = newVal;
  });

  // watch(() => localSelectedCategories.value, (newVal) => {
  //   emit('update:selectedCategories', newVal);
  // });

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
