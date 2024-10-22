import axios from 'axios';
import { BASE_URL } from './HttpClient';

interface Options {
    maxFileSize?: number;
    maxFileCount?: number;
    onError?: (errorMessage: string) => void;
}

const MB: number = 1024 * 1024;
const toKB = (b: number) => Math.round(b / 1024);

export class FileUtils {
    public static async upload(file: File, options: Omit<Options, 'maxFileCount'> = {}) {
        const { maxFileSize = 5 * MB, onError } = options;

        if (file.size > maxFileSize) {
            onError &&
                onError(
                    `Превышен размер файла ${file.name}. Максимальный размер: ${toKB(
                        maxFileSize
                    )} Кбайт`
                );
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.postForm('files', formData, {
                onDownloadProgress(progressEvent) {},
                baseURL: BASE_URL,
            });
            return response.data;
        } catch (error) {
            onError && onError('Ошибка загрузки файла');
        }
    }
}
