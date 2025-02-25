import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '@/api/api.ts'
// import { useToastLogic } from "../scripts/hooks/useToast.js";

import { format } from 'date-fns';
import { getIcon } from '@/helpers.ts'
export type TaskType = 'physical' | 'mental' | 'spiritual' | 'career';

export interface TasksProps {
  id: string;
  title: string;
  type: TaskType;
  date: string;
  isComplete: boolean;
}

export interface TaskFullProps extends TasksProps {
  icon: string
}

export const useTasksStore = defineStore('tasks', () => {
  const isLoadingTasks = ref(true);
  const allTasks= ref<TasksProps[]>([])
  const allTasksByDate= ref<TasksProps[]>([])
  const otherTasks: ComputedRef<TaskFullProps[]>= computed(() => allTasks.value
    .filter((task: TasksProps) => task.date !== formattedDate.value)
    .map(task => ({
    ...task,
    icon: getIcon(task.type),
  })))
  const doneTasksByDate: Ref<TasksProps[]>= ref<TasksProps[]>([])
  const selectedDate = ref(new Date());
  const formattedDate = computed(() => format(selectedDate.value, 'dd.MM.yyyy'));
  const activeDates = computed(() => [...new Set(allTasks.value.map(task => task.date))])


  async function fetchTasks() {
    try {
      const data: TasksProps[] = await apiService.getTasks();
      if (data) {
        allTasks.value = [...data];
      }
    } catch (error){
      console.log(error)
      // toastInfo(`Ошибка при получении товаров: ${error}`, 'error' )
    }
    isLoadingTasks.value = false;
  }

  async function fetchTasksByDate() {
    try {
      const data: TasksProps[] = await apiService.getTasksByDate(formattedDate.value);
      if (data) {
        allTasksByDate.value = [ ...data];

      }
    } catch (error){
      console.log(error)
      // toastInfo(`Ошибка при получении товаров: ${error}`, 'error' )
    }
    // isLoadingTasks.value = false;
  }

  async function fetchTasksByDone() {
    try {
      const data: TasksProps[] = await apiService.getTasksByDone(formattedDate.value);
      if (data) {
        doneTasksByDate.value = [ ...data];
      }
    } catch (error){
      console.log(error)
      // toastInfo(`Ошибка при получении товаров: ${error}`, 'error' )
    }
    // isLoadingTasks.value = false;
  }

  async function fetchNewTask(task: TasksProps) {
    try {
      const response = await apiService.postNewTask({...task, id: String(allTasks.value.length+1) });
      console.log(`ответ: ${response.data}`)
      fetchTasks();
      fetchTasksByDate();
      // toastInfo(`Заказ успешно оформлен`, 'success' )
    } catch (error) {
      console.log(error)
      // toastInfo(`Ошибка при отправке: ${error}`, 'error' )
    }
  }

  async function fetchUpdateTask(task: TasksProps) {
    // console.log({...task, id: allTasks.value.length })
    try {
      const response = await apiService.putUpdateTask({...task });
      console.log(`ответ: ${response.data}`)
      fetchTasks();
      fetchTasksByDate();
      fetchTasksByDone();
      // toastInfo(`Заказ успешно оформлен`, 'success' )
    } catch (error) {
      console.log(error)
      // toastInfo(`Ошибка при отправке: ${error}`, 'error' )
    }
  }


  return {isLoadingTasks, selectedDate, otherTasks, doneTasksByDate, fetchNewTask, fetchUpdateTask, fetchTasksByDone, activeDates, formattedDate, allTasks, allTasksByDate, fetchTasks, fetchTasksByDate }
})
