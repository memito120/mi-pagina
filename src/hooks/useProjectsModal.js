import { useCallback, useState } from 'react';

// Este hook personalizado, useProjectsModals, se encarga de gestionar el estado y las funciones relacionadas con los modales de imágenes y etiquetas en la sección de proyectos. Proporciona funciones para abrir y cerrar los modales, así como para manejar la selección de imágenes y etiquetas, lo que facilita la gestión de estos elementos en el componente Projects.
//Proporciona un conjunto de estados y funciones para controlar la visualización de las imágenes y etiquetas en los proyectos, permitiendo una experiencia de usuario más interactiva y dinámica al mostrar los detalles de cada proyecto.

export function useProjectsModals() {
    const [selectedImages, setSelectedImages] = useState(null);
        const [selectedImageIndex, setSelectedImageIndex] = useState(0);
        const [selectedImageTitle, setSelectedImageTitle] = useState('Galeria de proyecto');
        const [showTecnoModal, setShowTecnoModal] = useState(false);
        const [selectedTecno, setSelectedTecno] = useState([]);
    
        const handleImageClick = useCallback((images, index = 0, title = 'Galeria de proyecto') => {
            setSelectedImages(images);
            setSelectedImageIndex(index);
            setSelectedImageTitle(title);
        }, []);
    
        const closeImageModal = useCallback(() => {
            setSelectedImages(null);
            setSelectedImageIndex(0);
            setSelectedImageTitle('Galeria de proyecto');
        }, []);
    
        const handleShowAllTecno = useCallback((tecnos) => {
            setSelectedTecno(tecnos);
            setShowTecnoModal(true);
        }, []);
    
        const closeTecnoModal = useCallback(() => {
            setShowTecnoModal(false);
            setSelectedTecno([]);
        }, []);
    
        // Retorna el estado y las funciones para gestionar los modales, 
        // que pueden ser utilizados en el componente Projects para controlar la visualización de las imágenes y etiquetas.
        return {
            selectedImages,
            selectedImageIndex,
            selectedImageTitle,
            showTecnoModal,
            selectedTecno,
            handleImageClick,
            closeImageModal,
            handleShowAllTecno,
            closeTecnoModal,
        };
    }
  