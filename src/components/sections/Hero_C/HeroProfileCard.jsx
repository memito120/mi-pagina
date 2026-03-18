import { motion } from 'framer-motion';

export function HeroProfileCard() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }} 
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			className="flex justify-center lg:justify-end"
		>
			<div className="w-[300px] sm:w-[340px] md:w-[380px] rounded-3xl p-6">
				<div className="relative rounded-2xl overflow-hidden">
					<img
						src="/user.jpeg"
						alt="Imagen de perfil de Guillermo Delgado"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</motion.div>
	);
}
