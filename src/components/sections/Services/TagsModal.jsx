import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Badge } from '../../ui/badge';

export function TagsModal({ tags, onClose }) {
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
			aria-labelledby="tags-modal-title"
			aria-modal="true"
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-md rounded-lg border bg-background p-6 shadow-xl"
			>
				<div className="flex items-center justify-between mb-4">
					<h3 id="tags-modal-title" className="text-lg font-semibold">Todas las caracteristicas</h3>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors p-1"
						aria-label="Cerrar modal de caracteristicas"
					>
						<X size={20} />
					</button>
				</div>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Badge key={index} variant="secondary" className="text-sm px-3 py-1.5">
							{tag}
						</Badge>
					))}
				</div>
			</motion.div>
		</motion.div>,
		document.body
	);
}
