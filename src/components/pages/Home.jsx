import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskInput from "@/components/organisms/TaskInput";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskList from "@/components/organisms/TaskList";
import TaskStats from "@/components/molecules/TaskStats";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const Home = () => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task. Please try again.");
      console.error("Failed to add task:", err);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      
      if (updates.completed !== undefined) {
        toast.success(
          updates.completed ? "Task completed! 🎉" : "Task marked as incomplete"
        );
      }
    } catch (err) {
      toast.error("Failed to update task. Please try again.");
      console.error("Failed to update task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find(task => task.Id === id);
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
      
      // Show undo toast
      toast.info(
        <div className="flex items-center justify-between">
          <span>Task deleted</span>
          <button
            onClick={() => handleUndoDelete(taskToDelete)}
            className="ml-4 text-white underline hover:no-underline"
          >
            Undo
          </button>
        </div>,
        { autoClose: 5000 }
      );
    } catch (err) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Failed to delete task:", err);
    }
  };

  const handleUndoDelete = async (task) => {
    try {
      const restoredTask = await taskService.create({
        ...task,
        id: undefined // Let service generate new ID
      });
      setTasks(prev => [restoredTask, ...prev]);
      toast.success("Task restored!");
    } catch (err) {
      toast.error("Failed to restore task. Please try again.");
      console.error("Failed to restore task:", err);
    }
  };

const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === "all" ||
      (filter === "active" && !task.completed_c) ||
      (filter === "completed" && task.completed_c);
    
    const matchesSearch = 
      task.title_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.notes_c && task.notes_c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const activeTasks = tasks.filter(task => !task.completed_c);
  const completedTasks = tasks.filter(task => task.completed_c);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-md mx-auto">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={loadTasks}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-3 shadow-lg border border-slate-200"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="text-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Task Flow
          </h1>
        </motion.div>
        <p className="text-slate-600 text-lg">
          Streamline your productivity with focused task management
        </p>
      </div>

      {/* Task Stats */}
      <TaskStats 
        total={tasks.length}
        active={activeTasks.length}
        completed={completedTasks.length}
      />

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Task Input */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <TaskInput 
            onAddTask={handleAddTask}
            ref={inputRef}
          />
        </div>

        {/* Task Filters */}
        <div className="p-6 border-b border-slate-100">
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            taskCounts={{
              all: tasks.length,
              active: activeTasks.length,
              completed: completedTasks.length
            }}
          />
        </div>

        {/* Task List */}
        <div className="min-h-[400px]">
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {/* Footer */}
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => inputRef.current?.focus()}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="text-sm">Press Enter to add tasks quickly</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;