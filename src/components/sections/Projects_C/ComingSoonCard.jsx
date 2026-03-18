import { motion } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export function ComingSoonCard({ project, index }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains('dark'));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const normalizePath = (path) => {
    if (!path) {
      return '';
    }

    if (path.startsWith('../src/')) {
      return path.replace('../src/', '/src/');
    }

    return path;
  };

  const lightImage = normalizePath(project?.images?.[0]);
  const darkImage = normalizePath(project?.images?.[1]) || lightImage;
  const previewImage = isDarkMode ? darkImage : lightImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden border-border/70 bg-card/85 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:ring-white/10">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={previewImage}
            alt="Vista previa de proyectos proximos"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>

        <CardHeader className="space-y-2 p-4 pb-2">
          <CardTitle className="text-base leading-tight md:text-lg">{project.title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
