import "./Navbar.sass";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../../assets/hamburger.svg";
import bell from "../../assets/bell.svg";
import submit from "../../assets/submit.svg";

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
                    <div className="navbarRight">
                        {props.user && props.user.supervisorRole === "CO" && (
                            <Link
                                to="/notify"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
                                <p
                                    className={
                                        location.pathname === "/notify"
                                            ? "navbarLinkItemActive"
                                            : "navbarLinkItemInactive"
                                    }
                                >
                                    Notify
                                </p>
                            </Link>
                        )}
                        {props.user && props.user.supervisorRole === "CO" && (
                            <Link
                                to="/concurrence"
                                className="navbarLink"
                                onClick={() => setHamburgerModal(false)}
                            >
                                <p
                                    className={
                                        location.pathname === "/concurrence"
                                            ? "navbarLinkItemActive"
                                            : "navbarLinkItemInactive"
                                    }
                                >
                                    Concurrence
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
                        {props.user && props.user.role !== "Supervisor" && (
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
                        )}
                    </div>
                    <div className="navbarLeft">
                        {props.user && props.user.role !== "Supervisor" && (
                            <Link
                                to="/submit"
                                className="navbarLeftLink"
                                onClick={() => setHamburgerModal(false)}
                            >
                                <button className="navbarLeftLinkSubmit">
                                    Submit
                                </button>
                            </Link>
                        )}
                        <Link
                            to="/notification"
                            className="navbarLeftBellIconBadgeContainer"
                        >
                            <img
                                className="navbarLeftBellIcon"
                                src={bell}
                                alt="bell"
                            />
                            {unreadNotifications.includes(false) && (
                                <span className="navbarLeftBellIconBadge"></span>
                            )}
                        </Link>
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            {/*<div
                                className="navbarLeftProfileIcon"
                                style={{
                                    background:
                                        (props.user &&
                                            props.user.supervisorRole ===
                                                "TA" &&
                                            "#90CAF9") ||
                                        (props.user &&
                                            props.user.supervisorRole ===
                                                "TM" &&
                                            "#FF8A65") ||
                                        (props.user &&
                                            props.user.supervisorRole ===
                                                "PL" &&
                                            "#2196F3") ||
                                        (props.user &&
                                            props.user.supervisorRole ===
                                                "PM" &&
                                            "#1565C0") ||
                                        (props.user &&
                                            props.user.supervisorRole ===
                                                "CO" &&
                                            "#FF5722"),
                                }}
                            >
                                {props.user &&
                                    props.user.email
                                        .substring(0, 2)
                                        .toUpperCase()}
                            </div>*/}
                            {props.user && (
                                <p className="navbarLeftProfile">
                                    {props.user.email}
                                </p>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (token) {
        return (
            <div className="navbarContainer">
                <div className="navbar">
                    <Link
                        to="/profile"
                        style={{ textDecoration: "none" }}
                        onClick={() => setHamburgerModal(false)}
                    >
                        <div
                            className="navbarProfileIcon"
                            style={{
                                background:
                                    (props.user &&
                                        props.user.supervisorRole === "TA" &&
                                        "#90CAF9") ||
                                    (props.user &&
                                        props.user.supervisorRole === "TM" &&
                                        "#FF8A65") ||
                                    (props.user &&
                                        props.user.supervisorRole === "PL" &&
                                        "#2196F3") ||
                                    (props.user &&
                                        props.user.supervisorRole === "PM" &&
                                        "#1565C0") ||
                                    (props.user &&
                                        props.user.supervisorRole === "CO" &&
                                        "#FF5722"),
                            }}
                        >
                            {props.user &&
                                props.user.email.substring(0, 2).toUpperCase()}
                        </div>
                    </Link>
                    <Link
                        to="/notification"
                        className="navbarBellIconBadgeContainer"
                        onClick={() => setHamburgerModal(false)}
                    >
                        <img className="navbarBellIcon" src={bell} alt="bell" />
                        {unreadNotifications.includes(false) && (
                            <span className="navbarBellIconBadge"></span>
                        )}
                    </Link>
                    {props.user && props.user.role !== "Supervisor" && (
                        <Link
                            to="/submit"
                            className="navbarBellIconBadgeContainer"
                            onClick={() => setHamburgerModal(false)}
                        >
                            <img
                                className="navbarBellIcon"
                                src={submit}
                                alt="submit"
                            />
                        </Link>
                    )}
                    <img
                        className="navbarHamburgerIcon"
                        src={hamburger}
                        alt="hamburger"
                        onClick={() => setHamburgerModal(!hamburgerModal)}
                    />
                    {hamburgerModal && (
                        <div className="navbarHamburgerContainer">
                            <div>
                                {props.user &&
                                    props.user.supervisorRole === "CO" && (
                                        <>
                                            <Link
                                                to="/notify"
                                                className="navbarLink"
                                                onClick={() =>
                                                    setHamburgerModal(false)
                                                }
                                            >
                                                <p
                                                    className={
                                                        location.pathname ===
                                                        "/notify"
                                                            ? "navbarLinkItemActive"
                                                            : "navbarLinkItemInactive"
                                                    }
                                                >
                                                    Notify
                                                </p>
                                            </Link>
                                            <Link
                                                to="/concurrence"
                                                className="navbarLink"
                                                onClick={() =>
                                                    setHamburgerModal(false)
                                                }
                                            >
                                                <p
                                                    className={
                                                        location.pathname ===
                                                        "/concurrence"
                                                            ? "navbarLinkItemActive"
                                                            : "navbarLinkItemInactive"
                                                    }
                                                >
                                                    Concurrence
                                                </p>
                                            </Link>
                                        </>
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
                                {props.user &&
                                    props.user.role !== "Supervisor" && (
                                        <Link
                                            to="/myforms"
                                            className="navbarLink"
                                            onClick={() =>
                                                setHamburgerModal(false)
                                            }
                                        >
                                            <p
                                                className={
                                                    location.pathname ===
                                                    "/myforms"
                                                        ? "navbarLinkItemActive"
                                                        : "navbarLinkItemInactive"
                                                }
                                            >
                                                My Forms
                                            </p>
                                        </Link>
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default Navbar;
