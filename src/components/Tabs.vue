<template>
  <p class="mb-3 mt-3">Выбранная дата: {{ selectedDate }}</p>
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
          <TaskList />
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">Извините, данный блок находится в разработке</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

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
  }>()

</script>

<style>
</style>
