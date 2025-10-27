import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, isTomorrow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDisplayDate = (date) => {
    if (!date) return "No due date";
    if (isToday(new Date(date))) return "Today";
    if (isTomorrow(new Date(date))) return "Tomorrow";
    return format(new Date(date), "MMM d, yyyy");
  };

  const quickOptions = [
    { label: "Today", value: new Date().toISOString().split('T')[0] },
    { label: "Tomorrow", value: addDays(new Date(), 1).toISOString().split('T')[0] },
    { label: "This Weekend", value: addDays(new Date(), 7 - new Date().getDay()).toISOString().split('T')[0] },
    { label: "Next Week", value: addDays(new Date(), 7).toISOString().split('T')[0] }
  ];

  const handleSelect = (dateString) => {
    onChange(dateString);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setIsOpen(false);
  };

  // Generate calendar days
  const startDate = startOfWeek(currentMonth);
  const endDate = endOfWeek(currentMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-left bg-white rounded-lg border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
      >
        <span className={`flex items-center gap-2 ${value ? "text-slate-900" : "text-slate-500"}`}>
          <ApperIcon name="Calendar" size={16} />
          {formatDisplayDate(value)}
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
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-20 min-w-[280px]"
          >
            <div className="p-3">
              {/* Quick Options */}
              <div className="space-y-1 mb-3 pb-3 border-b border-slate-100">
                {quickOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-2 py-1 text-sm rounded hover:bg-slate-50 transition-colors duration-150"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ApperIcon name="ChevronLeft" size={16} />
                </button>
                <span className="font-semibold text-slate-900">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <ApperIcon name="ChevronRight" size={16} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="p-1 text-slate-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((day) => {
                  const dateString = day.toISOString().split('T')[0];
                  const isSelected = value && isSameDay(new Date(value), day);
                  const isCurrentDay = isToday(day);

                  return (
                    <button
                      key={dateString}
                      type="button"
                      onClick={() => handleSelect(dateString)}
                      className={`p-2 text-sm rounded hover:bg-slate-100 transition-colors duration-150 ${
                        isSelected
                          ? "bg-primary text-white hover:bg-primary/90"
                          : isCurrentDay
                          ? "bg-slate-200 text-slate-900"
                          : "text-slate-700"
                      }`}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>

              {/* Clear Button */}
              {value && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="w-full text-center text-sm text-red-600 hover:text-red-700 py-1"
                  >
                    Clear due date
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DatePicker;