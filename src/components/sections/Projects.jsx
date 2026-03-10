import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useEntity } from '../../lib/entities';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function ProjectSkeleton() {
  return (
    <Card className="h-full">
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  const { data: projects, loading } = useEntity('projects');

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyectos Destacados</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Una selección de mis proyectos destacados durante mi carrera.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {loading ? (
              [...Array(4)].map((_, index) => <ProjectSkeleton key={index} />)
            ) : (
              projects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col group hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg h-48 bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="gap-2 flex-wrap">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[130px]">
                          <Button className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[130px]">
                          <Button variant="outline" className="w-full">
                            <Github className="h-4 w-4 mr-2" />
                            Código
                          </Button>
                        </a>
                      )}
                    </CardFooter>
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