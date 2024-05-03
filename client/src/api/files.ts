import HttpClient from '@/helpers/HttpClient';

export default {
    async upload(payload: FormData) {
        const response = await HttpClient.post('files', payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    },
};
