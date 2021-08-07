
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

export function dateDiff( date: Date ) {
    
    const diff = Date.now() - new Date(date).getTime();

    return isNaN( diff ) ? NaN :  Math.floor( diff / 86400000)
    
    /* return isNaN( diff ) ? NaN : {
        diff : diff,
        ms : Math.floor( diff            % 1000 ),
        s  : Math.floor( diff /     1000 %   60 ),
        m  : Math.floor( diff /    60000 %   60 ),
        h  : Math.floor( diff /  3600000 %   24 ),
        d  : Math.floor( diff / 86400000        )
    }; */
}
