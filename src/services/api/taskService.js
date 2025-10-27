import { taskData } from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.storageKey = "taskflow_tasks";
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      this.tasks = stored ? JSON.parse(stored) : [...taskData];
    } catch (error) {
      console.warn("Failed to load tasks from storage, using defaults");
      this.tasks = [...taskData];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (error) {
      console.warn("Failed to save tasks to storage");
    }
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = this.tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.Id)) + 1 : 1;
    const now = new Date().toISOString();
    
    const newTask = {
      Id: newId,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || null,
      dueDate: taskData.dueDate || null,
      category: taskData.category || null,
      notes: taskData.notes || "",
      createdAt: now,
      completedAt: null
    };

    this.tasks.unshift(newTask);
    this.saveToStorage();
    return { ...newTask };
  }

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...this.tasks[index],
      ...updates,
      Id: parseInt(id) // Ensure Id remains integer
    };

    this.tasks[index] = updatedTask;
    this.saveToStorage();
    return { ...updatedTask };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }

    const deletedTask = this.tasks.splice(index, 1)[0];
    this.saveToStorage();
    return { ...deletedTask };
  }

  // Bulk operations for future features
  async bulkUpdate(ids, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedTasks = [];
    ids.forEach(id => {
      const index = this.tasks.findIndex(task => task.Id === parseInt(id));
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updates };
        updatedTasks.push({ ...this.tasks[index] });
      }
    });

    this.saveToStorage();
    return updatedTasks;
  }

  async bulkDelete(ids) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const deletedTasks = [];
    ids.forEach(id => {
      const index = this.tasks.findIndex(task => task.Id === parseInt(id));
      if (index !== -1) {
        deletedTasks.push({ ...this.tasks[index] });
        this.tasks.splice(index, 1);
      }
    });

    this.saveToStorage();
    return deletedTasks;
  }
}

export const taskService = new TaskService();