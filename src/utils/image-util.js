
const getImageUrl = (name) => {
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

const getVideoUrl = (name) => {
    return new URL(`../assets/video/${name}`, import.meta.url).href;
}


export { getImageUrl, getVideoUrl }