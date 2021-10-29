import "./Rejected.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rejected = (props) => {
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
        <div className="rejectedContainer">
            <div className="rejected">
                {forms &&
                    forms
                        .filter((form) => form.approved === "Rejected")
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={`/rejected/${
                                        f._id
                                    }#${f.formName.replaceAll(/[. /]/g, "")}`}
                                    className="rejectedLink"
                                >
                                    <div className="rejectedLinkForms">
                                        <p className="rejectedLinkFormsName">
                                            {f.formName}
                                        </p>
                                        {f.approved === "Rejected" && (
                                            <p className="rejectedLinkFormsRejected">
                                                Rejected
                                            </p>
                                        )}
                                        <p className="rejectedLinkFormsComment">
                                            {f.comment && `"${f.comment}"`}
                                        </p>
                                        <p className="rejectedLinkFormsBy">
                                            {f.approvalBy}
                                        </p>
                                        <p className="rejectedLinkFormsCreator">
                                            {f.email}
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
