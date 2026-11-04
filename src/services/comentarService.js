
import { data } from "../assets/data/data.js";

export const comentarService = {
    getComentar: async function () {
        const response = await fetch(data.api);
        return await response.json();
    },

    addComentar: async function (comentar) {
        try {
            await fetch(data.api, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(comentar)
            });

            return { submitted: true };

        } catch (error) {
            console.error('Post error:', error);
            throw error;
        }
    }
};
