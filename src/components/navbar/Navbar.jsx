import "./Navbar.sass";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../../assets/hamburger.svg";
import bell from "../../assets/bell.svg";

const Navbar = (props) => {
    const [hamburgerModal, setHamburgerModal] = useState(false);

    const location = useLocation();

    const token = localStorage.getItem("token");

    if (token && window.innerWidth >= 1100) {
        return (
            <div className="navbarContainer">
                <div className="navbar">
                    <Link to="/profile">
                        <div className="navbarProfileIcon">
                            {props.user &&
                                props.user.user.email
                                    .substring(0, 2)
                                    .toUpperCase()}
                        </div>
                    </Link>
                    <Link to="/notification">
                        <img className="navbarBellIcon" src={bell} alt="bell" />
                    </Link>
                    {props.user && props.user.user.role !== "Supervisor" && (
                        <Link
                            to="/submit"
                            className="navbarLink"
                            onClick={() => setHamburgerModal(false)}
                        >
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
                    )}
                    <Link
                        to="/pending"
                        className="navbarLink"
                        onClick={() => setHamburgerModal(false)}
                    >
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
                    <Link
                        to="/approved"
                        className="navbarLink"
                        onClick={() => setHamburgerModal(false)}
                    >
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
                    <Link
                        to="/rejected"
                        className="navbarLink"
                        onClick={() => setHamburgerModal(false)}
                    >
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
                </div>
            </div>
        );
    }

    if (token) {
        return (
            <div className="navbarContainer">
                <div className="navbar">
                    <Link to="/profile">
                        <div className="navbarProfileIcon">
                            {props.user &&
                                props.user.user.email
                                    .substring(0, 2)
                                    .toUpperCase()}
                        </div>
                    </Link>
                    <Link to="/notification">
                        <img className="navbarBellIcon" src={bell} alt="bell" />
                    </Link>
                    <img
                        className="navbarHamburgerIcon"
                        src={hamburger}
                        alt="hamburger"
                        onClick={() => setHamburgerModal(!hamburgerModal)}
                    />
                    {hamburgerModal && (
                        <div className="navbarHamburgerContainer">
                            {props.user &&
                                props.user.user.role !== "Supervisor" && (
                                    <Link
                                        to="/submit"
                                        className="navbarLink"
                                        onClick={() => setHamburgerModal(false)}
                                    >
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
                                )}
                            <Link
                                to="/pending"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
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
                            <Link
                                to="/approved"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
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
                            <Link
                                to="/rejected"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
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
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default Navbar;
