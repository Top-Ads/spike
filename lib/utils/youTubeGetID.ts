export const youtubeGetId = (url: string) => {

    const urlSplit = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

    return (urlSplit[2] !== undefined) ? urlSplit[2].split(/[^0-9a-z_\-]/i)[0] : urlSplit[0]
 }