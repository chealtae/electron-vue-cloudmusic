/* 
    electron不能直接访问本地资源 这里需要改一下写法
*/
const getImgSrc = (src) => {
    const imgsrc = 'http://localhost:8888/img/';
    return imgsrc+src;
} 
const getAudioSrc = (src) => {
    const imgsrc = 'http://localhost:8888/audio/';
    return imgsrc+src;
}
const getLrcSrc = (src) => {
    const imgsrc = 'http://localhost:8888/lrc/';
    return imgsrc+src;
}
export {
    getImgSrc,
    getAudioSrc,
    getLrcSrc,
}