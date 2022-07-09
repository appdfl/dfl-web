import Sidebar from "./Menu";

export default function Layout({ children }) {
    return (
        <div id="dashboard">
            <Sidebar />
            {children}
            {/* <main></main> */}
        </div>
    )
}