import { createContext } from "react"

export const DislikedSlotContext = createContext({
    slotDislikedId: '',
    setSlotDislikedId: (_id: string) => {}
})

