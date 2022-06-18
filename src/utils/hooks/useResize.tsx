import { useEffect, useState } from "react"

export const useResize = (myRef) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(myRef.current.offsetWidth)
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])

    return { width, height }
}