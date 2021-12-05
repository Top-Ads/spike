import axios, { AxiosInstance } from 'axios'
import { SPIKE_API } from '../../public/environment'

class AquaClient {
    axios: AxiosInstance;

    constructor(public baseURL: string = SPIKE_API, public headers?: string) {
        this.axios = axios.create({ baseURL })
    }

    query({ query, variables }: any) {
        return this.axios.post('', { query, variables })
    }
}

export default AquaClient;