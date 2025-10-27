import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggleComplete = () => {
    onUpdate(task.Id, { 
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    });
  };

  const handleEdit = () => {
    if (isEditing) {
      if (editTitle.trim() && editTitle !== task.title) {
        onUpdate(task.Id, { title: editTitle.trim() });
      } else {
        setEditTitle(task.title);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-transparent";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high": return "High";
      case "medium": return "Medium";
      case "low": return "Low";
      default: return null;
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateStatus = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isPast(date) && !isToday(date)) return "overdue";
    if (isToday(date)) return "today";
    if (isTomorrow(date)) return "tomorrow";
    return "upcoming";
  };

  const dueDateLabel = formatDueDate(task.dueDate);
  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <motion.div
      layout
      whileHover={{ y: -2, shadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      className={`bg-white rounded-xl border-2 transition-all duration-200 ${
        task.completed 
          ? "border-slate-200 bg-slate-50" 
          : "border-slate-100 hover:border-slate-200"
      }`}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Priority Indicator */}
        {task.priority && (
          <div className={`w-1 h-16 rounded-full ${getPriorityColor(task.priority)}`} />
        )}

        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? "bg-gradient-to-r from-success to-emerald-500 border-success text-white"
              : "border-slate-300 hover:border-primary hover:bg-primary/5"
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ApperIcon name="Check" size={12} />
            </motion.div>
          )}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEdit}
              autoFocus
              className="w-full text-lg font-medium bg-transparent border-b-2 border-primary focus:outline-none pb-1"
            />
          ) : (
            <motion.h3
              className={`text-lg font-medium transition-all duration-300 ${
                task.completed
                  ? "text-slate-500 line-through"
                  : "text-slate-900"
              }`}
            >
              {task.title}
              {task.completed && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-0.5 bg-slate-400 absolute"
                />
              )}
            </motion.h3>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* Priority Badge */}
            {task.priority && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                task.priority === "high" ? "bg-red-100 text-red-700" :
                task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {getPriorityLabel(task.priority)}
              </span>
            )}

            {/* Due Date Badge */}
            {dueDateLabel && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                dueDateStatus === "overdue" ? "bg-red-100 text-red-700" :
                dueDateStatus === "today" ? "bg-orange-100 text-orange-700" :
                dueDateStatus === "tomorrow" ? "bg-yellow-100 text-yellow-700" :
                "bg-slate-100 text-slate-600"
              }`}>
                <ApperIcon name="Calendar" size={10} />
                {dueDateLabel}
              </span>
            )}

            {/* Completion Date */}
            {task.completed && task.completedAt && (
              <span className="text-xs text-slate-500">
                Completed {format(new Date(task.completedAt), "MMM d")}
              </span>
            )}
          </div>

          {/* Notes */}
          {task.notes && (
            <p className={`text-sm mt-2 ${
              task.completed ? "text-slate-400" : "text-slate-600"
            }`}>
              {task.notes}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            <ApperIcon name={isEditing ? "Check" : "Edit2"} size={14} />
          </button>
          <button
            onClick={() => onDelete(task.Id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <ApperIcon name="Trash2" size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;