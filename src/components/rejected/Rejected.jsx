import "./Rejected.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Rejected = (props) => {
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
        <div className="rejectedContainer">
            <div className="rejected">
                {forms &&
                    forms
                        .filter((form) => form.approved === "Rejected")
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={`/rejected/${f._id}`}
                                    className="rejectedLink"
                                >
                                    <div className="rejectedLinkForms">
                                        <div className="rejectedLinkFormsTag">
                                            Rejected
                                        </div>
                                        <p className="rejectedLinkFormsName">
                                            {f.formName}
                                        </p>
                                        <div>
                                            {f.approved === "Rejected" && (
                                                <p className="rejectedLinkFormsRejected">
                                                    <span
                                                        style={{
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Rejected
                                                    </span>{" "}
                                                    <span
                                                        style={{
                                                            fontWeight: "300",
                                                            fontStyle: "italic",
                                                        }}
                                                    >
                                                        {f.comment &&
                                                            `"${f.comment}"`}
                                                    </span>
                                                </p>
                                            )}
                                            <p className="rejectedLinkFormsBy">
                                                by {f.approvalBy.email} (
                                                {f.approvalBy.supervisorRole})
                                            </p>
                                        </div>
                                        <p className="rejectedLinkFormsCreator">
                                            {f.email}
                                        </p>
                                        <p className="rejectedLinkFormsCreatedat">
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

export default Rejected;
