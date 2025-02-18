
<template>
  <div v-for="(task, index) of tasks" :key="index">
    <Item>
      <template #icon>
        <i :class="'pi ' + task.icon" style="font-size: 1.5rem"></i>
      </template>
      <template #heading>{{ task.heading }}</template>
      <ul v-for="(item, index) of task.list" :key="index">
        <li>{{ item }}</li>
      </ul>
    </Item>
  </div>
</template>

<script setup lang="ts">
  import Item from '@/components/Item.vue'

  defineProps<{
    tasks: { heading: string; list: string[], icon: string }[]
  }>()
</script>

<style>
</style>
