<template>
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '25rem' }">
      <Form v-slot="$form" :key="resetForm.toString()" :resolver :initialValues @submit="onFormSubmit" class="flex flex-column gap-2 w-full sm:w-56">
        <div class="flex flex-column gap-1">
          <InputText name="task" type="text" placeholder="Задача" fluid />
          <Message v-if="$form.task?.invalid" severity="error" size="small" variant="simple">{{ $form.task.error?.message }}</Message>
        </div>
        <DatePicker v-model="initialValues.date" name="date" showIcon fluid iconDisplay="input"  />
        <div class="flex flex-column gap-1">
          <Select name="type" :options="typesOfTasks" optionLabel="name" placeholder="Тип задачи" fluid />
          <Message v-if="$form.type?.invalid" severity="error" size="small" variant="simple">{{ $form.type.error.message }}</Message>
        </div>
        <Button type="submit" severity="secondary" :label="buttonText" />
      </Form>
    </Dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import Dialog from "primevue/dialog";
import { Form, type FormSubmitEvent } from '@primevue/forms'
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Button from "primevue/button";
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import {  z } from 'zod'
import { type BaseFormProps, convertTask } from '@/converts.ts'
import type { TasksProps } from '@/store/tasks.ts'
import { getTitle } from '@/helpers.ts'

const emit = defineEmits(['formSubmit']);
const visible = ref(false);
const resetForm = ref(false);
const initialValues = ref({
  task: '',
  date: new Date(),
  type: {name: '', code: '' },
});

const props = defineProps<{
  buttonText: string,
  header: string,
  selectedTask?: TasksProps
}>();

const localSelectedTask = ref<TasksProps | undefined>(props.selectedTask);

watch(() => props.selectedTask, (newVal?: TasksProps) => {
  if (newVal) {
    localSelectedTask.value = { ...newVal };
    initialValues.value.task = newVal.title || '';
    const dateParts = newVal.date.split('.');
    const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    initialValues.value.date = newVal.date ? formattedDate : new Date();
    initialValues.value.type = { name: getTitle(newVal.type), code: newVal.type || '' };
  } else {
    initialValues.value = {
      task: '',
      date: new Date(),
      type: { name: '', code: '' },
    };
  }
});

const resolver = ref(zodResolver(
  z.object({
    task: z.string().min(1, { message: 'Введите название задачи' }),
    date: z.date().refine((value) => (value as Date) instanceof Date, { message: 'Вы не указали дату' }),
    type: z.union([
      z.object({
        name: z.string().min(1, 'Тип задачи'),
        code: z.string()
      }),
      z.any().refine(() => false, { message: 'Выберите тип задачи' })
    ])
  })
));

const typesOfTasks = ref([
  { name: 'Физическая', code: 'physical' },
  { name: 'Ментальная', code: 'mental' },
  { name: 'Духовная', code: 'spiritual' },
  { name: 'Карьерная', code: 'career' },
]);

const onFormSubmit = (event: FormSubmitEvent) => {
  const { valid, values, reset } = event;
  const formatValues = !localSelectedTask.value ? convertTask(values as BaseFormProps) : {...convertTask(values as BaseFormProps), id: localSelectedTask.value.id, isComplete: localSelectedTask.value.isComplete} ;

  if (valid) {
    emit('formSubmit', formatValues);
    if (!!localSelectedTask.value) {
      reset();
      resetForm.value = !resetForm.value;
    }
  }
};
</script>

<style>
.p-datepicker-input-icon-container {
  top: 30%
}

.p-overflow-hidden {
  padding-right: 1.5rem !important;
}
</style>
