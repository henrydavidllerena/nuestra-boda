export const data = {
    bride: {
        L: {
            id: 1,
            name: 'David Llerena',
            child: 'Novio',
            father: 'Marianita de Jesus Montenegro',
            mother: 'Randy Llerena',
            image: './src/assets/images/david.jpeg'
        },
        P: {
            id: 2,
            name: 'Ximena Santelices',
            child: 'Novia',
            father: 'Fátima Enríquez',
            mother: 'Daniel Santelices',
            image: './src/assets/images/xime.jpeg'
        },

        couple: './src/assets/images/juntos.jpg'
    },

    
time: {
    marriage: {
        year: '2027',
        month: 'Marzo',
        date: '13',
        day: 'Sábado',
        hours: {
            start: '16.00',
            finish: 'Selesai'
        }
    },

    reception: {
        year: '2027',
        month: 'Marzo',
        date: '13',
        day: 'Sábado',
        hours: {
            start: '18.00',
            finish: 'Selesai'
        }
    },

    // Direcciones de los dos eventos
    marriageAddress: 'Iglesia de la Paz, Whymper E7-172, Quito',
    receptionAddress: 'Av. González Suárez N27-185, Quito',

    // Dirección anterior, conservada por compatibilidad
    address: 'Av. González Suárez N27-185, Urb. El Madrigal, Quito 170135, Ecuador'
},


   
link: {
    calendar: 'https://calendar.app.google/oSVLRMYC79GzuA4f9',

    // Enlaces de Google Maps
    marriageMap: 'https://share.google/lm2QttvRaJ4ODFoEw',
    receptionMap: 'https://share.google/Zx2O8fa73QUpcRQoB',

    // Enlace anterior, conservado por compatibilidad
    map: 'https://maps.app.goo.gl/LWDnprmTNzcyYrsh9'
},


    
        galeri: Array.from({ length: 42 }, (_, index) => ({
            id: index + 1,
            image: `./src/assets/images/${index + 1}.jpeg`
        })),


    bank: [
        {
            id: 1,
            name: 'David Llerena, ci. 1720847290',
            icon: './src/assets/images/produbanco.jpg',
            rekening: '12722075087, '
        },
        {
            id: 2,
            name: 'Ximena Santelices',
            icon: './src/assets/images/pichincha.png',
            rekening: '12345678'
        },
    ],

    audio: './src/assets/audio/wedding.mp3',

    api: 'https://script.google.com/macros/s/AKfycbwEI_93W_jkTrv38XFzQ5IIKclGdV7V3K99lqwj6upn7PZF0nE6oAlUiuSGYDcn2cgL6Q/exec',

    navbar: [
        {
            id: 1,
            teks: 'Home',
            icon: 'bx bxs-home-heart',
            path: '#home',
        },
        {
            id: 2,
            teks: 'Bienvenida',
            icon: 'bx bxs-group',
            path: '#bride',
        },
        {
            id: 3,
            teks: 'Fechas',
            icon: 'bx bxs-calendar-check',
            path: '#time',
        },
        {
            id: 4,
            teks: 'Fotos',
            icon: 'bx bxs-photo-album',
            path: '#galeri',
        },
        {
            id: 5,
            teks: 'Registro',
            icon: 'bx bxs-message-rounded-dots',
            path: '#wishas',
        },
    ],
}
