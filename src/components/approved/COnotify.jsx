import "./Approved.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const COnotify = () => {
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
        <div className="approvedContainer">
            <div className="approved">
                {forms &&
                    forms
                        .filter(
                            (form) =>
                                form.approved === "Approved" && form.COnotify
                        )
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={`/approved/${f._id}`}
                                    className="approvedLink"
                                >
                                    <div className="approvedLink" key={key}>
                                        <div className="approvedLinkForms">
                                            <p className="approvedLinkFormsName">
                                                {f.formName}
                                            </p>
                                            {f.approved === "Approved" && (
                                                <p className="approvedLinkFormsApproved">
                                                    Approved
                                                </p>
                                            )}
                                            <p className="approvedLinkFormsComment">
                                                {f.comment && `"${f.comment}"`}
                                            </p>
                                            <p className="approvedLinkFormsBy">
                                                by {f.approvalBy.email} (
                                                {f.approvalBy.supervisorRole})
                                            </p>
                                            <p className="approvedLinkFormsCreator">
                                                {f.email}
                                            </p>
                                            <p className="approvedLinkFormsCreatedat">
                                                {moment(f.createdAt).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
            </div>
        </div>
    );
};

export default COnotify;
