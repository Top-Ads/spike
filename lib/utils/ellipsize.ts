export const ellipsize = (s: string, until: number = 80) =>
    `${s.slice(0, until)}...`