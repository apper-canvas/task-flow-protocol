import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ total, active, completed }) => {
  const completionRate = total > 0 ? (completed / total) * 100 : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: "List",
      color: "text-slate-600",
      bg: "bg-slate-100"
    },
    {
      label: "Active",
      value: active,
      icon: "Clock",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Completed",
      value: completed,
      icon: "CheckCircle",
      color: "text-success",
      bg: "bg-success/10"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats */}
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.2 }}
            className="text-center"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-3`}>
              <ApperIcon name={stat.icon} className={stat.color} size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">
              {stat.label}
            </div>
          </motion.div>
        ))}

        {/* Progress */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-3">
            <ApperIcon name="TrendingUp" className="text-primary" size={20} />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
            {Math.round(completionRate)}%
          </div>
          <div className="text-sm text-slate-600 mb-2">
            Progress
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Encouragement Message */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className="text-slate-600">
            {completionRate === 100 ? (
              <span className="flex items-center justify-center gap-2">
                <ApperIcon name="PartyPopper" size={16} />
                All done! Time to celebrate! 🎉
              </span>
            ) : active === 0 ? (
              "No active tasks - ready to add more?"
            ) : active === 1 ? (
              "Just one task left - you're almost there!"
            ) : (
              `${active} tasks to go - keep up the momentum!`
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskStats;