import { createContext } from "react"

export const removeLikeSlotContext = createContext({
    removeLikeSlotId: '',
    setRemoveLikeSlotId: (_id: string) => {}
})

