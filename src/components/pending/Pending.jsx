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
                                    to={`/pending/${
                                        f._id
                                    }#${f.formName.replaceAll(/[. /]/g, "")}`}
                                    className="pendingLink"
                                >
                                    <div className="pendingLinkForms" form={f}>
                                        <p className="pendingLinkFormsName">
                                            {f.formName}
                                        </p>
                                        {f.approved === "Approved" && (
                                            <p className="pendingLinkFormsApproved">
                                                Approved
                                            </p>
                                        )}
                                        {f.approved === "Rejected" && (
                                            <p className="pendingLinkFormsRejected">
                                                Rejected
                                            </p>
                                        )}
                                        <p className="pendingLinkFormsComment">
                                            {f.comment && `"${f.comment}"`}
                                        </p>
                                        <p className="pendingLinkFormsBy">
                                            {f.approvalBy}
                                        </p>
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
