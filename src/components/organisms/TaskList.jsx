import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";

const TaskList = ({ tasks, loading, onUpdateTask, onDeleteTask }) => {
  if (loading) {
    return <Loading />;
  }

  if (tasks.length === 0) {
    return <Empty />;
  }

  return (
    <div className="p-6">
      <AnimatePresence>
        <motion.div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              layout
            >
              <TaskCard
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TaskList;