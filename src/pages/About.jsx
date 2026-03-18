import { motion } from 'framer-motion';
import { useEntity } from '../data/entities';
import { ValueSkeleton } from '../components/sections/Abouts/ValueSkeleton';
import { RenderAbout } from '../components/sections/Abouts/RenderAbout';

export function About() {

  const { data: values, loading } = useEntity('values');
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mí</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Descripción principal */}
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <motion.p
              className="text-lg text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Soy un analista programador con 1 año de experiencia en la creación de aplicaciones modernas y escalables. Me apasiona transformar ideas en experiencias digitales intuitivas.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Especializo en React y el ecosistema moderno de JavaScript, siempre busco implementar las mejores prácticas y tecnologías innovadoras.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Fuera del código, disfruto aprender nuevas herramientas, explorar metodologías ágiles y mejorar mis habilidades continuamente.
            </motion.p>
          </div>

          {/* Valores y principios */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-10">
              Mis Valores y Principios
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carga de datos con animación de entrada */}
              {loading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                      <ValueSkeleton key={i} />
                  ))}
                </>
              ) : (
                // Renderizado de valores y principios
                values?.map((value, index) => (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RenderAbout value={value} />
                  </motion.div>
                ))
              )}      
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}