import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskFilters = ({ filter, onFilterChange, searchQuery, onSearchChange, taskCounts }) => {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all, icon: "List" },
    { key: "active", label: "Active", count: taskCounts.active, icon: "Clock" },
    { key: "completed", label: "Completed", count: taskCounts.completed, icon: "CheckCircle" }
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
          size={18} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200 placeholder-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ApperIcon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filterOption) => {
          const isActive = filter === filterOption.key;
          return (
            <motion.button
              key={filterOption.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange(filterOption.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <ApperIcon name={filterOption.icon} size={16} />
              <span>{filterOption.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}>
                {filterOption.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilters;