import type { TasksProps } from '@/store/tasks.ts'

export const API_URL = 'http://localhost:5001';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
  }

  return await response.json();
}

const createFetchRequestOptions = <T>(method: string, task: T) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  };
}

export const apiService = {
  async getTasks() {
    const response = await fetch(`${API_URL}/tasks`);

    return handleResponse(response);
  },

  async getTasksByDate(date:string) {
    const response = await fetch(`${API_URL}/tasks?date=${date}`)

    return handleResponse(response);
  },

  async getTasksByDone(date:string) {
    const response = await fetch(`${API_URL}/tasks?date=${date}&isComplete=true`)

    return handleResponse(response);
  },

  async postNewTask(task: TasksProps) {
    const response = await fetch(`${API_URL}/tasks`, createFetchRequestOptions('POST', task))

    return handleResponse(response);
  },

  async putUpdateTask(task: TasksProps) {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, createFetchRequestOptions('PUT', task));

    return handleResponse(response);
  },

  async deleteTask(id: string) {
    const response = await fetch(`${API_URL}/tasks/${id}`, createFetchRequestOptions('DELETE', id));

    return handleResponse(response);
  }
};
