import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar as tarefas no AsyncStorage
const TASKS_STORAGE_KEY = '@DailyDo:tasks';

// Modelo de dados para uma tarefa
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Função para gerar um ID único
const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Função para carregar todas as tarefas do AsyncStorage
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      // Converter as datas de string para Date
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
};

// Função para salvar todas as tarefas no AsyncStorage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const tasksJson = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, tasksJson);
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
};

// Função para adicionar uma nova tarefa
export const addTask = async (text: string): Promise<Task> => {
  const newTask: Task = {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date(),
  };

  const tasks = await loadTasks();
  tasks.push(newTask);
  await saveTasks(tasks);

  return newTask;
};

// Função para atualizar uma tarefa existente
export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    await saveTasks(tasks);
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (taskId: string): Promise<void> => {
  const tasks = await loadTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  await saveTasks(filteredTasks);
};

// Função para marcar/desmarcar uma tarefa como concluída
export const toggleTaskCompletion = async (taskId: string): Promise<void> => {
  const tasks = await loadTasks();
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    await updateTask(taskId, { completed: !task.completed });
  }
};

// Função para limpar todas as tarefas (útil para testes)
export const clearAllTasks = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar tarefas:', error);
  }
};

