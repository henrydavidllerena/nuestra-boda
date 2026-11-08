
import { data } from "../assets/data/data.js";

export const time = () => {

    const timeContainer = document.querySelector('.time');

    const [marriageDiv, receptionDiv] =
        timeContainer.querySelectorAll('div div');

    // Crear las tarjetas de cada evento
    const createTimeListItem = (title, details, address, mapUrl) => `
        <h3>${title}</h3>

        <p>
            ${details.day}, ${details.date} ${details.month} ${details.year}
            <br>
            A las ${details.hours.start}
        </p>

        <p class="event-address">
            <i class="bx bx-map-pin"></i>
            ${address}
        </p>

        <a
            class="event-map"
            href="${mapUrl}"
            target="_blank"
            rel="noopener noreferrer"
        >
            <i class="bx bx-map-alt"></i>
            Cómo llegar
        </a>
    `;

    // CEREMONIA
    marriageDiv.innerHTML = createTimeListItem(
        'Iglesia de la Paz',
        data.time.marriage,
        data.time.marriageAddress,
        data.link.marriageMap
    );

    // RECEPCIÓN
    receptionDiv.innerHTML = createTimeListItem(
        'Hotel Quito',
        data.time.reception,
        data.time.receptionAddress,
        data.link.receptionMap
    );

    // Ocultar el enlace y dirección antiguos
    const oldMapLink = timeContainer.querySelector(':scope > a');
    const oldAddress = timeContainer.querySelector(':scope > a + p');

    if (oldMapLink) oldMapLink.remove();
    if (oldAddress) oldAddress.remove();
};
