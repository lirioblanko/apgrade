<script setup lang="ts">
  import Tab from 'primevue/tab'
  import Tabs from 'primevue/tabs'
  import TabList from 'primevue/tablist'
  import TabPanel from 'primevue/tabpanel'
  import TabPanels from 'primevue/tabpanels'

  import ToDoList from '@/components/ToDoList.vue'
  import TaskList from '@/components/TaskList.vue'

  defineProps<{
    selectedDate: string
    tasks: { heading: string; list: string[], icon: string }[]
  }>()

</script>

<template>
  <p class="mb-2 mt-2">Выбранная дата: {{ selectedDate }}</p>
  <div class="card">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Планнер</Tab>
        <Tab value="1">Победы дня</Tab>
        <Tab value="2">Саморефлексия</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <ToDoList />
        </TabPanel>
        <TabPanel value="1">
          <TaskList :tasks="tasks"/>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">Саморефлексия</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
