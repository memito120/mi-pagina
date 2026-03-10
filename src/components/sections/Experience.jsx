import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';
import { useEntity } from '../../lib/entities';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function ExperienceSkeleton() {
  return (
    <div className="relative pl-8 pb-12">
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-muted" />
      <div className="absolute left-[7px] top-6 w-0.5 h-full bg-muted" />
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-5 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return 'Actualidad';
  const [year, month] = dateString.split('-');
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export function Experience() {
  const { data: experiences, loading } = useEntity('experiences');

  return (
    <section id="experience" className="py-20">
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
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Mi trayectoria profesional en el desarrollo de software, destacando roles, responsabilidades y logros clave.
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
            ) : (
              experiences?.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative pl-8 pb-12 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
                  
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-[7px] top-6 w-0.5 h-full bg-border" />
                  )}

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{exp.position}</CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                        {exp.endDate === null && (
                          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            Actualidad
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Logros principales:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">▪</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
