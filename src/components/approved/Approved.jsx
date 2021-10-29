import "./Approved.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Approved = () => {
    const [forms, setForms] = useState([]);

    const getForms = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/getForms",
            //"http://localhost:8888/.netlify/functions/getForms",
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setForms(data));
    };

    useEffect(() => {
        getForms();
    }, []);

    return (
        <div className="approvedContainer">
            <div className="approved">
                {forms &&
                    forms
                        .filter((form) => form.approved === "Approved")
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={`/approved/${
                                        f._id
                                    }#${f.formName.replaceAll(/[. /]/g, "")}`}
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
                                                {f.approvalBy}
                                            </p>
                                            <p className="approvedLinkFormsCreator">
                                                {f.email}
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

export default Approved;
