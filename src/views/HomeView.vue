<template>
  <main class="w-full">
    <DatePicker v-model="selectedDate" :disabledDates="disabledDates" inline class="w-full" @update:modelValue="() => { tasksStore.fetchTasksByDate(); tasksStore.fetchTasksByDone(); }" />
    <Tabs :selectedDate="formattedDate" />
    <Toast />
  </main>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import DatePicker from 'primevue/datepicker';
  import Tabs from '../components/Tabs.vue'
  import { storeToRefs } from "pinia";
  import { useTasksStore } from "../store/tasks";
  import { getDisabledDates } from '@/helpers.ts'

  const tasksStore = useTasksStore();
  const { activeDates, selectedDate,  formattedDate } = storeToRefs(tasksStore)
  const disabledDates = computed(() => getDisabledDates(activeDates));
</script>

<style>
.p-datepicker-day {
  color: #34d399
}

.p-datepicker-day-selected {
  color: #fff;
}

 .p-disabled {
   color: #ffffff;
 }

.p-datepicker-today > .p-datepicker-day-selected {
   color: #fff;
 }

 .p-datepicker-today > .p-datepicker-day {
   background-color: #B0DFCE;
 }
</style>
