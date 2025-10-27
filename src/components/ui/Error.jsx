import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <div className="p-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="text-red-500" size={32} />
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-slate-600 mb-6">
          {message || "We encountered an error while loading your tasks. Please try again."}
        </p>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Error;