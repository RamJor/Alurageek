export default function esunUrlImg(url) {
    const expresionimg = /https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/;
   
    return expresionimg.test(url)

} 