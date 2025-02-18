<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Tabs from '../components/Tabs.vue'
import DatePicker from 'primevue/datepicker';
import { ref, computed } from 'vue';
import { format } from 'date-fns';

const selectedDate = ref(new Date());
const date = computed(() => format(selectedDate.value, 'dd.MM.yyyy'));

const tasks = computed(() => {
  return [
    {
      heading: "Физическая победа",
      list: ['утренняя прогулка в лесу', 'зарядка', 'контрастный душ'],
      icon: 'pi-trophy'
    },
    {
      heading: "Ментальная победа",
      list: ['планы на завтра', 'задача'],
      icon: 'pi-file-check'
    },
    {
      heading: "Духовная победа",
      list: ['аффирмации', 'дыхательная практика'],
      icon: 'pi-cloud'
    },
    {
      heading: "Карьерная победа",
      list: ['задача рабочая', 'обучение'],
      icon: 'pi-chart-line'
    }
  ]
})
</script>

<template>
  <main class="w-full">
<!--    <TheWelcome />-->
    <DatePicker v-model="selectedDate" inline class="w-full " />
    <Tabs :selectedDate="date" :tasks="tasks" />
  </main>
</template>
