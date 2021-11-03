import "./Navbar.sass";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../../assets/hamburger.svg";
import bell from "../../assets/bell.svg";

const Navbar = (props) => {
    const [hamburgerModal, setHamburgerModal] = useState(false);

    const location = useLocation();

    const token = localStorage.getItem("token");

    const userEmail = props.user && props.user.email;

    const unreadNotifications = props.notifications.map((r) =>
        r.read.includes(userEmail)
    );

    if (token && window.innerWidth >= 1100) {
        return (
            <div className="navbarContainer">
                <div className="navbar">
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div className="navbarProfileIcon">
                            {props.user &&
                                props.user.email.substring(0, 2).toUpperCase()}
                        </div>
                    </Link>
                    <Link
                        to="/notification"
                        className="navbarBellIconBadgeContainer"
                    >
                        <img className="navbarBellIcon" src={bell} alt="bell" />
                        {unreadNotifications.includes(false) && (
                            <span className="navbarBellIconBadge"></span>
                        )}
                    </Link>
                    {props.user && props.user.role !== "Supervisor" && (
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
                    <Link
                        to="/myforms"
                        className="navbarLink"
                        onClick={() => setHamburgerModal(false)}
                    >
                        <p
                            className={
                                location.pathname === "/myforms"
                                    ? "navbarLinkItemActive"
                                    : "navbarLinkItemInactive"
                            }
                        >
                            My Forms
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
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div className="navbarProfileIcon">
                            {props.user &&
                                props.user.email.substring(0, 2).toUpperCase()}
                        </div>
                    </Link>
                    <Link
                        to="/notification"
                        className="navbarBellIconBadgeContainer"
                    >
                        <img className="navbarBellIcon" src={bell} alt="bell" />
                        {unreadNotifications.includes(false) && (
                            <span className="navbarBellIconBadge"></span>
                        )}
                    </Link>
                    <img
                        className="navbarHamburgerIcon"
                        src={hamburger}
                        alt="hamburger"
                        onClick={() => setHamburgerModal(!hamburgerModal)}
                    />
                    {hamburgerModal && (
                        <div className="navbarHamburgerContainer">
                            {props.user && props.user.role !== "Supervisor" && (
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
                            <Link
                                to="/myforms"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
                                <p
                                    className={
                                        location.pathname === "/myforms"
                                            ? "navbarLinkItemActive"
                                            : "navbarLinkItemInactive"
                                    }
                                >
                                    My Forms
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
