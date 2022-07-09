import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            {/* <main></main> */}
            <Footer />
        </>
    )
}