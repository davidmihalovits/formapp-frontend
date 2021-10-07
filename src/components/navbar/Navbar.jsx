import "./Navbar.sass";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const token = localStorage.getItem("token");

    if (token) {
        return (
            <div className="navbarContainer">
                <div className="navbar">
                    <Link to="/form" className="navbarLink">
                        <p
                            className={
                                location.pathname === "/form"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            Form
                        </p>
                    </Link>
                    <p className="navbarItem">item2</p>
                    <p className="navbarItem">item3</p>
                    <p
                        className="navbarItem"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                        }}
                    >
                        Logout
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

export default Navbar;
