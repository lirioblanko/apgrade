import { format } from 'date-fns'
import type { TaskType } from '@/store/tasks.ts'
import type { ComputedRef } from 'vue'

export function getIcon (type: TaskType)  {
  switch (type) {
    case 'physical':
      return 'pi-trophy';
    case 'mental':
      return 'pi-file-check';
    case 'spiritual':
      return 'pi-cloud';
    case 'career':
      return 'pi-chart-line';
    default:
      return '';
  }
}

export function getDisabledDates (dates:  ComputedRef<string[]>) {
  const allDates = [];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2030, 11, 31);

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = format(d, 'dd.MM.yyyy');
    if (!dates.value.includes(dateString)) {
      allDates.push(new Date(d));
    }
  }

  return allDates;
}
