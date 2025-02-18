
<template>
  <div class="card flex flex-column justify-center">
    <h4 class="mb-2">
     Сегодня запланировано {{ categories.length }} задач</h4>
      <div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
<!--        <Chip class="chip" icon=`${{category.chip}}` />-->
        <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
        <label :for="category.key">{{ category.name }}</label>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';

const categories = ref([
  {name: "Задача 1", key: "key1", isChecked: true},
  {name: "Задача 2", key: "key2", chip: 'pi pi-trophy'},
  {name: "Задача 3", key: "key3"},
  {name: "Задача 4", key: "key4"},
  {name: "Задача 5", key: "key5", chip: 'pi pi-trophy'}
]);
console.log(categories.value)
const selectedCategories = ref(['Задача 2', 'Задача 5']);
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
  color: var(--accordion-header-focus-ring-color, #10B981);
}
</style>
