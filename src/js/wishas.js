
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
    if (!wishasContainer) return;

    const form = wishasContainer.querySelector('form');
    if (!form) return;

    // ==========================================
    // 1. FORMULARIO DE CONFIRMACIÓN
    // ==========================================

    const attendanceSelect = form.querySelector('#status');
    const attendanceDetails = form.querySelector('#attendance-details');
    const adultsInput = form.querySelector('#adults');
    const childrenInput = form.querySelector('#children');
    const messageInput = form.querySelector('#message');

    const buttonForm = form.querySelector('button[type="submit"]');
    const originalButtonText = buttonForm.textContent;

    // Mostrar preguntas solo si el invitado asistirá
    const updateAttendanceFields = () => {

        const isAttending = attendanceSelect.value === 'y';

        if (attendanceDetails) {

            attendanceDetails.hidden = !isAttending;

        } else {

            // Compatibilidad con HTML anterior
            [adultsInput, childrenInput, messageInput].forEach((input) => {

                const label = form.querySelector(
                    `label[for="${input.id}"]`
                );

                input.hidden = !isAttending;

                if (label) {
                    label.hidden = !isAttending;
                }
            });
        }

        adultsInput.required = isAttending;
        childrenInput.required = isAttending;
    };

    attendanceSelect.addEventListener(
        'change',
        updateAttendanceFields
    );

    updateAttendanceFields();


    // ==========================================
    // 2. CONTENEDOR DE COMENTARIOS
    // ==========================================

    const commentsSection = wishasContainer.children[3];

    const [peopleComentar, , containerComentar] =
        commentsSection.children;

    // Mantener comentarios ocultos
    commentsSection.style.display = 'none';

    const pageNumber =
        commentsSection.querySelector('.page-number');

    const [prevButton, nextButton] =
        commentsSection.querySelectorAll('.button-grup button');


    // ==========================================
    // 3. INFORMACIÓN BANCARIA
    // ==========================================

    const listItemBank = (bank) => `
        <figure data-aos="zoom-in" data-aos-duration="1000">

            <img
                src="${bank.icon}"
                alt="Icono del banco"
            >

            <figcaption>
                No. de cuenta ${bank.rekening.slice(0, 4)}xxxx
                <br>
                A nombre de ${bank.name}
            </figcaption>

            <button
                type="button"
                data-rekening="${bank.rekening}"
                aria-label="Copiar número de cuenta"
            >
                Copiar número de cuenta
            </button>

        </figure>
    `;

    const initialBank = () => {

        const wishasBank = wishasContainer.children[1];
        const containerBank = wishasBank.children[2];

        renderElement(
            data.bank,
            containerBank,
            listItemBank
        );

        containerBank.querySelectorAll('button').forEach((button) => {

            button.addEventListener('click', async () => {

                try {

                    await navigator.clipboard.writeText(
                        button.dataset.rekening
                    );

                    button.textContent = 'Número copiado';

                } catch (error) {

                    console.error(
                        'Error al copiar el número de cuenta:',
                        error
                    );

                } finally {

                    setTimeout(() => {
                        button.textContent = 'Copiar número de cuenta';
                    }, 2000);
                }
            });
        });
    };


    // ==========================================
    // 4. MOSTRAR COMENTARIOS
    // ==========================================

    const listItemComentar = (comment) => {

        const name = formattedName(comment.name);
        const elapsed = formattedDate(comment.date);

        const date = elapsed.days < 1
            ? (
                elapsed.hours < 1
                    ? `${elapsed.minutes} minutos atrás`
                    : `${elapsed.hours} horas, ${elapsed.minutes} minutos atrás`
              )
            : `${elapsed.days} días, ${elapsed.hours} horas atrás`;

        return `
            <li data-aos="zoom-in" data-aos-duration="1000">

                <div style="background-color: ${comment.color}">
                    ${comment.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h4>${name}</h4>
                    <p>${date} <br>${comment.status}</p>
                    <p>${comment.message || ''}</p>
                </div>

            </li>
        `;
    };


    // ==========================================
    // 5. PAGINACIÓN DE COMENTARIOS
    // ==========================================

    let comments = [];
    let currentPage = 1;

    const itemsPerPage = 4;

    const renderCommentsPage = () => {

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        pageNumber.textContent = String(currentPage);

        renderElement(
            comments.slice(startIndex, endIndex),
            containerComentar,
            listItemComentar
        );
    };

    const initialComentar = async () => {

        containerComentar.innerHTML = '<p>Cargando...</p>';
        peopleComentar.textContent = '...';
        pageNumber.textContent = '..';

        try {

            const response = await comentarService.getComentar();

            comments = [
                ...(response.comentar || [])
            ].reverse();

            peopleComentar.textContent = comments.length
                ? `${comments.length} personas han participado`
                : 'Aún no hay comentarios';

            currentPage = 1;

            renderCommentsPage();

        } catch (error) {

            console.error(
                'Error al cargar comentarios:',
                error
            );

            containerComentar.innerHTML =
                '<p>No se pudieron cargar los comentarios.</p>';
        }
    };


    // Botón siguiente
    nextButton.addEventListener('click', () => {

        if (currentPage * itemsPerPage < comments.length) {

            currentPage++;

            renderCommentsPage();
        }
    });


    // Botón anterior
    prevButton.addEventListener('click', () => {

        if (currentPage > 1) {

            currentPage--;

            renderCommentsPage();
        }
    });


    // ==========================================
    // 6. ENVIAR CONFIRMACIÓN A GOOGLE SHEETS
    // ==========================================

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        if (buttonForm.disabled) return;

        const attendance = attendanceSelect.value;
        const isAttending = attendance === 'y';

        const confirmation = {

            id: generateRandomId(),

            name: form.elements
                .namedItem('name')
                .value.trim(),

            email: form.elements
                .namedItem('email')
                .value.trim(),

            status: isAttending
                ? 'Asistiré'
                : 'No podré asistir',

            adults: isAttending
                ? Number(adultsInput.value)
                : 0,

            children: isAttending
                ? Number(childrenInput.value)
                : 0,

            message: isAttending
                ? messageInput.value.trim()
                : '',

            date: getCurrentDateTime(),

            color: generateRandomColor()
        };


        // Desactivar botón durante el envío
        buttonForm.disabled = true;
        buttonForm.textContent = 'Enviando...';

        try {

            await comentarService.addComentar(confirmation);

            // Ocultar formulario
            form.style.display = 'none';

            // Mostrar agradecimiento
            form.insertAdjacentHTML('afterend', `
                <div
                    class="confirmation-message"
                    style="text-align:center; padding:30px 15px;"
                >
                    <h2>¡Muchas gracias!</h2>

                    <p>Hemos recibido tu respuesta.</p>

                    <p>
                        ${isAttending
                            ? '¡Nos hace mucha ilusión compartir este día contigo! ❤️'
                            : '¡Gracias por avisarnos! Te tendremos presente en este día tan especial. ❤️'
                        }
                    </p>
                </div>
            `);

        } catch (error) {

            console.error(
                'Error al enviar formulario:',
                error
            );

            alert(
                'No se pudo enviar tu confirmación. Por favor, inténtalo nuevamente.'
            );

            buttonForm.disabled = false;
            buttonForm.textContent = originalButtonText;
        }
    });


    // ==========================================
    // 7. INICIALIZACIÓN
    // ==========================================

    initialBank();

    // Los comentarios permanecen ocultos.
    // Para mostrarlos posteriormente:
    // commentsSection.style.display = '';
    // initialComentar();

};
