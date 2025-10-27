import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const PrioritySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const priorities = [
    { value: "none", label: "No Priority", color: "text-slate-600", bg: "bg-slate-100" },
    { value: "low", label: "Low Priority", color: "text-blue-600", bg: "bg-blue-100" },
    { value: "medium", label: "Medium Priority", color: "text-yellow-600", bg: "bg-yellow-100" },
    { value: "high", label: "High Priority", color: "text-red-600", bg: "bg-red-100" }
  ];

  const selectedPriority = priorities.find(p => p.value === value) || priorities[0];

  const handleSelect = (priorityValue) => {
    onChange(priorityValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-left bg-white rounded-lg border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 ${selectedPriority.color}`}
      >
        <span className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${selectedPriority.bg}`} />
          {selectedPriority.label}
        </span>
        <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-10"
          >
            <div className="py-1">
              {priorities.map((priority) => (
                <motion.button
                  key={priority.value}
                  type="button"
                  onClick={() => handleSelect(priority.value)}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-50 transition-colors duration-150 ${priority.color}`}
                >
                  <div className={`w-3 h-3 rounded-full ${priority.bg}`} />
                  {priority.label}
                  {value === priority.value && (
                    <ApperIcon name="Check" size={14} className="ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default PrioritySelector;