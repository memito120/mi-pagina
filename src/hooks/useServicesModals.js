import { useCallback, useState } from 'react';

// Hook personalizado para gestionar el estado de los modales de imágenes y etiquetas en la sección de servicios. 
// Proporciona funciones para abrir y cerrar ambos modales, así como para almacenar la información relevante (imágenes seleccionadas, índice de imagen actual, etiquetas seleccionadas).
export function useServicesModals() {
	const [selectedImages, setSelectedImages] = useState(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [showTagsModal, setShowTagsModal] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);

	const handleImageClick = useCallback((images, index = 0) => {
		setSelectedImages(images);
		setSelectedImageIndex(index);
	}, []);

	const closeImageModal = useCallback(() => {
		setSelectedImages(null);
		setSelectedImageIndex(0);
	}, []);

	const handleShowAllTags = useCallback((tags) => {
		setSelectedTags(tags);
		setShowTagsModal(true);
	}, []);

	const closeTagsModal = useCallback(() => {
		setShowTagsModal(false);
		setSelectedTags([]);
	}, []);

    // Retorna el estado y las funciones para gestionar los modales, 
    // que pueden ser utilizados en el componente Services para controlar la visualización de las imágenes y etiquetas.
	return {
		selectedImages,
		selectedImageIndex,
		showTagsModal,
		selectedTags,
		handleImageClick,
		closeImageModal,
		handleShowAllTags,
		closeTagsModal,
	};
}
