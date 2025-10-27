import { useState, forwardRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import DatePicker from "@/components/molecules/DatePicker";

const TaskInput = forwardRef(({ onAddTask }, ref) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("none");
  const [dueDate, setDueDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const taskData = {
      title_c: title.trim(),
      completed_c: false,
      priority_c: priority === "none" ? null : priority,
      due_date_c: dueDate,
      notes_c: notes.trim() || null
    };

    onAddTask(taskData);
    
    // Reset form
    setTitle("");
    setPriority("none");
    setDueDate(null);
    setNotes("");
    setShowAdvanced(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input */}
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            autoFocus
            className="w-full text-lg py-4 px-6 bg-white rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder-slate-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showAdvanced || priority !== "none" || dueDate || notes
                  ? "text-primary bg-primary/10" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              }`}
            >
              <ApperIcon name="Settings" size={18} />
            </button>
            {title.trim() && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <ApperIcon name="Plus" size={18} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-50 rounded-xl p-4 space-y-4"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>
                <PrioritySelector
                  value={priority}
                  onChange={setPriority}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Due Date
                </label>
                <DatePicker
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add additional notes..."
                rows={2}
                className="w-full py-2 px-3 bg-white rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 resize-none placeholder-slate-400"
              />
            </div>
          </motion.div>
        )}

        {/* Quick Action Hint */}
        {!title.trim() && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate-500 flex items-center gap-2"
          >
            <ApperIcon name="Zap" size={14} />
            Type and press Enter for quick add
          </motion.p>
        )}
      </form>
    </motion.div>
  );
});

TaskInput.displayName = "TaskInput";

export default TaskInput;