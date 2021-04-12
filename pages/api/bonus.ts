import axios from "axios";
import { Bonus } from "./interfaces";

export const getBonuses = async (): Promise<Bonus[]> => 
    axios.get(``)
    .then( ({data}) => {
        return data;
    });
