
export function longDate(date: Date | string) {
    const current = new Date(date)

    const day =  current.getDate() < 10 ?  `0${current.getDate()}` : current.getDate()
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    const month = formatter.format(current)
    const year = current.getUTCFullYear()

    return  `${day}-${month}-${year}`
}

export function shortTime(date: Date | string) {
    const current = new Date(date)

    const hours = current.getHours() < 10 ?  `0${current.getHours()}` : current.getHours()
    const minutes = current.getMinutes() < 10 ?  `0${current.getMinutes()}` : current.getMinutes()

    return  `${hours}:${minutes}`
}