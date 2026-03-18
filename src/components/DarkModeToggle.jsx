import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

export function DarkModeToggle({ isDarkMode, setIsDarkMode }) {
  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative group">
        <Button
          size="icon"
          variant="outline"
          onClick={handleToggle}
          aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-pressed={isDarkMode}
          className={cn(
            "relative overflow-hidden rounded-full border-border/70 bg-background/60 backdrop-blur-xl",
            "h-11 w-11 sm:h-12 sm:w-12 shadow-md hover:shadow-lg transition-all duration-300",
            "text-foreground/90 hover:text-primary",
            isDarkMode
              ? "ring-1 ring-primary/40"
              : "ring-1 ring-transparent"
          )}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDarkMode ? 180 : 0, scale: isDarkMode ? 1 : 0.95 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative flex items-center justify-center"
          >
            {isDarkMode ? (
              <Moon className="h-6 w-6" />
            ) : (
              <Sun className="h-6 w-6" />
            )}
          </motion.div>
        </Button>
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 w-max rounded-md bg-muted/80 transform -translate-x-40 translate-y-11 px-2 py-1 text-xs text-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity">
          {isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        </div>
      </div>   
    </motion.div>
    
    

  );
}
