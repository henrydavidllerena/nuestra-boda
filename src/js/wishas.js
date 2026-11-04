
import {
    formattedDate,
    formattedName,
    generateRandomColor,
    generateRandomId,
    getCurrentDateTime,
    renderElement
} from "../utils/helper.js";

import { data } from "../assets/data/data.js";
import { comentarService } from "../services/comentarService.js";

export const wishas = () => {

    const wishasContainer = document.querySelector('.wishas');
    const form = wishasContainer.querySelector('form');
    wishasContainer.children[3].style.display = 'none'; 

    const [peopleComentar, ___, containerComentar] =
        wishasContainer.children[3].children;

    const buttonForm = form.querySelector('button[type="submit"]');
    const originalButtonText = buttonForm.textContent;

    const pageNumber = wishasContainer.querySelector('.page-number');

    const [prevButton, nextButton] =
        wishasContainer.querySelectorAll('.button-grup button');

    // Mostrar bancos
    const listItemBank = (data) => (
        `<figure data-aos="zoom-in" data-aos-duration="1000">
            <img src="${data.icon}" alt="bank icon animation">
            <figcaption>
                No. Rekening ${data.rekening.slice(0, 4)}xxxx
                <br>A.n ${data.name}
            </figcaption>
            <button data-rekening="${data.rekening}" aria-label="copy rekening">
                Salin No. Rekening
            </button>
        </figure>`
    );

    const initialBank = () => {

        const wishasBank = wishasContainer.children[1];
        const [_, __, containerBank] = wishasBank.children;

        renderElement(data.bank, containerBank, listItemBank);

        containerBank.querySelectorAll('button').forEach((button) => {

            button.addEventListener('click', async (e) => {

                const rekening = e.currentTarget.dataset.rekening;

                try {
                    await navigator.clipboard.writeText(rekening);
                    button.textContent = 'Berhasil menyalin';

                } catch (error) {
                    console.log(`Error: ${error.message}`);

                } finally {
                    setTimeout(() => {
                        button.textContent = 'Salin No. Rekening';
                    }, 2000);
                }
            });
        });
    };

    // Mostrar comentarios
    const listItemComentar = (data) => {

        const name = formattedName(data.name);
        const newDate = formattedDate(data.date);

        let date = "";

        if (newDate.days < 1) {

            if (newDate.hours < 1) {
                date = `${newDate.minutes} minutos atrás`;
            } else {
                date = `${newDate.hours} horas, ${newDate.minutes} minutos atrás`;
            }

        } else {
            date = `${newDate.days} días, ${newDate.hours} horas atrás`;
        }

        return `
            <li data-aos="zoom-in" data-aos-duration="1000">
                <div style="background-color: ${data.color}">
                    ${data.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h4>${name}</h4>
                    <p>${date} <br>${data.status}</p>
                    <p>${data.message || ''}</p>
                </div>
            </li>
        `;
    };

    let lengthComentar = 0;

    // Cargar comentarios iniciales
    const initialComentar = async () => {

        containerComentar.innerHTML =
            `<h1 style="font-size: 1rem; margin: auto">Cargando...</h1>`;

        peopleComentar.textContent = '...';
        pageNumber.textContent = '..';

        try {

            const response = await comentarService.getComentar();
            const comentar = response.comentar || [];

            lengthComentar = comentar.length;

            comentar.reverse();

            if (comentar.length > 0) {
                peopleComentar.textContent =
                    `${comentar.length} personas han participado`;
            } else {
                peopleComentar.textContent = 'Aún no hay comentarios';
            }

            pageNumber.textContent = '1';

            renderElement(
                comentar.slice(startIndex, endIndex),
                containerComentar,
                listItemComentar
            );

        } catch (error) {

            console.error('Error al cargar comentarios:', error);

            containerComentar.innerHTML =
                '<p>No se pudieron cargar los comentarios.</p>';
        }
    };

    // Enviar formulario
    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        buttonForm.disabled = true;
        buttonForm.textContent = 'Enviando...';

        const name = form.elements.namedItem('name').value.trim();
        const email = form.elements.namedItem('email').value.trim();
        const attendance = form.elements.namedItem('status').value;

        const adultsInput = form.elements.namedItem('adults');
        const childrenInput = form.elements.namedItem('children');

        const adults = attendance === 'y'
            ? Number(adultsInput.value)
            : 0;

        const children = attendance === 'y'
            ? Number(childrenInput.value)
            : 0;

        // Datos que se enviarán a Google Sheets
        const comentar = {

            id: generateRandomId(),

            name: name,

            email: email,

            status: attendance === 'y'
                ? 'Asistiré'
                : 'No podré asistir',

            adults: adults,

            children: children,

            message: form.elements.namedItem('message').value.trim(),

            date: getCurrentDateTime(),

            color: generateRandomColor()
        };

   try{     
try {
    await comentarService.addComentar(comentar);

    // Ocultar formulario después del envío
    form.style.display = 'none';

    // Mostrar mensaje de agradecimiento
    form.insertAdjacentHTML('afterend', `
        <div class="confirmation-message" style="
            text-align: center;
            padding: 30px 15px;
        ">
            <h2>¡Muchas gracias!</h2>
            <p>Hemos recibido tu confirmación.</p>
            <p>¡Nos hace mucha ilusión compartir este día contigo! ❤️</p>
        </div>
    `);

} catch (error) {
    console.error('Error al enviar formulario:', error);
    alert('No se pudo enviar tu confirmación. Por favor, inténtalo nuevamente.');
} finally {
    buttonForm.disabled = false;
    setTimeout(() => {
        buttonForm.textContent = originalButtonText;
    }, 2500);
}}
    catch (error) {

            console.error('Error al enviar formulario:', error);

            alert(
                'No se pudo enviar tu confirmación. Por favor, inténtalo nuevamente.'
            );

        } finally {

            buttonForm.disabled = false;

            setTimeout(() => {
                buttonForm.textContent = originalButtonText;
            }, 2500);
        }
    });

    // Paginación
    let currentPage = 1;
    let itemsPerPage = 4;
    let startIndex = 0;
    let endIndex = itemsPerPage;

    const updatePageContent = async () => {

        containerComentar.innerHTML =
            '<h1 style="font-size: 1rem; margin: auto">Cargando...</h1>';

        pageNumber.textContent = '..';

        prevButton.disabled = true;
        nextButton.disabled = true;

        try {

            const response = await comentarService.getComentar();
            const comentar = response.comentar || [];

            comentar.reverse();

            renderElement(
                comentar.slice(startIndex, endIndex),
                containerComentar,
                listItemComentar
            );

            pageNumber.textContent = currentPage.toString();

        } catch (error) {

            console.error('Error al actualizar comentarios:', error);

        } finally {

            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    };

    nextButton.addEventListener('click', async () => {

        if (endIndex < lengthComentar) {

            currentPage++;

            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;

            await updatePageContent();
        }
    });

    prevButton.addEventListener('click', async () => {

        if (currentPage > 1) {

            currentPage--;

            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;

            await updatePageContent();
        }
    });

   
    initialBank();
};
