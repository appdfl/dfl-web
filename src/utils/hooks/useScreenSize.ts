import { useEffect, useState } from "react";

export const useScreenSize = () => {
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth >= 1024 ? true : false);
    const [width, setWidth] = useState(window.innerWidth);

    function handleScreenResize() {
        const windowWidth = window.innerWidth; /* Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) */

        if (windowWidth >= 1024 && !isScreenWide) {
            console.log("Tela agora é larga.");
            setIsScreenWide(true);
        } else if (windowWidth < 1024 && isScreenWide) {
            console.log("Tela agora é pequena.");
            setIsScreenWide(false);
        }
        setWidth(windowWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize);
    })

    return { isScreenWide, width };
}