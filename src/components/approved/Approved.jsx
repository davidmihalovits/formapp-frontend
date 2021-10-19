import "./Approved.sass";
import { useEffect, useState } from "react";

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
        <div className="pendingContainer">
            <div className="pending">
                {forms &&
                    forms
                        .filter((form) => form.approved === "Approved")
                        .map((f, key) => {
                            return (
                                <div className="pendingLink" key={key}>
                                    <div className="pendingLinkForms">
                                        <p className="pendingLinkFormsName">
                                            {f.formName}
                                        </p>
                                        {f.approved === "Approved" && (
                                            <p className="pendingLinkFormsApproved">
                                                Approved
                                            </p>
                                        )}
                                        <p className="pendingLinkFormsComment">
                                            {f.comment && `"${f.comment}"`}
                                        </p>
                                        <p className="pendingLinkFormsBy">
                                            {f.approvalBy}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
            </div>
        </div>
    );
};

export default Approved;
