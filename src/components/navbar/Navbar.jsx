import "./Navbar.sass";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

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
                <p className="navbarItem">item4</p>
            </div>
        </div>
    );
};

export default Navbar;
