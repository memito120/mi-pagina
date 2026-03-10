import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useEntity } from '../../lib/entities';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

function ServiceSkeleton() {
	return (
		<Card className="h-full">
			<Skeleton className="h-32 w-full rounded-t-lg" />
			<CardHeader>
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-4 w-1/2 mt-1" />
				<Skeleton className="h-4 w-full mt-2" />
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2 mb-4">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-24" />
				</div>
				<Skeleton className="h-8 w-32" />
			</CardContent>
			<CardFooter className="flex-col items-start gap-2">
				<Skeleton className="h-5 w-24" />
			</CardFooter>
		</Card>
	);
}

function ImageModal({ images, initialIndex, onClose }) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') handlePrev();
			if (e.key === 'ArrowRight') handleNext();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentIndex]);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
			onClick={onClose}
		>
			<div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
				{/* Botón de cierre */}
				<button
					onClick={onClose}
					className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
				>
					<X size={32} />
				</button>

				{/* Imagen principal con animación */}
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						className="relative bg-black rounded-lg overflow-hidden"
					>
						<img
							src={images[currentIndex]}
							alt={`Imagen ${currentIndex + 1}`}
							className="w-full h-auto max-h-[70vh] object-contain"
						/>

						{/* Contador */}
						<div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
							{currentIndex + 1} / {images.length}
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Navegación con flechas */}
				{images.length > 1 && (
					<>
						<button
							onClick={handlePrev}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={handleNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
						>
							<ChevronRight size={24} />
						</button>
					</>
				)}

				{/* Miniaturas */}
				{images.length > 1 && (
					<div className="flex gap-2 justify-center mt-4">
						{images.map((img, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`relative overflow-hidden rounded-lg transition-all ${
									index === currentIndex
										? 'ring-2 ring-primary scale-110'
										: 'opacity-60 hover:opacity-100'
								}`}
							>
								<img
									src={img}
									alt={`Miniatura ${index + 1}`}
									className="w-16 h-16 object-cover"
								/>
							</button>
						))}
					</div>
				)}
			</div>
		</motion.div>
	);
}

export function Services() {
	const { data: services, loading } = useEntity('services');
	const [selectedImages, setSelectedImages] = useState(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const handleImageClick = (images, index) => {
		setSelectedImages(images);
		setSelectedImageIndex(index);
	};

	const closeModal = () => {
		setSelectedImages(null);
		setSelectedImageIndex(0);
	};

	return (
		<section id="services" className="py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios Técnicos</h2>
						<div className="w-20 h-1 bg-primary mx-auto rounded-full" />
						<p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
							Soporte y mantenimiento de computación a domicilio, con diagnóstico y solución según la necesidad.
						</p>
					</div>

					{/* Grid responsivo: 1 col mobile, 2 tablet, 3 desktop */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
						{loading ? (
							[...Array(6)].map((_, index) => <ServiceSkeleton key={index} />)
						) : (
							services?.map((service, index) => (
								<motion.div
									key={service.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -4 }}
									className="h-full"
								>
									<Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300">
										{/* Galería de imágenes horizontal */}
										<div className="flex gap-1 h-32 overflow-hidden rounded-t-lg bg-muted">
											{service.images?.slice(0, 3).map((img, imgIndex) => (
												<div
													key={imgIndex}
													className={`relative overflow-hidden rounded-b-lg cursor-pointer group/img ${
														imgIndex === 0 ? 'flex-[2]' : 'flex-1'
													}`}
													onClick={() => handleImageClick(service.images, imgIndex)}
												>
													<img
														src={img}
														alt={`${service.title} - ${imgIndex + 1}`}
														className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
													/>
													<div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors" />
												</div>
											))}
										</div>

										<CardHeader className="pb-3">
											<CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
											<CardDescription className="text-xs font-medium">
												{service.subtitle}
											</CardDescription>
											<p className="text-sm text-muted-foreground mt-2">
												{service.description}
											</p>
										</CardHeader>

										<CardContent className="flex-1 space-y-4">
											<div className="flex flex-wrap gap-1.5">
												{service.tags.map((tag) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>

											{/* Precio formateado */}
											<div>
												<p className="text-2xl font-bold text-primary">
													${service.price.toLocaleString('es-CL')}
												</p>
												<p className="text-xs text-muted-foreground">{service.priceRange}</p>
											</div>

											{/* Duración */}
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<Clock size={16} />
												<span>{service.duration}</span>
											</div>
										</CardContent>

										<CardFooter className="pt-0">
											<p className="text-xs text-muted-foreground italic">{service.note}</p>
										</CardFooter>
									</Card>
								</motion.div>
							))
						)}
					</div>

					{/* Nota al pie */}
					<div className="mt-12 text-center">
						<p className="text-sm text-muted-foreground max-w-3xl mx-auto">
							* Los precios son referenciales y pueden variar según la complejidad del trabajo, 
							el estado del equipo y los materiales necesarios. Consulta para un presupuesto personalizado.
						</p>
					</div>
				</motion.div>
			</div>

			{/* Modal de imágenes */}
			<AnimatePresence>
				{selectedImages && (
					<ImageModal
						images={selectedImages}
						initialIndex={selectedImageIndex}
						onClose={closeModal}
					/>
				)}
			</AnimatePresence>
		</section>
	);
}
