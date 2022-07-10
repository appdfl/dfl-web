import { useEffect, useState } from "react";

export const useScreenSize = () => {
    const [isScreenWide, setIsScreenWide] = useState(false);

    function handleScreenResize() {
        const width = window.innerWidth; /* Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) */

        if (width >= 1024 && !isScreenWide) {
            console.log("Tela agora é larga.");
            setIsScreenWide(true);
        } else if (width < 1024 && isScreenWide) {
            console.log("Tela agora é pequena.");
            setIsScreenWide(false);
        }
        return width;
    }
    const width = handleScreenResize();

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize);
    })

    return { isScreenWide, width };
}