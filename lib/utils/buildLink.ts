export const buildLink = (data : any) => {
    if(data.main_argument && !data.secondaryArgument) return `/${data.main_argument.slug}/${data.slug}`
    if(data.main_argument && data.secondaryArgument) return `/${data.main_argument.slug}/${data.secondaryArgument.slug}/${data.slug}`
    return `/`
}