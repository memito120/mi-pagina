import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Images } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

export function ProjectCard({ project, index, onImageClick, onShowAllTecno }) {
    const [expanded, setExpanded] = useState(false);
    const MAX_VISIBLE_TAGS = 3;
    const visibleTags = project.technologies.slice(0, MAX_VISIBLE_TAGS);
    const remainingTagsCount = project.technologies.length - MAX_VISIBLE_TAGS;
    const isLongDescription = project.description.length > 90;
    const displayDescription = expanded || !isLongDescription ? project.description : project.description.slice(0, 90) + '...';
    const getTechName = (tech) => (typeof tech === 'string' ? tech : tech?.name ?? 'Tecnologia');
    const getIconSrc = (tech) => {
        if (typeof tech === 'string') {
            return '';
        }

        const icon = tech?.icon;
        if (!icon) {
            return '';
        }
        return icon;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className='h-full'
        >   
            {/* Tarjeta individual de proyecto, que muestra una imagen destacada, el título, una descripción breve y las tecnologías utilizadas, con soporte para expandir la descripción y mostrar todas las tecnologías. */}
            <Card className="group h-full overflow-hidden border-border/70 bg-card/85 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl dark:ring-white/10">
                <div
                    className="relative aspect-video w-full overflow-hidden bg-muted cursor-pointer group"
                    onClick={() => onImageClick(project.images, 0, project.title)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver galeria de imagenes de ${project.title}`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onImageClick(project.images, 0, project.title);
                        }
                    }}
                >
                    <img
                        src={project.images[0]}
                        alt={`Imagen de ${project.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {project.images.length > 1 && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />}
                    {project.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white shadow-sm">
                            <span>+{project.images.length - 1}</span>
                            <span className="hidden sm:inline"> Ver mas fotos de proyecto</span>
                        </div>
                    )}
                </div>
                
                <CardHeader className="space-y-2 p-4 pb-2">
                    <CardTitle className="text-base leading-tight md:text-lg">{project.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                    <div className='text-sm text-muted-foreground'>
                        <p id={`description-${project.id}`}>{displayDescription}</p>
                        {isLongDescription && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className='text-primary hover:underline text-xs mt-1 flex items-center gap-1 font-medium'
                                aria-expanded={expanded}
                                aria-controls={`description-${project.id}`}
                                aria-label={expanded ? 'Mostrar menos descripción' : 'Leer más descripción'}
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

        
                    {/* Etiquetas de tecnologías utilizadas en el proyecto, con un botón para mostrar todas las tecnologías si hay más de 3. */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                        {!visibleTags.length && (
                            <Badge className="border-border bg-muted text-foreground">Sin tecnologias especificadas</Badge>
                        )}
                        {visibleTags.map((tech, idx) => {
                            const name = getTechName(tech);
                            const iconSrc = getIconSrc(tech);

                            return (
                            <Badge
                                key={`${name}-${idx}`}
                                className="inline-flex items-center gap-1.5 border border-border/80 bg-muted text-xs text-foreground hover:bg-accent md:text-sm"
                            >
                                {iconSrc && (
                                    <img
                                        src={iconSrc}
                                        alt={`Icono de ${name}`}
                                        className="h-5 w-5 object-contain"
                                        loading="lazy"
                                    />
                                )}
                                <span>{name}</span>
                            </Badge>
                            );
                        })}
                        {remainingTagsCount > 0 && (
                            <button
                                onClick={() => onShowAllTecno(project.technologies)}
                                className="inline-flex items-center rounded-full border border-border/80 bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                                aria-label={`Ver ${remainingTagsCount} tecnologías más utilizadas en el proyecto`}
                            >
                                +{remainingTagsCount}
                            </button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
