import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// original post: https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated

function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const path = url.split('?')[0];

        const localStorageAdminToken = localStorage.getItem("token");
        const sessionStorageAdminToken = sessionStorage.getItem("token");

        if (localStorageAdminToken && !sessionStorageAdminToken) {
            console.log("Há um token armazenado. Tentando recuperar.")
            setAuthorized(true)
        } else {
            if (!sessionStorageAdminToken && path.includes("dashboard") && path !== "/dashboard/authentication/login" && path !== "/dashboard/authentication/register") {
                console.log("O usuário está em uma página de dashboard sem autenticação.")
                setAuthorized(false);
                router.push({
                    pathname: '/dashboard/authentication/login',
                    query: { returnUrl: router.asPath }
                });
            } else {
                setAuthorized(true);
            }
        }
    }

    return (authorized && children);
}

export { RouteGuard };