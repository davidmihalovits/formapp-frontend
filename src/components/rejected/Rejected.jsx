import "./Rejected.sass";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rejected = () => {
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
        <div className="pendingContainer">
            <div className="pending">
                {forms &&
                    forms
                        .filter((form) => form.approved === "Rejected")
                        .map((f, key) => {
                            return (
                                <Link
                                    key={key}
                                    to={{
                                        pathname: `/pending/${f.formName.replaceAll(
                                            /[. /-]/g,
                                            ""
                                        )}`,
                                        state: { props: f },
                                    }}
                                    className="pendingLink"
                                >
                                    <div className="pendingLinkForms">
                                        <p className="pendingLinkFormsName">
                                            {f.formName}
                                        </p>
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
                                    </div>
                                </Link>
                            );
                        })}
            </div>
        </div>
    );
};

export default Rejected;
