import { AnimatePresence, motion } from 'framer-motion';
import { useEntity } from '../data/entities';
import { useProjectsModals } from '../hooks/useProjectsModal';
import { ProjectCard } from '../components/sections/Projects_C/ProjectCard';
import { ProjectSkeleton } from '../components/sections/Projects_C/ProjectSkeleton';
import { ImageModal } from '../components/sections/Projects_C/ImageModal'
import { TecnoModal } from '../components/sections/Projects_C/TecnoModal';
import { ComingSoonCard } from '../components/sections/Projects_C/ComingSoonCard';


export function Projects() {
  const { data: projects, loading } = useEntity('projects');
  const {
    selectedImages,
    selectedImageIndex,
    selectedImageTitle,
    showTecnoModal,
    selectedTecno,
    handleImageClick,
    closeImageModal,
    handleShowAllTecno,
    closeTecnoModal
  } = useProjectsModals();

  // El componente principal de la sección de proyectos, que muestra una lista de proyectos destacados con soporte para modales de imágenes y etiquetas.

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
            {loading
              ? [...Array(4)].map((_, index) => <ProjectSkeleton key={index} />)
              : projects?.map((project, index) => (
                project.comingSoon ? (
                  <ComingSoonCard key={project.id ?? `coming-${index}`} project={project} index={index} />
                ) : (
                  <ProjectCard
                    key={project.id ?? `${project.title}-${index}`}
                    project={project}
                    index={index}
                    onImageClick={handleImageClick}
                    onShowAllTecno={handleShowAllTecno}
                  />
                )
              ))
            }
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {selectedImages && (
          <ImageModal
            images={selectedImages}
            initialIndex={selectedImageIndex}
            title={selectedImageTitle}
            onClose={closeImageModal}
          />
        )}
        {showTecnoModal && (
          <TecnoModal
            tecnos={selectedTecno}
            onClose={closeTecnoModal}
            isOpen={showTecnoModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
