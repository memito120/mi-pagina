import { AnimatePresence, motion } from 'framer-motion';
import { Info, MapPin } from 'lucide-react';
import { useEntity } from '../data/entities';
import { useServicesModals } from '../hooks/useServicesModals';
import { ImageModal } from '../components/sections/Services/ImageModal';
import { ServiceCard } from '../components/sections/Services/ServiceCard';
import { ServiceSkeleton } from '../components/sections/Services/ServiceSkeleton';
import { TagsModal } from '../components/sections/Services/TagsModal';

export function Services() {
	const { data: services, loading } = useEntity('services');
	const {
		selectedImages,
		selectedImageIndex,
		showTagsModal,
		selectedTags,
		handleImageClick,
		closeImageModal,
		handleShowAllTags,
		closeTagsModal,
	} = useServicesModals();
	// El componente principal de la sección de servicios, que muestra una lista de servicios técnicos con soporte para modales de imágenes y etiquetas.
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
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Servicios Técnicos
							<span className="absolute translate-y-3 translate-x-6 items-center gap-1 text-xs md:text-sm text-muted-foreground hidden md:inline-flex">
								<MapPin className="h-5 w-5" aria-hidden="true" />
								La Serena, Región de Coquimbo
							</span>
						</h2>
						<div className="w-20 h-1 bg-primary mx-auto rounded-full" />
						<p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
							Soporte y mantenimiento de computación a domicilio, con diagnóstico y solución según la necesidad.
						</p>
						<span className="flex justify-center items-center gap-1 text-xs md:text-sm text-muted-foreground mt-2 md:hidden">
							<MapPin className="h-5 w-5" aria-hidden="true" />
							La Serena, Región de Coquimbo
						</span>
					</div>
					{/* Grid de servicios, que muestra un esqueleto de carga mientras se obtienen los datos y luego renderiza las tarjetas de servicio. */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
						{loading
							? [...Array(6)].map((_, index) => <ServiceSkeleton key={index} />)
							: services?.map((service, index) => (
								<ServiceCard
									key={service.id}
									service={service}
									index={index}
									onImageClick={handleImageClick}
									onShowAllTags={handleShowAllTags}
								/>
							))}
					</div>

					<div className="mt-12 text-center px-4">
						<div className="inline-flex items-start gap-2 text-xs md:text-sm text-muted-foreground max-w-3xl text-left md:text-center bg-muted/60 rounded-lg p-4">
							<Info size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
							<p>
								Los precios son referenciales y pueden variar segun la complejidad del trabajo,
								el estado del equipo y los materiales necesarios. Consulta para un presupuesto personalizado.
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			<AnimatePresence>
				{selectedImages && (
					<ImageModal images={selectedImages} initialIndex={selectedImageIndex} onClose={closeImageModal} />
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showTagsModal && <TagsModal tags={selectedTags} onClose={closeTagsModal} />}
			</AnimatePresence>
		</section>
	);
}
