import "./Forms.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import arrowDown from "../../assets/arrowdown.svg";
import arrowUp from "../../assets/arrowup.svg";
import filters from "../../assets/filter.svg";
import change from "../../assets/change.svg";

const Forms = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterButtons, setFilterButtons] = useState(false);
    const [filterRows, setFilterRows] = useState(false);
    const [newest, setNewest] = useState(true);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");

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
        forms
            .filter(
                (f) =>
                    f.fullName.toLowerCase().includes(search.toLowerCase()) ||
                    f.formName.toLowerCase().includes(search.toLowerCase())
            )
            .filter((f) => {
                if (filter.includes("notify")) {
                    return (
                        f.approved.toUpperCase() === "APPROVED" && f.COnotify
                    );
                }
                if (filter.includes("concurrence")) {
                    return (
                        f.approved.toUpperCase() === "PENDING" &&
                        f.COconcurrence
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
                <div className="formsContainerFiltersSearchFilter">
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="formsContainerFiltersSearch"
                    />
                    <img
                        onClick={() => setFilterRows(!filterRows)}
                        src={change}
                        alt="change"
                        className="formsContainerFiltersFilter"
                    />
                    <img
                        onClick={() => setFilterButtons(!filterButtons)}
                        src={filters}
                        alt="filter"
                        className="formsContainerFiltersFilter"
                    />
                </div>
                {filterButtons && (
                    <div className="formsContainerFiltersButtons">
                        <button
                            onClick={() => {
                                if (filter.includes("pending")) {
                                    return setFilter(
                                        filter.replace("pending", "")
                                    );
                                }
                                return setFilter("pending");
                            }}
                            className={`formsContainerFiltersButtonsButton ${
                                filter.includes("pending") &&
                                "formsContainerFiltersButtonsButtonActive"
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
                            className={`formsContainerFiltersButtonsButton ${
                                filter.includes("approved") &&
                                "formsContainerFiltersButtonsButtonActive"
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
                            className={`formsContainerFiltersButtonsButton ${
                                filter.includes("rejected") &&
                                "formsContainerFiltersButtonsButtonActive"
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
                                className={`formsContainerFiltersButtonsButton ${
                                    filter.includes("notify") &&
                                    "formsContainerFiltersButtonsButtonActive"
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
                                className={`formsContainerFiltersButtonsButton ${
                                    filter.includes("concurrence") &&
                                    "formsContainerFiltersButtonsButtonActive"
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
                                className={`formsContainerFiltersButtonsButton ${
                                    filter.includes("self") &&
                                    "formsContainerFiltersButtonsButtonActive"
                                }`}
                            >
                                My Forms
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="formsContainerStats">
                <p className="formsContainerStatsText">
                    Showing {filteredForms.length} of {forms.length}
                </p>
                <div className="formsContainerFiltersDate">
                    <p
                        onClick={() => setNewest(!newest)}
                        className="formsContainerFiltersRightText"
                    >
                        Sort by date
                    </p>
                    {newest ? (
                        <img
                            onClick={() => setNewest(false)}
                            src={arrowDown}
                            alt="arrow"
                            className="formsContainerFiltersRightArrow"
                        />
                    ) : (
                        <img
                            onClick={() => setNewest(true)}
                            src={arrowUp}
                            alt="arrow"
                            className="formsContainerFiltersRightArrow"
                        />
                    )}
                </div>
            </div>
            <div className={`forms ${filterRows && "formsRows"}`}>
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
                                to={`/form/${f._id}`}
                                className="formsLink"
                            >
                                {filterRows ? (
                                    <div className="formsLinkFormRows" form={f}>
                                        <p className="formsLinkFormRowsName">
                                            {f.formName}
                                        </p>
                                        <div
                                            className={`formsLinkFormRowsTag ${
                                                f.approved.toUpperCase() ===
                                                    "PENDING" &&
                                                "formsLinkFormRowsTagPending"
                                            } ${
                                                f.approved.toUpperCase() ===
                                                    "APPROVED" &&
                                                "formsLinkFormRowsTagApproved"
                                            } ${
                                                f.approved.toUpperCase() ===
                                                    "REJECTED" &&
                                                "formsLinkFormRowsTagRejected"
                                            }`}
                                        ></div>
                                    </div>
                                ) : (
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
                                            <div>
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
                                                        {f.comment &&
                                                            `"${f.comment}"`}
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
                                )}
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default Forms;
