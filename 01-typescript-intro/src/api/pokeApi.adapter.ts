import axios from 'axios';

export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return await response.json();
    }

}

export class PokeApiAxiosAdapter implements HttpAdapter {

    private readonly axios = axios;

    async get<T>(url: string) { // Declaramos T como genérico o tipo universal porque en este momento no conocemos el tipo de dato explícitamente
        const { data } = await this.axios.get<T>(url);
        return data;
    }

    async post(url: string, data: any) {

    }

    async patch(url: string, data: any) {

    }


    async delete(url: string) {

    }


}