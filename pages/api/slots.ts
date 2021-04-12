import axios from "axios";
import { Slot } from "./interfaces";

export const getSlotsCard = async (): Promise<Slot[]> => 
    axios.get(`https://www.mocky.io/v2/5da99f9f31000036004e0a4e`)
    .then( ({data}) => {
        return data;
    });
