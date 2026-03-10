import { motion } from 'framer-motion';
import { Code2, Lightbulb, Target, Zap, Pencil, Accessibility } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const values = [
  {
    icon: Accessibility,
    title: "Accesibilidad e Inclusión",
    description: "Como persona sorda con implante coclear y usuario de LSCH nativa, me comprometo a crear experiencias digitales accesibles para todos, sin barreras.",
    highlighted: true
  },
  {
    icon: Code2,
    title: "Código rápido y legible",
    description: "Me esfuerzo por escribir código limpio, eficiente y fácil de mantener, siguiendo las mejores prácticas de la industria."
  },
  {
    icon: Zap,
    title: "Rendimiento",
    description: "Optimizo cada aspecto para garantizar experiencias web rápidas y fluidas."
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Siempre busco nuevas tecnologías y enfoques para resolver problemas de manera creativa."
  },
  {
    icon: Target,
    title: "Enfoque en Objetivos",
    description: "Me concentro en entregar soluciones que cumplan los objetivos del negocio y del usuario."
  },
  {
    icon: Pencil,
    title: "Aprendizaje Continuo",
    description: "Sigo aprendiendo y mejorando mis habilidades para ofrecer lo mejor en cada proyecto."
  },

];

export function About() {
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
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full hover:shadow-lg transition-shadow duration-300 group ${
                    value.highlighted ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg transition-colors ${
                          value.highlighted
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                        }`}>
                          <value.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2 text-lg">{value.title}</h4>
                          <p className="text-sm text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
