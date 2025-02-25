import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { apiService } from '@/api/api.ts'
// import { useToastLogic } from "../scripts/hooks/useToast.js";

import { format } from 'date-fns';
import { getIcon } from '@/helpers.ts'
import { v4 as uuidv4 } from 'uuid';
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
  const isLoadingTasks = ref(true); //локально нет смысла использовать
  const allTasks = ref<TasksProps[]>([])
  const allTasksByDate = ref<TasksProps[]>([])
  const otherTasks: ComputedRef<TaskFullProps[]> = computed(() => allTasks.value
    .filter((task: TasksProps) => task.date !== formattedDate.value)
    .map(task => ({
      ...task,
      icon: getIcon(task.type),
    })))
  const doneTasksByDate: Ref<TasksProps[]> = ref<TasksProps[]>([])
  const selectedDate = ref(new Date());
  const formattedDate = computed(() => format(selectedDate.value, 'dd.MM.yyyy'));
  const activeDates = computed(() => [...new Set(allTasks.value.map(task => task.date))])


  async function fetchTasks() {
    try {
      const data: TasksProps[] = await apiService.getTasks();
      if (data) {
        allTasks.value = [...data];
      }
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
    isLoadingTasks.value = false;
  }

  async function fetchTasksByDate() {
    try {
      const data: TasksProps[] = await apiService.getTasksByDate(formattedDate.value);
      if (data) {
        allTasksByDate.value = [...data];
      }
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
  }

  async function fetchTasksByDone() {
    try {
      const data: TasksProps[] = await apiService.getTasksByDone(formattedDate.value);
      if (data) {
        doneTasksByDate.value = [...data];
      }
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
  }

  async function fetchNewTask(task: TasksProps) {
    try {
      await apiService.postNewTask({ ...task, id: uuidv4() });
      await Promise.all([
        fetchTasks(),
        fetchTasksByDate()
      ]);
      // toastInfo(`Задача успешно создана`, 'success' )
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
  }

  async function fetchUpdateTask(task: TasksProps) {
    // console.log({...task, id: allTasks.value.length })
    try {
      await apiService.putUpdateTask({ ...task });
      await Promise.all([
        fetchTasks(),
        fetchTasksByDate(),
        fetchTasksByDone()
      ]);
      // toastInfo(`Заказ успешно оформлен`, 'success' )
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
  }

  async function fetchDeleteTask(id: string) {
    // console.log({...task, id: allTasks.value.length })
    try {
      await apiService.deleteTask(id);
      await Promise.all([
        fetchTasks(),
        fetchTasksByDate(),
        fetchTasksByDone()
      ]);
      // toastInfo(`Задача успешно удалена`, 'success' )
    } catch (error) {
      console.log(error)
      // toastInfo(`Произошла ошибка: ${error}`, 'error' )
    }
  }

  return {
    isLoadingTasks,
    allTasks,
    allTasksByDate,
    otherTasks,
    activeDates,
    selectedDate,
    formattedDate,
    doneTasksByDate,
    fetchTasks,
    fetchTasksByDate,
    fetchTasksByDone,
    fetchNewTask,
    fetchUpdateTask,
    fetchDeleteTask,
  }
})
