import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = () => {
  return (
    <div className="p-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckSquare" className="text-slate-400" size={40} />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No tasks yet
        </h3>
        
        <p className="text-slate-600 mb-6">
          Start by adding your first task above. Keep your productivity flowing!
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <ApperIcon name="Plus" size={14} />
            <span>Add tasks</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="flex items-center gap-2">
            <ApperIcon name="CheckSquare" size={14} />
            <span>Mark complete</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="flex items-center gap-2">
            <ApperIcon name="Star" size={14} />
            <span>Set priorities</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Empty;