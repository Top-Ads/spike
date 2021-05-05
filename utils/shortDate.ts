
export function shortDate(date: Date) {
    const current = new Date(date)

    const day =  current.getDay() < 10 ?  `0${current.getDay()}` : current.getDay()
    const month = current.getMonth() < 10 ?  `0${current.getMonth()}` : current.getMonth()
    const year = current.getUTCFullYear()

    return  `${year}-${month}-${day}`
}