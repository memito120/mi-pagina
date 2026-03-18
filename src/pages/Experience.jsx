import { motion } from 'framer-motion';
import { Calendar, Briefcase, Clock3, MapPin } from 'lucide-react';
import { useEntity } from '../data/entities';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ExperienceSkeleton } from '../components/sections/Experiencies/ExperienceSkeleton';
import { formatDate, formatDateToDateTimeAttr, getDurationLabel } from '../lib/dateformat';

export function Experience() {
  const { data: experiences, loading } = useEntity('experiences');
  const hasExperiences = Array.isArray(experiences) && experiences.length > 0;
  const sortedExperiences = hasExperiences
    ? [...experiences].sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
    : [];

  return (
    <section id="experience" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiencia</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-balance">
              Trayectoria profesional con foco en resultados, soporte tecnico y desarrollo web aplicado a entornos reales.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <ExperienceSkeleton key={i} />
                ))}
              </>
            ) : !hasExperiences ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center">
                  <p className="text-base font-medium mb-2">Experiencia en actualizacion</p>
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    Estoy incorporando nuevas experiencias con impacto medible, stack utilizado y resultados por proyecto.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <ol aria-label="Timeline de experiencia profesional" className="space-y-8 md:space-y-10">
                {sortedExperiences.map((exp, index) => (
                <motion.li
                  key={exp.id}
                  className="relative list-none pl-9 md:pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-2.5 h-4 w-4 rounded-full bg-primary border-4 border-background z-10"
                    aria-hidden="true"
                  />
                  
                  {/* Timeline line */}
                  {index !== sortedExperiences.length - 1 && (
                    <div className="absolute left-[7px] md:left-[8px] top-6 w-0.5 h-[calc(100%+1.5rem)] md:h-[calc(100%+2rem)] bg-border" aria-hidden="true" />
                  )}

                  <Card className="transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-3 md:gap-4 flex-wrap">
                        <div className="flex-1">
                          <CardTitle className="text-lg md:text-xl mb-2 leading-tight">{exp.position}</CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Briefcase className="h-4 w-4" aria-hidden="true" />
                            <span className="font-medium">{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="text-border" aria-hidden="true">•</span>
                                <span className="inline-flex items-center gap-1 text-xs md:text-sm">
                                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                  {exp.location}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" aria-hidden="true" />
                            <span className="inline-flex items-center">
                              <time dateTime={formatDateToDateTimeAttr(exp.startDate)}>
                                {formatDate(exp.startDate)}
                              </time>
                              <span className="mx-1" aria-hidden="true">-</span>
                              <time dateTime={formatDateToDateTimeAttr(exp.endDate)}>
                                {formatDate(exp.endDate)}
                              </time>
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs md:text-sm">
                              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                              {getDurationLabel(exp.startDate, exp.endDate)}
                            </span>
                          </div>
                        </div>
                        {exp.endDate === null && (
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                            Actualidad
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">Resultados clave</h4>
                          <ul className="space-y-2" aria-label={`Resultados de ${exp.position}`}>
                            {exp.achievements.slice(0, 3).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                                <span className="mt-1 text-primary" aria-hidden="true">●</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.li>
                ))}
              </ol>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
