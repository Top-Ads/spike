import axios from "axios"
import { SMTP_APIKEY } from "../../public/environment";
import { SubscriptionResponse } from "../schemas";

export const getTotalSlots = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/slots/count?country.code=it`)).data

export const getTotalBonuses = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/bonuses/count?country.code=it`)).data

export const getTotalProducers = async (): Promise<number> => (await axios.get(`https://spikeapistaging.tech/producers/count?country.code=it`)).data

const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': SMTP_APIKEY
    },
};

export const subscribeToChannel = async (body: string): Promise<SubscriptionResponse> => (await axios.post('https://api.sendinblue.com/v3/contacts', body , headers)).data