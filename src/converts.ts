import { format } from 'date-fns'
import type { TaskType } from '@/store/tasks.ts'

interface BaseFormProps {
  type: {
    code: TaskType
  },
  date: Date,
  task:string
}

export const convertTask = (values: BaseFormProps)  => {
  const  {task, date, type} = values;

  return {
    title: task,
    type: type.code,
    date: format(date, 'dd.MM.yyyy'),
    isComplete: false
  }
}
