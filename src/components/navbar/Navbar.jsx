import "./Navbar.sass";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bell from "../../assets/bell.svg";
import settings from "../../assets/settings.svg";
import forms from "../../assets/forms.svg";
import forms2 from "../../assets/forms2.svg";
import stats from "../../assets/stats.svg";
import submit from "../../assets/submit.svg";
import submit2 from "../../assets/submit2.svg";

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
                        <Link to="/forms" className="navbarLink">
                            <p
                                className={
                                    location.pathname === "/forms"
                                        ? "navbarLinkItemActive"
                                        : "navbarLinkItemInactive"
                                }
                            >
                                Forms
                            </p>
                        </Link>
                    </div>
                    <div className="navbarLeft">
                        <Link to="/stats" style={{ textDecoration: "none" }}>
                            <img
                                className="navbarLeftSettingsIcon"
                                src={stats}
                                alt="stats"
                            />
                        </Link>
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
                            <img
                                className="navbarLeftSettingsIcon"
                                src={settings}
                                alt="settings"
                            />
                        </Link>
                        {props.user && props.user.role !== "Supervisor" && (
                            <Link to="/submit" className="navbarLeftLink">
                                <button className="navbarLeftLinkSubmit">
                                    <img
                                        src={submit2}
                                        className="navbarLeftLinkSubmitIcon"
                                        alt="submit"
                                    />
                                    Request
                                </button>
                            </Link>
                        )}
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
                        to="/forms"
                        style={{ textDecoration: "none" }}
                        className="navbarIconTextContainer"
                    >
                        <img className="navbarIcon" src={forms} alt="forms" />
                        <p className="navbarIconText">Forms</p>
                    </Link>
                    {props.user && props.user.role !== "Traveler" && (
                        <Link
                            to="/stats"
                            style={{ textDecoration: "none" }}
                            className="navbarIconTextContainer"
                        >
                            <img
                                className="navbarIcon"
                                src={stats}
                                alt="stats"
                            />
                            <p className="navbarIconText">Statistics</p>
                        </Link>
                    )}
                    {props.user && props.user.role !== "Supervisor" && (
                        <Link to="/submit" className="navbarIconTextContainer">
                            <img
                                className="navbarIcon"
                                src={submit}
                                alt="submit"
                            />
                            <p className="navbarIconText">Request</p>
                        </Link>
                    )}
                    <Link
                        to="/notification"
                        className="navbarIconTextContainer"
                    >
                        <img className="navbarIcon" src={bell} alt="bell" />
                        <p className="navbarIconText">
                            Notifications
                            {unreadNotifications.includes(false) && (
                                <span className="navbarBellIconBadge"></span>
                            )}
                        </p>
                    </Link>
                    <Link
                        to="/profile"
                        style={{ textDecoration: "none" }}
                        className="navbarIconTextContainer"
                    >
                        <img
                            className="navbarIcon"
                            src={settings}
                            alt="settings"
                        />
                        <p className="navbarIconText">Settings</p>
                    </Link>

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
