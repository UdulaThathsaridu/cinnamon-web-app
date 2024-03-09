import Navbar from "./Navbar"


const Layout = ({navbar=true,children}) => {
    //give extra space to every part of our website
    return <>
    {navbar && <Navbar />}
    <div className="container mt-3">{children}</div>
    </>
};

export default Layout;