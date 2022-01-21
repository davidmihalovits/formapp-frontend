import "./Forms.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Forms = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newest, setNewest] = useState(true);
    const [filter, setFilter] = useState("");

    const getForms = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/getForms`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => setForms(data));

        setLoading(false);
    };

    useEffect(() => {
        getForms();

        // eslint-disable-next-line
    }, []);

    const filteredForms =
        forms &&
        forms.filter((f) => {
            if (filter.includes("notify")) {
                return f.approved.toUpperCase() === "APPROVED" && f.COnotify;
            }
            if (filter.includes("concurrence")) {
                return (
                    f.approved.toUpperCase() === "PENDING" && f.COconcurrence
                );
            }
            if (filter.includes("self")) {
                return f.email === props.user.email;
            }
            if (filter) {
                return filter.includes(f.approved.toLowerCase());
            }
            return f;
        });

    if (loading) {
        return (
            <div className="formsContainer">
                <div className="forms">
                    <p className="formsLoading">Loading forms...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="formsContainer">
            <div className="formsContainerFilters">
                <div className="formsContainerFiltersLeft">
                    <button
                        onClick={() => {
                            if (filter.includes("pending")) {
                                return setFilter(filter.replace("pending", ""));
                            }
                            return setFilter("pending");
                        }}
                        className={`formsContainerFiltersLeftButton ${
                            filter.includes("pending") &&
                            "formsContainerFiltersLeftButtonActive"
                        }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => {
                            if (filter.includes("approved")) {
                                return setFilter(
                                    filter.replace("approved", "")
                                );
                            }
                            return setFilter("approved");
                        }}
                        className={`formsContainerFiltersLeftButton ${
                            filter.includes("approved") &&
                            "formsContainerFiltersLeftButtonActive"
                        }`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => {
                            if (filter.includes("rejected")) {
                                return setFilter(
                                    filter.replace("rejected", "")
                                );
                            }
                            return setFilter("rejected");
                        }}
                        className={`formsContainerFiltersLeftButton ${
                            filter.includes("rejected") &&
                            "formsContainerFiltersLeftButtonActive"
                        }`}
                    >
                        Rejected
                    </button>
                    {props.user && props.user.supervisorRole === "CO" && (
                        <button
                            onClick={() => {
                                if (filter.includes("notify")) {
                                    return setFilter(
                                        filter.replace("notify", "")
                                    );
                                }
                                return setFilter("notify");
                            }}
                            className={`formsContainerFiltersLeftButton ${
                                filter.includes("notify") &&
                                "formsContainerFiltersLeftButtonActive"
                            }`}
                        >
                            Notify
                        </button>
                    )}
                    {props.user && props.user.supervisorRole === "CO" && (
                        <button
                            onClick={() => {
                                if (filter.includes("concurrence")) {
                                    return setFilter(
                                        filter.replace("concurrence", "")
                                    );
                                }
                                return setFilter("concurrence");
                            }}
                            className={`formsContainerFiltersLeftButton ${
                                filter.includes("concurrence") &&
                                "formsContainerFiltersLeftButtonActive"
                            }`}
                        >
                            Concurrence
                        </button>
                    )}
                    {props.user && props.user.role !== "Traveler" && (
                        <button
                            onClick={() => {
                                if (filter.includes("self")) {
                                    return setFilter(
                                        filter.replace("self", "")
                                    );
                                }
                                return setFilter("self");
                            }}
                            className={`formsContainerFiltersLeftButton ${
                                filter.includes("self") &&
                                "formsContainerFiltersLeftButtonActive"
                            }`}
                        >
                            Self
                        </button>
                    )}
                </div>
                <div className="formsContainerFiltersRight">
                    <button
                        onClick={() => {
                            return setNewest(true);
                        }}
                        className={`formsContainerFiltersRightButton ${
                            newest && "formsContainerFiltersRightButtonActive"
                        }`}
                    >
                        New
                    </button>
                    <button
                        onClick={() => {
                            return setNewest(false);
                        }}
                        className={`formsContainerFiltersRightButton ${
                            !newest && "formsContainerFiltersRightButtonActive"
                        }`}
                    >
                        Old
                    </button>
                </div>
            </div>
            <div className="formsContainerStats">
                <p className="formsContainerStatsText">
                    Showing {filteredForms.length} of {forms.length}
                </p>
            </div>
            <div className="forms">
                {filteredForms
                    .sort((a, b) => {
                        if (newest) {
                            return (
                                new Date(a.createdAt) + new Date(b.createdAt)
                            );
                        }
                        return new Date(a.createdAt) - new Date(b.createdAt);
                    })
                    .map((f, key) => {
                        return (
                            <Link
                                key={key}
                                to={`/${f.approved}/${f._id}`}
                                className="formsLink"
                            >
                                <div className="formsLinkForm" form={f}>
                                    <div
                                        className={`formsLinkFormTag ${
                                            f.approved.toUpperCase() ===
                                                "PENDING" &&
                                            "formsLinkFormTagPending"
                                        } ${
                                            f.approved.toUpperCase() ===
                                                "APPROVED" &&
                                            "formsLinkFormTagApproved"
                                        } ${
                                            f.approved.toUpperCase() ===
                                                "REJECTED" &&
                                            "formsLinkFormTagRejected"
                                        }`}
                                    >
                                        {f.approved.toUpperCase()}
                                    </div>

                                    <div className="formsLinkFormDetails">
                                        <p className="formsLinkFormName">
                                            {f.formName}
                                        </p>

                                        <div className="formsLinkFormRouting">
                                            <div className="formsLinkFormRoutingLine"></div>
                                            <div className="formsLinkFormRoutingRoleCircle">
                                                <div
                                                    className={`formsLinkFormRoutingCircle 
                                                    ${
                                                        f.routingPending.includes(
                                                            "TM"
                                                        ) &&
                                                        "formsLinkFormRoutingCirclePending"
                                                    }
                                                    ${
                                                        f.routingApproved.includes(
                                                            "TM"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleApproved"
                                                    }
                                                    ${
                                                        f.routingRejected.includes(
                                                            "TM"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleRejected"
                                                    }
                                                    `}
                                                ></div>
                                                <p className="formsLinkFormRoutingRole">
                                                    TM
                                                </p>
                                            </div>
                                            <div className="formsLinkFormRoutingRoleCircle">
                                                <div
                                                    className={`formsLinkFormRoutingCircle 
                                                    ${
                                                        f.routingPending.includes(
                                                            "PL"
                                                        ) &&
                                                        "formsLinkFormRoutingCirclePending"
                                                    }
                                                    ${
                                                        f.routingApproved.includes(
                                                            "PL"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleApproved"
                                                    }
                                                    ${
                                                        f.routingRejected.includes(
                                                            "PL"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleRejected"
                                                    }
                                                    `}
                                                ></div>
                                                <p className="formsLinkFormRoutingRole">
                                                    PL
                                                </p>
                                            </div>
                                            <div className="formsLinkFormRoutingRoleCircle">
                                                <div
                                                    className={`formsLinkFormRoutingCircle 
                                                    ${
                                                        f.routingPending.includes(
                                                            "PM"
                                                        ) &&
                                                        "formsLinkFormRoutingCirclePending"
                                                    }
                                                    ${
                                                        f.routingApproved.includes(
                                                            "PM"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleApproved"
                                                    }
                                                    ${
                                                        f.routingRejected.includes(
                                                            "PM"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleRejected"
                                                    }
                                                    `}
                                                ></div>
                                                <p className="formsLinkFormRoutingRole">
                                                    PM
                                                </p>
                                            </div>
                                            <div className="formsLinkFormRoutingRoleCircle">
                                                <div
                                                    className={`formsLinkFormRoutingCircle 
                                                    ${
                                                        f.routingPending.includes(
                                                            "CO"
                                                        ) &&
                                                        "formsLinkFormRoutingCirclePending"
                                                    }
                                                    ${
                                                        f.routingApproved.includes(
                                                            "CO"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleApproved"
                                                    }
                                                    ${
                                                        f.routingRejected.includes(
                                                            "CO"
                                                        ) &&
                                                        "formsLinkFormRoutingCircleRejected"
                                                    }
                                                    `}
                                                ></div>
                                                <p className="formsLinkFormRoutingRole">
                                                    CO
                                                </p>
                                            </div>
                                        </div>

                                        <div className="formsLinkFormApprovedRejected">
                                            <p
                                                className={`formsLinkFormApprovedRejectedComment ${
                                                    f.approved.toUpperCase() ===
                                                        "APPROVED" &&
                                                    "formsLinkFormApproved"
                                                } ${
                                                    f.approved.toUpperCase() ===
                                                        "REJECTED" &&
                                                    "formsLinkFormRejected"
                                                }`}
                                            >
                                                {f.comment && `"${f.comment}"`}
                                            </p>

                                            <p
                                                className={`formsLinkFormApprovedRejectedBy ${
                                                    f.approved.toUpperCase() ===
                                                        "APPROVED" &&
                                                    "formsLinkFormApproved"
                                                } ${
                                                    f.approved.toUpperCase() ===
                                                        "REJECTED" &&
                                                    "formsLinkFormRejected"
                                                }`}
                                            >
                                                {f.approvalBy &&
                                                    f.approvalBy.email}
                                                {f.approvalBy && (
                                                    <span>
                                                        (
                                                        {
                                                            f.approvalBy
                                                                .supervisorRole
                                                        }
                                                        )
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="formsLinkFormCreatorCreated">
                                            <p className="formsLinkFormCreator">
                                                {f.email}
                                            </p>
                                            <p className="formsLinkFormCreated">
                                                {moment(f.createdAt).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default Forms;
