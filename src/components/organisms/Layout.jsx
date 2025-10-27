import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/layouts/Root";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <h1 className="text-xl font-bold text-slate-900">Task Flow</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            <ApperIcon name="LogOut" size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </header>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8 max-w-3xl"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;