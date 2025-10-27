import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="p-6 space-y-3">
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-slate-100 rounded-xl p-4 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 bg-slate-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="flex gap-2">
                <div className="h-4 bg-slate-200 rounded w-16" />
                <div className="h-4 bg-slate-200 rounded w-20" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;