import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send ,Instagram,MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente o quieres colaborar? ¡Hablemos!
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-6 text-center"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contáctame directamente</h3>
                <p className="text-muted-foreground mb-6 max-w-lg">
                  Estoy siempre abierto a discutir nuevos proyectos, ideas creativas
                  u oportunidades de colaboración. No dudes en ponerte en contacto.
                </p>
              </div>

              {/* Enlaces directos (cards centrados) */}
              <div className="space-y-3 flex flex-col items-center w-full">
                <Card className="w-full max-w-md hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <a
                      href="mailto:guilledelgaditob@gmail.com"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">guilledelgaditob@gmail.com</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="w-full max-w-md hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <a
                      href="https://linkedin.com/in/guillermo-delgado-b200363b4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">LinkedIn</h4>
                        <p className="text-sm text-muted-foreground">linkedin.com/in/guillermo-delgado-b200363b4</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="w-full max-w-md hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <a
                      href="https://github.com/memito120"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Github className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">GitHub</h4>
                        <p className="text-sm text-muted-foreground">github.com/memito120</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
                <Card className="w-full max-w-md hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <a
                      href="https://www.instagram.com/memito_boi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Instagram className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Instagram</h4>
                        <p className="text-sm text-muted-foreground">instagram.com/memito_boi</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
                <Card className="w-full max-w-md hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <a
                      href="https://wa.me/56944675550"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Whatsapp</h4>
                        <p className="text-sm text-muted-foreground">wa.me/56944675550</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Formulario de contacto cerrado*/}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-12"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-center">Envíame un mensaje</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-lg mx-auto">
                  Formulario en desarrollo... Los campos están deshabilitados temporalmente.
                </p>
              </div>

              <div className="w-full max-w-md">
                <Card className="w-full max-w-md mx-auto hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nombre</label>
                        <Input placeholder="Tu nombre" disabled />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input type="email" placeholder="tu@correo.com" disabled />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Mensaje</label>
                        <Textarea placeholder="Escribe tu mensaje..." disabled />
                      </div>

                      <div className="pt-2">
                        <Button type="submit" disabled className="w-full justify-center">
                          <Send className="h-4 w-4" />
                          <span>Enviar (en desarrollo)</span>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
