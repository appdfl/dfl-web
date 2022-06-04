export const isScreenWide = () => {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (width >= 1024) {
        return true
    } else {
        return false
    }
}