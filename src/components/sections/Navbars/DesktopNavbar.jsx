import { AnimatePresence, motion } from 'framer-motion';
import coclearDarkIcon from '../../../assets/coclear-dark.svg';
import coclearNormalIcon from '../../../assets/coclear-normal.svg';

export function DesktopNavbar({ isDarkMode, navItems, activeSection, showTooltip, onShowTooltip, onHideTooltip, onNavigate }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(96%,980px)] hidden xl:block"
    >
      <nav className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur-xl shadow-lg">
        <div className="px-3 py-2 sm:px-4">
          <ul className="flex items-center gap-1">
            <li className="relative ml-2 mr-1">
              <motion.button
                onMouseEnter={onShowTooltip}
                onMouseLeave={onHideTooltip}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={isDarkMode ? coclearDarkIcon : coclearNormalIcon}
                  alt="Usuario de implante coclear"
                  className="w-6 h-6 object-contain"
                />
              </motion.button>

              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -right-16 -left-16 mt-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-xl pointer-events-none"
                  >
                    <p className="text-xs font-medium text-popover-foreground">Usuario de implante coclear</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Sitio inclusivo y accesible</p>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground/85 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id ? (
                    <span className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-primary rounded-full" />
                  ) : (
                    <motion.span
                      className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformOrigin: 'center' }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
