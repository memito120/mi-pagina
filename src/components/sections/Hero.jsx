import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Briefcase, HandMetal } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDarkMode } from '../../hooks/useDarkMode';

export function Hero() {
	const { isDarkMode } = useDarkMode();

	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-10 md:pt-16">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />

			<div className="container mx-auto px-4 py-2">
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<p className="text-primary font-medium mb-3 text-lg text-center lg:text-left">Hola, soy</p>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight justify-between items-center flex-wrap text-center lg:text-left">
							Guillermo Delgado
						</h1>

						<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/80 text-center lg:text-left">
							Analista Programador
						</h2>

						{/* Badge inclusiva con implante coclear y LSCH */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="flex flex-wrap items-center gap-2 mb-6 justify-center lg:justify-start"
						>
							<Badge variant="secondary" className="text-sm px-3 py-1.5 flex items-center gap-2 bg-primary/10 hover:bg-primary/20 transition-colors">
								<img
									src={isDarkMode ? '/coclear-dark.svg' : '/coclear-normal.svg'}
									alt="Implante coclear"
									className="w-10"
								/>
								<span className="font-medium">Persona Sorda / Usuario de Implante Coclear</span>
							</Badge>
							<Badge variant="outline" className="text-sm px-3 py-1.5 flex items-center gap-2 border-primary/40">
								<HandMetal className="w-10" />
								<span className="font-medium">LSCH Nativa</span>
							</Badge>
						</motion.div>

						<p className="text-base md:text-lg text-center lg:text-left text-muted-foreground mb-8 leading-relaxed max-w-2xl">
							Especializado en crear experiencias web modernas, accesibles y fáciles de usar,
							utilizando React, con las últimas tecnologías del ecosistema JavaScript.
							Actualmente, también ofrezco servicios técnicos de mantenimiento y me desempeño
							como analista programador, brindando soporte IT para garantizar soluciones
							eficientes y confiables.
						</p>

						<div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
							<a className="inline-block">
								<Button size="lg" onClick={() => scrollToSection('services')}>
									<Briefcase className="h-4 w-4"/>
									Ver Servicios
								</Button>
							</a>
							<Button size="lg" variant="outline" onClick={() => scrollToSection('projects')}>
								Ver Proyectos
							</Button>
						</div>

						<div className="flex justify-center lg:justify-start items-center gap-3">
							<a
								href="https://github.com/memito120"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
								aria-label="Perfil de GitHub"
							>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="https://linkedin.com/in/guillermo-delgado-b200363b4"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
								aria-label="Perfil de LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="flex justify-center lg:justify-end"
					>
						<div className="w-[280px] sm:w-[340px] md:w-[380px] rounded-3xl border bg-card/70 backdrop-blur p-4 shadow-xl">
							<div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5]">
								<img
									src="/user.jpeg"
									alt="Imagen de perfil de Guillermo Delgado"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
