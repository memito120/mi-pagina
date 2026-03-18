import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Badge } from '../../ui/badge';

export function TecnoModal({ tecnos, onClose }) {
    const getTechName = (tech) => (typeof tech === 'string' ? tech : tech?.name ?? 'Tecnologia');

    const getIconSrc = (tech) => {
        if (typeof tech === 'string') {
            return '';
        }

        const icon = tech?.icon;
        if (!icon) {
            return '';
        }

        if (icon.startsWith('../src/')) {
            return icon.replace('../src/', '/src/').replace('../dist/', '/dist/').replace('../public/', '/public/');
        }

        return icon;
    };

    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-labelledby="tecnos-modal-title"
            aria-modal="true"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{scale:0.9, opacity: 0}}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-lg border bg-background p-6 shadow-xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 id="tecnos-modal-title" className="text-lg font-semibold">Tecnologias usadas</h3>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label="Cerrar modal de tecnologias usadas"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tecnos.map((tech, index) => {
                        const name = getTechName(tech);
                        const iconSrc = getIconSrc(tech);

                        return (
                        <Badge
                            key={`${name}-${index}`}
                            className="inline-flex items-center gap-1.5 border border-border/80 bg-muted text-xs text-foreground hover:bg-accent md:text-sm"
                        >
                            {iconSrc && (
                                <img
                                    src={iconSrc}
                                    alt={`Icono de ${name}`}
                                    className="h-12 w-12 object-contain"
                                    loading="lazy"
                                />
                            )}
                            <span>{name}</span>
                        </Badge>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}
