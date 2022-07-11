import { useEffect, useState } from "react";

const WIDE_SIZE = 1024;

export const useScreenSize = () => {
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth >= WIDE_SIZE ? true : false);
    const [width, setWidth] = useState(window.innerWidth);

    function handleScreenResize() {
        const windowWidth = window.innerWidth; /* Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) */

        if (windowWidth >= WIDE_SIZE && !isScreenWide) {
            console.log("Tela agora é larga.");
            setIsScreenWide(true);
        } else if (windowWidth < WIDE_SIZE && isScreenWide) {
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