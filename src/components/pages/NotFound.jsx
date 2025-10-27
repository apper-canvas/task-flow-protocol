import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-6"
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
          <ApperIcon name="Search" className="text-slate-500" size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">404</h1>
          <h2 className="text-xl font-semibold text-slate-700">Page Not Found</h2>
          <p className="text-slate-600 max-w-md">
            The page you're looking for doesn't exist. Let's get you back on track with your tasks.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Back to Tasks
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;