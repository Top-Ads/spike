import { Spin } from "../interfaces"

export const mergeWithUpdate = (current : Spin[], update : Spin[]) => {
    // the latest row in the table
    const lastFromCurrent = current[0]
    // slicing up the update array to the last known row based on the _id

    const slicedUpdate = update.slice(0, update.map(u => u._id).indexOf(lastFromCurrent._id))
    // spreading the result so that is automatically ordered by time as returned by the Socket
    return [...slicedUpdate, ...current]
}