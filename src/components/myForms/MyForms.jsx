import "./MyForms.sass";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MyForms = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [forms, setForms] = useState([]);

    const getMyForms = async () => {
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
        getMyForms();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="myformsContainer">
            <div className="myforms">
                {forms
                    .filter((f) => f.email === props.user.email)
                    .map((f, key) => {
                        return (
                            <Link
                                key={key}
                                /*to={`/pending/${f._id}#${f.formName.replaceAll(
                                    /[. /]/g,
                                    ""
                                )}`}*/
                                to={`/${f.approved}/${f._id}`}
                                className="myformsLink"
                            >
                                <div className="myformsLinkForms" form={f}>
                                    <p className="myformsLinkFormsName">
                                        {f.formName}
                                    </p>
                                    <div className="myformsLinkFormsRouting">
                                        <div className="myformsLinkFormsRoutingRoleCircle">
                                            <div
                                                className="myformsLinkFormsRoutingCircle"
                                                style={{
                                                    background:
                                                        (f.routingPending.includes(
                                                            "TM"
                                                        ) &&
                                                            "#FDD835") ||
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
                                            <p className="myformsLinkFormsRoutingRole">
                                                TM
                                            </p>
                                        </div>
                                        <div className="myformsLinkFormsRoutingRoleCircle">
                                            <div
                                                className="myformsLinkFormsRoutingCircle"
                                                style={{
                                                    background:
                                                        (f.routingPending.includes(
                                                            "PL"
                                                        ) &&
                                                            "#FDD835") ||
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
                                            <p className="myformsLinkFormsRoutingRole">
                                                PL
                                            </p>
                                        </div>
                                        <div className="myformsLinkFormsRoutingRoleCircle">
                                            <div
                                                className="myformsLinkFormsRoutingCircle"
                                                style={{
                                                    background:
                                                        (f.routingPending.includes(
                                                            "PM"
                                                        ) &&
                                                            "#FDD835") ||
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
                                            <p className="myformsLinkFormsRoutingRole">
                                                PM
                                            </p>
                                        </div>
                                        <div className="myformsLinkFormsRoutingRoleCircle">
                                            <div
                                                className="myformsLinkFormsRoutingCircle"
                                                style={{
                                                    background:
                                                        (f.routingPending.includes(
                                                            "CO"
                                                        ) &&
                                                            "#FDD835") ||
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
                                            <p className="myformsLinkFormsRoutingRole">
                                                CO
                                            </p>
                                        </div>
                                    </div>
                                    {f.approved === "Approved" && (
                                        <p className="myformsLinkFormsApproved">
                                            Approved
                                        </p>
                                    )}
                                    {f.approved === "Rejected" && (
                                        <p className="myformsLinkFormsRejected">
                                            Rejected
                                        </p>
                                    )}
                                    <p className="myformsLinkFormsComment">
                                        {f.comment && `"${f.comment}"`}
                                    </p>
                                    <p className="myformsLinkFormsBy">
                                        {f.approvalBy.email} (
                                        {f.approvalBy.supervisorRole})
                                    </p>
                                    <p className="myformsLinkFormsCreator">
                                        {f.email}
                                    </p>
                                    <p className="myformsLinkFormsCreatedat">
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

export default MyForms;
