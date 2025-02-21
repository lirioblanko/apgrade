<template>
  <div v-for="(task, index) of result" :key="index">
    <Item>
      <template #icon>
        <i :class="'pi ' + task.icon" style="font-size: 1.2rem"></i>
      </template>
      <template #heading>{{ task.heading }}</template>
      <ul class="pl-0" v-for="(item, index) of task.list" :key="index">
        <li class="ml-3">{{ item }}</li>
      </ul>
    </Item>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Item from '@/components/Item.vue'
import { type TasksProps, useTasksStore } from '@/store/tasks.ts'
import { storeToRefs } from 'pinia'
import { getIcon, getTitle } from '@/helpers.ts'

interface TaskItem {
  heading: string;
  list: string[];
  icon: ReturnType<typeof getIcon>;
}

const tasksStore = useTasksStore()
const { doneTasksByDate } = storeToRefs(tasksStore)

onMounted(() => {
  tasksStore.fetchTasksByDone()
})

const result = computed<TaskItem[]>(() =>
  Object.values(
    doneTasksByDate.value.reduce((acc: Record<string, TaskItem>, task: TasksProps) => {
      if (!acc[task.type]) {
        console.log(acc[task.type])
        acc[task.type] = { heading: getTitle(task.type), list: [], icon: getIcon(task.type) }
      }
      acc[task.type].list.push(task.title)

      return acc
    }, {}),
  ),
)
</script>

<style>
  .details h3 {
    color: #34d399;
  }

  .item {
    gap: 0.5rem !important;
  }

</style>
