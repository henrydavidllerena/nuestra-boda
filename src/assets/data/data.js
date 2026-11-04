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
        address: 'Av. González Suárez N27-185, Urb. El Madrigal, Quito 170135, Ecuador'
    },

    link: {
        calendar: 'https://calendar.app.google/oSVLRMYC79GzuA4f9',
        map: 'https://maps.app.goo.gl/LWDnprmTNzcyYrsh9',
    },

    galeri: [
        {
            id: 1,
            image: './src/assets/images/1.png'
        },
        {
            id: 2,
            image: './src/assets/images/2.png'
        },
        {
            id: 3,
            image: './src/assets/images/3.png'
        },
        {
            id: 4,
            image: './src/assets/images/4.png'
        },
        {
            id: 5,
            image: './src/assets/images/5.png'
        }
    ],

    bank: [
        {
            id: 1,
            name: 'Produbanco',
            icon: './src/assets/images/bca.png',
            rekening: '12345678'
        },
        {
            id: 2,
            name: 'De una',
            icon: './src/assets/images/bri.png',
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
