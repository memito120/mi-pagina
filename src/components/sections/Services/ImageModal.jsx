import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState, useRef} from 'react';
import { createPortal } from 'react-dom';

export function ImageModal({ images, initialIndex, onClose }) {

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 4;

	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const [zoom, setZoom] = useState(MIN_ZOOM);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isPanning, setIsPanning] = useState(false);

	const imageFrameRef = useRef(null);
	const dragStartRef = useRef(null);
	const pinchRef = useRef({ initialDistance: 0, initialZoom: MIN_ZOOM });
	const lastTapRef = useRef({ time: 0, x: 0, y: 0 });

	const clamp = useCallback((value, min, max) => Math.min(Math.max(value, min), max), []);

	const getClampedPan = useCallback((nextPan, currentZoom) => {
		if (!imageFrameRef.current || currentZoom <= MIN_ZOOM) {
			return { x: 0, y: 0 };
		}

		const frameRect = imageFrameRef.current.getBoundingClientRect();
		const maxX = ((currentZoom - 1) * frameRect.width) / 2;
		const maxY = ((currentZoom - 1) * frameRect.height) / 2;

		return {
			x: clamp(nextPan.x, -maxX, maxX),
			y: clamp(nextPan.y, -maxY, maxY),
		};
	}, [clamp]);

	const resetZoom = useCallback(() => {
		setZoom(MIN_ZOOM);
		setPan({ x: 0, y: 0 });
		setIsPanning(false);
		dragStartRef.current = null;
		pinchRef.current = { initialDistance: 0, initialZoom: MIN_ZOOM };
	}, []);

	const applyZoom = useCallback((nextZoom) => {
		setZoom((currentZoom) => {
			const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);

			setPan((currentPan) => getClampedPan(currentPan, clampedZoom));
			if (clampedZoom === MIN_ZOOM) {
				setPan({ x: 0, y: 0 });
			}

			return clampedZoom;
		});
	}, [clamp, getClampedPan]);

	const applyPan = useCallback((nextPan) => {
		setPan((currentPan) => getClampedPan(nextPan ?? currentPan, zoom));
	}, [getClampedPan, zoom]);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	}, [images.length]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	}, [images.length]);

	useEffect(() => {
		resetZoom();
	}, [currentIndex, resetZoom]);

	useEffect(() => {
		const previousOverflow = document.body.style.overflow;
		const previousTouchAction = document.body.style.touchAction;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
			if (zoom <= MIN_ZOOM && e.key === 'ArrowLeft') handlePrev();
			if (zoom <= MIN_ZOOM && e.key === 'ArrowRight') handleNext();
			if (e.key === '+' || e.key === '=') applyZoom(zoom + 0.25);
			if (e.key === '-') applyZoom(zoom - 0.25);
			if (e.key === '0') resetZoom();
		};

		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';
		document.body.style.touchAction = 'none';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = previousOverflow;
			document.body.style.touchAction = previousTouchAction;
		};
	}, [handleNext, handlePrev, onClose, applyZoom, resetZoom, zoom]);

	if (typeof document === 'undefined') {
		return null;
	}

	const handleImageDoubleClick = useCallback(() => {
		if (zoom > MIN_ZOOM) {
			resetZoom();
			return;
		}
		applyZoom(2);
	}, [applyZoom, resetZoom, zoom]);

	const handleWheelZoom = useCallback((e) => {
		
		const direction = e.deltaY > 0 ? -1 : 1;
		const step = 0.25;
		applyZoom(zoom + direction * step);
	}, [applyZoom, zoom]);

	const handleMouseDown = useCallback((e) => {
		if (zoom <= MIN_ZOOM || e.button !== 0) {
			return;
		}

		
		setIsPanning(true);
		dragStartRef.current = {
			x: e.clientX,
			y: e.clientY,
			originX: pan.x,
			originY: pan.y,
		};
	}, [pan.x, pan.y, zoom]);

	const handleTouchStart = useCallback((e) => {
		if (e.touches.length === 2) {
			const [a, b] = e.touches;
			const distance = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
			pinchRef.current = { initialDistance: distance, initialZoom: zoom };
			setIsPanning(false);
			return;
		}

		if (e.touches.length !== 1) {
			return;
		}

		const touch = e.touches[0];
		const now = Date.now();
		const delta = now - lastTapRef.current.time;
		const touchDistance = Math.hypot(touch.clientX - lastTapRef.current.x, touch.clientY - lastTapRef.current.y);

		if (delta < 280 && touchDistance < 22) {
			
			if (zoom > MIN_ZOOM) {
				resetZoom();
			} else {
				applyZoom(2);
			}
		}

		lastTapRef.current = { time: now, x: touch.clientX, y: touch.clientY };

		if (zoom > MIN_ZOOM) {
			dragStartRef.current = {
				x: touch.clientX,
				y: touch.clientY,
				originX: pan.x,
				originY: pan.y,
			};
			setIsPanning(true);
		}
	}, [applyZoom, pan.x, pan.y, resetZoom, zoom]);

	const handleTouchMove = useCallback((e) => {
		if (e.touches.length === 2) {
			
			const [a, b] = e.touches;
			const currentDistance = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
			if (!pinchRef.current.initialDistance) {
				pinchRef.current.initialDistance = currentDistance;
				pinchRef.current.initialZoom = zoom;
				return;
			}

			const ratio = currentDistance / pinchRef.current.initialDistance;
			applyZoom(pinchRef.current.initialZoom * ratio);
			return;
		}

		if (e.touches.length !== 1 || zoom <= MIN_ZOOM || !dragStartRef.current) {
			return;
		}

		
		const touch = e.touches[0];
		const deltaX = touch.clientX - dragStartRef.current.x;
		const deltaY = touch.clientY - dragStartRef.current.y;

		applyPan({
			x: dragStartRef.current.originX + deltaX,
			y: dragStartRef.current.originY + deltaY,
		});
	}, [applyPan, applyZoom, zoom]);

	const handleTouchEnd = useCallback(() => {
		if (pinchRef.current.initialDistance) {
			pinchRef.current = { initialDistance: 0, initialZoom: zoom };
		}

		setIsPanning(false);
		dragStartRef.current = null;
	}, [zoom]);

	useEffect(() => {
		if (!isPanning) {
			return;
		}

		const handleMouseMove = (e) => {
			if (!dragStartRef.current) {
				return;
			}

			
			const deltaX = e.clientX - dragStartRef.current.x;
			const deltaY = e.clientY - dragStartRef.current.y;

			applyPan({
				x: dragStartRef.current.originX + deltaX,
				y: dragStartRef.current.originY + deltaY,
			});
		};

		const stopPan = () => {
			setIsPanning(false);
			dragStartRef.current = null;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', stopPan);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', stopPan);
		};
	}, [applyPan, isPanning]);

	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
			onClick={onClose}
			role="dialog"
			aria-label="Galeria de imagenes"
			aria-modal="true"
		>
			<div
				className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-3 py-6 sm:px-6 md:px-8"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute right-3 top-3 z-20 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 sm:right-6 sm:top-6"
					aria-label="Cerrar galeria"
				>
					<X size={22} className="sm:h-7 sm:w-7" />
				</button>

				<div className="relative flex w-full flex-col items-center justify-center gap-3 sm:gap-4">
					<div className="relative w-full max-w-6xl rounded-xl bg-black/40 p-1 backdrop-blur-sm">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentIndex}
								initial={{ opacity: 0, scale: 0.97 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.97 }}
								transition={{ duration: 0.22 }}
								className="relative overflow-hidden rounded-lg"
							>
								<div
									ref={imageFrameRef}
									className="relative overflow-hidden"
									onWheel={handleWheelZoom}
									onDoubleClick={handleImageDoubleClick}
									onMouseDown={handleMouseDown}
									onTouchStart={handleTouchStart}
									onTouchMove={handleTouchMove}
									onTouchEnd={handleTouchEnd}
									onTouchCancel={handleTouchEnd}
									style={{ touchAction: zoom > MIN_ZOOM ? 'none' : 'manipulation' }}
								>
									<img
										src={images[currentIndex]}
										alt={`Imagen de servicio ${currentIndex + 1} de ${images.length}`}
										className={`mx-auto h-auto max-h-[70dvh] select-none w-full object-contain sm:max-h-[76dvh]`}
										loading="lazy"
										draggable={false}
										style={{
											transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
											transformOrigin: 'center center',
											transition: isPanning ? 'none' : 'transform 0.15s ease-out',
										}}
									/>
								</div>

								<div className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white sm:right-4 sm:top-4 sm:text-sm">
									{currentIndex + 1} / {images.length}
								</div>
								<div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-[11px] font-medium text-white sm:bottom-4 sm:left-4 sm:px-3 sm:text-xs">
									<button
										onClick={() => applyZoom(zoom - 0.25)}
										className="rounded-md bg-white/10 px-1.5 py-0.5 transition-colors hover:bg-white/20"
										aria-label="Reducir zoom"
									>
										-
									</button>
									<span>{Math.round(zoom * 100)}%</span>
									<button
										onClick={() => applyZoom(zoom + 0.25)}
										className="rounded-md bg-white/10 px-1.5 py-0.5 transition-colors hover:bg-white/20"
										aria-label="Aumentar zoom"
									>
										+
									</button>
									<button
										onClick={resetZoom}
										className="rounded-md bg-white/10 px-1.5 py-0.5 transition-colors hover:bg-white/20"
										aria-label="Restablecer zoom"
									>
										100%
									</button>
								</div>
							</motion.div>
						</AnimatePresence>

						{images.length > 1 && (
							<>
								<button
									onClick={handlePrev}
									disabled={zoom > MIN_ZOOM}
									className="absolute left-2 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black/90 md:left-4"
									aria-label="Imagen anterior"
								>
									<ChevronLeft size={20} className="md:h-6 md:w-6" />
								</button>
								<button
									onClick={handleNext}
									disabled={zoom > MIN_ZOOM}
									className="absolute right-2 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black/90 md:right-4"
									aria-label="Imagen siguiente"
								>
									<ChevronRight size={20} className="md:h-6 md:w-6" />
								</button>
							</>
						)}
					</div>

					{images.length > 1 && (
						<div className="hidden max-w-full flex-wrap justify-center gap-3 px-2 sm:flex">
							{images.map((img, index) => (
								<button
									key={index}
									onClick={() => setCurrentIndex(index)}
									className={`relative overflow-hidden rounded-lg transition-all flex-shrink-0 ${
										index === currentIndex ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-100'
									}`}
									aria-label={`Ver imagen ${index + 1}`}
									aria-current={index === currentIndex ? 'true' : 'false'}
								>
									<img src={img} alt="" className="w-12 h-12 md:w-16 md:h-16 object-cover" loading="lazy" />
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</motion.div>
		,
		document.body
	);
}
