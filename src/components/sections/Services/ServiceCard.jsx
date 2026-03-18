import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';



export function ServiceCard({ service, index, onImageClick, onShowAllTags }) {
	const [expanded, setExpanded] = useState(false);
	const MAX_VISIBLE_TAGS = 3;
	const visibleTags = service.tags.slice(0, MAX_VISIBLE_TAGS);
	const remainingTagsCount = service.tags.length - MAX_VISIBLE_TAGS;
	const isLongDescription = service.description.length > 90;
	const displayDescription = expanded || !isLongDescription ? service.description : service.description.slice(0, 90) + '...';

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.1 }}
			whileHover={{ y: -4 }}
			className="h-full"
		>
			<Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden">
				<div
					className="relative aspect-video w-full overflow-hidden bg-muted cursor-pointer group"
					onClick={() => onImageClick(service.images, 0)}
					role="button"
					tabIndex={0}
					aria-label={`Ver galeria de imagenes de ${service.title}`}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							onImageClick(service.images, 0);
						}
					}}
				>
					<img
						src={service.images[0]}
						alt={`${service.title} - Imagen principal`}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						loading="lazy"
					/>
					{service.images.length > 1 && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}
					{service.images.length > 1 && (
						<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
							<span>+{service.images.length - 1}</span>
							<span className="hidden sm:inline">Ver fotos</span>
						</div>
					)}
				</div>

				<CardHeader className="pb-3 space-y-2">
					<CardTitle className="text-lg md:text-xl leading-tight font-semibold">{service.title}</CardTitle>
					<CardDescription className="text-xs md:text-sm font-medium line-clamp-1 -">{service.subtitle}</CardDescription>
				</CardHeader>

				<CardContent className="flex-1 space-y-4">
					<div className="text-sm text-muted-foreground">
						<p>{displayDescription}</p>
						{isLongDescription && (
							<button
								onClick={() => setExpanded(!expanded)}
								className="text-primary hover:underline text-xs mt-1 flex items-center gap-1 font-medium"
								aria-expanded={expanded}
								aria-controls={`description-${service.id}`}
								aria-label={expanded ? 'Ver menos descripción' : 'Leer más descripción'}
							>
								{expanded ? (
									<>
										<span>Ver menos</span>
										<ChevronUp size={14} />
									</>
								) : (
									<>
										<span>Leer más</span>
										<ChevronDown size={14} />
									</>
								)}
							</button>
						)}
					</div>

					<div className="flex flex-wrap gap-1.5 items-center">
						{visibleTags.map((tag, i) => (
							<Badge key={i} variant="secondary" className="text-xs px-3 py-1">
								{tag}
							</Badge>
						))}
						{remainingTagsCount > 0 && (
							<button
								onClick={() => onShowAllTags(service.tags)}
								className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium"
								aria-label={`Ver ${remainingTagsCount} características más`}
							>
								+{remainingTagsCount}
							</button>
						)}
					</div>

					<div className="pt-2 border-t">
						<p className="text-2xl md:text-3xl font-extrabold text-primary">
							{typeof service.price === 'number' ? `$${service.price.toLocaleString('es-CL')}` : service.price}
						</p>
						<p className="text-xs text-muted-foreground mt-1">{service.priceRange}</p>
					</div>

					{service.duration && (
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Clock size={16} aria-hidden="true" />
							<span>{service.duration}</span>
						</div>
					)}
				</CardContent>

				<CardFooter className="pt-0 flex-col gap-3">
					{service.note && (
						<div className="flex items-start gap-2 text-xs text-muted-foreground">
							<Info size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
							<p className="italic">{service.note}</p>
						</div>
					)}
				</CardFooter>
			</Card>
		</motion.div>
	);
}
