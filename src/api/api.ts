import type { TasksProps } from '@/store/tasks.ts'

export const API_URL = 'http://localhost:5001';

export const apiService = {
  async getTasks() {
    const response = await fetch(`${API_URL}/tasks`);

    return await response.json();
  },

  async getTasksByDate(date:string) {
    const response = await fetch(`${API_URL}/tasks?date=${date}`)

    return await response.json();
  },

  async getTasksByDone(date:string) {
    const response = await fetch(`${API_URL}/tasks?date=${date}&isComplete=true`)

    return await response.json();
  },

  async postNewTask(task: TasksProps) {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
    }

    return await response.json();
  },

  async putUpdateTask(task: TasksProps) {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
    }

    return await response.json();
  }
};
