import { motion } from 'framer-motion';
import { Briefcase, Github, HandMetal, Linkedin } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

export function HeroContent({ isDarkMode, onScrollToSection }) {
	return (
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

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
				className="flex flex-wrap items-center gap-2 mb-6 justify-center lg:justify-start"
			>
				<Badge
					variant="secondary"
					className="text-sm px-3 py-1.5 flex items-center gap-2 bg-primary/10 hover:bg-primary/20 transition-colors"
				>
					<img
						src={isDarkMode ? 'coclear-dark.svg' : 'coclear-normal.svg'}
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
				<Button size="lg" onClick={() => onScrollToSection('services')}>
					<Briefcase className="h-4 w-4" />
					Ver Servicios
				</Button>
				<Button size="lg" variant="outline" onClick={() => onScrollToSection('projects')}>
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
	);
}
