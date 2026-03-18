import { HeroContent } from './HeroContent';
import { HeroProfileCard } from './HeroProfileCard';
import { useDarkMode } from '../../../hooks/useDarkMode';

export function RenderHero() {
	const { isDarkMode } = useDarkMode();

	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-10 md:pt-16">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10" />

			<div className="container mx-auto px-4 py-2">
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
					<HeroContent isDarkMode={isDarkMode} onScrollToSection={scrollToSection} />
					<HeroProfileCard />
				</div>
			</div>
		</section>
	);
}
