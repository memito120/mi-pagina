import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export function MobileMenuButton({ onOpen }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      className="fixed top-4 right-4 z-50 xl:hidden p-3 rounded-xl border border-border/60 bg-background/60 backdrop-blur-xl shadow-lg hover:bg-background/80 transition-colors"
      aria-label="Abrir menú"
    >
      <Menu className="h-6 w-6 text-foreground" />
    </motion.button>
  );
}
