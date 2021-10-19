import "./Navbar.sass";
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    const location = useLocation();

    const token = localStorage.getItem("token");

    if (token) {
        return (
            <div className="navbarContainer">
                {props.user && (
                    <p
                        style={{
                            fontSize: "10px",
                            position: "absolute",
                            margin: "-10px auto 0 auto",
                            textAlign: "center",
                            left: "0",
                            right: "0",
                            color: "#D2D2D2",
                        }}
                    >
                        {props.user.user.email}
                    </p>
                )}
                <div className="navbar">
                    <Link to="/submit" className="navbarLink">
                        <p
                            className={
                                location.pathname === "/submit"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            Submit
                        </p>
                    </Link>
                    <Link to="/pending" className="navbarLink">
                        <p
                            className={
                                location.pathname === "/pending"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            Pending
                        </p>
                    </Link>
                    <Link to="/approved" className="navbarLink">
                        <p
                            className={
                                location.pathname === "/approved"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            Approved
                        </p>
                    </Link>
                    <Link to="/rejected" className="navbarLink">
                        <p
                            className={
                                location.pathname === "/rejected"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            Rejected
                        </p>
                    </Link>
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
