
import { data } from "../assets/data/data.js";

export const galeri = async () => {

    const galeriElement = document.querySelector('.galeri');
    if (!galeriElement) return;

    const container = galeriElement.querySelector('.container');
    const figureElement = container.querySelector('figure');
    const paginationElement = container.querySelector('ul');

    const [prevButton, nextButton, showAllButton] =
        container.querySelectorAll('button');

    const showAllContainer =
        galeriElement.querySelector(':scope > div:nth-of-type(2)');

    const showAllBox =
        showAllContainer.querySelector('div');

    const closeButton =
        showAllContainer.querySelector('button');

    // Comprobar si una fotografía existe
    const checkImage = (item) => {

        return new Promise((resolve) => {

            const img = new Image();

            img.onload = () => resolve(item);
            img.onerror = () => resolve(null);

            img.src = item.image;
        });
    };

    // Cargar solamente las fotografías existentes
    const results = await Promise.all(
        data.galeri.map(checkImage)
    );

    const photos = results
        .filter(Boolean)
        .map((item, index) => ({
            ...item,
            id: index + 1
        }));

    if (photos.length === 0) {
        figureElement.innerHTML =
            '<p>Pronto compartiremos nuestras fotografías ❤️</p>';

        prevButton.hidden = true;
        nextButton.hidden = true;
        showAllButton.hidden = true;
        return;
    }

    let currentIndex = 0;

    // Mostrar fotografía
    const showPhoto = (index) => {

        currentIndex =
            (index + photos.length) % photos.length;

        const photo = photos[currentIndex];

        figureElement.innerHTML = `
            <img
                src="${photo.image}"
                alt="Fotografía ${currentIndex + 1}"
            >
        `;

        // Actualizar paginación
        paginationElement.querySelectorAll('li').forEach(
            (li, i) => {
                li.classList.toggle(
                    'active',
                    i === currentIndex
                );
            }
        );
    };

    // Crear paginación
    paginationElement.innerHTML = photos.map(
        (_, index) => `
            <li data-index="${index}"></li>
        `
    ).join('');

    paginationElement.querySelectorAll('li').forEach(
        (li) => {

            li.addEventListener('click', () => {
                showPhoto(Number(li.dataset.index));
            });
        }
    );

    // Botón siguiente
    nextButton.addEventListener('click', () => {
        showPhoto(currentIndex + 1);
    });

    // Botón anterior
    prevButton.addEventListener('click', () => {
        showPhoto(currentIndex - 1);
    });

    // Ver todas las fotografías
    showAllButton.addEventListener('click', () => {

        showAllBox.innerHTML = photos.map(
            (photo, index) => `
                <img
                    src="${photo.image}"
                    alt="Fotografía ${index + 1}"
                    loading="lazy"
                >
            `
        ).join('');

        showAllContainer.classList.add('active');
    });

    // Cerrar galería
    closeButton.addEventListener('click', () => {

        showAllBox.innerHTML = '';
        showAllContainer.classList.remove('active');
    });

    // Primera fotografía
    showPhoto(0);

    // Reproducción automática
    if (photos.length > 1) {
        setInterval(() => {
            if (!showAllContainer.classList.contains('active')) {
                showPhoto(currentIndex + 1);
            }
        }, 3000);
    }
};
