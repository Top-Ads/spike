import axios from "axios"

export const getTotalSlots = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/slots/count?country.code=it`)).data

export const getTotalBonuses = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/bonuses/count?country.code=it`)).data

export const getTotalProducers = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/producers/count?country.code=it`)).data