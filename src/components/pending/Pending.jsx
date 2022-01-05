import "./Pending.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Pending = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [forms, setForms] = useState([]);

    const getForms = async () => {
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
    };

    useEffect(() => {
        getForms();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="pendingContainer">
            <div className="pending">
                {forms &&
                    forms
                        .filter((form) => form.approved === "pending")
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={`/pending/${f._id}`}
                                    className="pendingLink"
                                >
                                    <div className="pendingLinkForms" form={f}>
                                        <div className="pendingLinkFormsTag">
                                            Pending
                                        </div>
                                        <p className="pendingLinkFormsName">
                                            {f.formName}
                                        </p>
                                        <div className="pendingLinkFormsRouting">
                                            <div className="pendingLinkFormsRoutingLine"></div>
                                            <div className="pendingLinkFormsRoutingRoleCircle">
                                                <div
                                                    className="pendingLinkFormsRoutingCircle"
                                                    style={{
                                                        background:
                                                            (f.routingPending.includes(
                                                                "TM"
                                                            ) &&
                                                                "#FFCA28") ||
                                                            (f.routingApproved.includes(
                                                                "TM"
                                                            ) &&
                                                                "#28b834") ||
                                                            (f.routingRejected.includes(
                                                                "TM"
                                                            ) &&
                                                                "#dd1572"),
                                                    }}
                                                ></div>
                                                <p className="pendingLinkFormsRoutingRole">
                                                    TM
                                                </p>
                                            </div>
                                            <div className="pendingLinkFormsRoutingRoleCircle">
                                                <div
                                                    className="pendingLinkFormsRoutingCircle"
                                                    style={{
                                                        background:
                                                            (f.routingPending.includes(
                                                                "PL"
                                                            ) &&
                                                                "#FFCA28") ||
                                                            (f.routingApproved.includes(
                                                                "PL"
                                                            ) &&
                                                                "#28b834") ||
                                                            (f.routingRejected.includes(
                                                                "PL"
                                                            ) &&
                                                                "#dd1572"),
                                                    }}
                                                ></div>
                                                <p className="pendingLinkFormsRoutingRole">
                                                    PL
                                                </p>
                                            </div>
                                            <div className="pendingLinkFormsRoutingRoleCircle">
                                                <div
                                                    className="pendingLinkFormsRoutingCircle"
                                                    style={{
                                                        background:
                                                            (f.routingPending.includes(
                                                                "PM"
                                                            ) &&
                                                                "#FFCA28") ||
                                                            (f.routingApproved.includes(
                                                                "PM"
                                                            ) &&
                                                                "#28b834") ||
                                                            (f.routingRejected.includes(
                                                                "PM"
                                                            ) &&
                                                                "#dd1572"),
                                                    }}
                                                ></div>
                                                <p className="pendingLinkFormsRoutingRole">
                                                    PM
                                                </p>
                                            </div>
                                            <div className="pendingLinkFormsRoutingRoleCircle">
                                                <div
                                                    className="pendingLinkFormsRoutingCircle"
                                                    style={{
                                                        background:
                                                            (f.routingPending.includes(
                                                                "CO"
                                                            ) &&
                                                                "#FFCA28") ||
                                                            (f.routingApproved.includes(
                                                                "CO"
                                                            ) &&
                                                                "#28b834") ||
                                                            (f.routingRejected.includes(
                                                                "CO"
                                                            ) &&
                                                                "#dd1572"),
                                                    }}
                                                ></div>
                                                <p className="pendingLinkFormsRoutingRole">
                                                    CO
                                                </p>
                                            </div>
                                        </div>
                                        <p className="pendingLinkFormsCreator">
                                            {f.email}
                                        </p>
                                        <p className="pendingLinkFormsCreatedat">
                                            {moment(f.createdAt).format(
                                                "MMMM Do YYYY, h:mm:ss a"
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
            </div>
        </div>
    );
};

export default Pending;
