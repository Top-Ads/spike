import axios, { AxiosInstance } from 'axios';

class AquaClient {
    axios: AxiosInstance;

    constructor(public baseURL: string = 'https://spikeapistaging.tech/graphql', public headers?: string) {
        this.axios = axios.create({ baseURL })
    }

    query({ query, variables }: any) {
        return this.axios.post('', { query, variables })
    }
}

export default AquaClient;