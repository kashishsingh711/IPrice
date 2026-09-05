import Navbar from './Navbar.jsx'

function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout