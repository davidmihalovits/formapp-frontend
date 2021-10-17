import "./Form.sass";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

const Form = (props) => {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [approveOrReject, setApproveOrReject] = useState("");
    const [activity, setActivity] = useState("");

    const location = useLocation();

    const viewed = async () => {
        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/viewForm",
            //"http://localhost:8888/.netlify/functions/viewForm",
            {
                method: "POST",
                /*headers: {
                    Authorization: token,
                },*/
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: location.state.props._id,
                    email: location.state.props.email,
                    user: props.user.user.email,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const getActivity = async () => {
        await fetch(
            "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/getActivity",
            //"http://localhost:8888/.netlify/functions/getActivity",
            {
                method: "GET",
                headers: {
                    form: location.state.props._id,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setActivity(data));
    };

    useEffect(() => {
        if (props.user) {
            viewed();
        }
        getActivity();
        // eslint-disable-next-line
    }, [props.user]);

    const approveReject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        const confirmed = window.confirm("Are you sure?");

        if (confirmed) {
            setLoading(true);

            await fetch(
                "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/approveReject",
                //"http://localhost:8888/.netlify/functions/approveReject",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        comment: comment,
                        approved: approveOrReject,
                        formDetails: location.state.props,
                        email: props.user.user.email,
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => console.log(data));

            setLoading(false);
            alert("Successfully signed.");
            return window.location.reload();
        } else {
            setLoading(false);
            return alert("Cancelled.");
        }
    };

    return (
        <div className="submittedformContainer">
            <div className="submittedform">
                <div className="submittedformActivity">
                    <h2 className="submittedformActivityTitle">Activity</h2>
                    {activity &&
                        activity.activity
                            .map((a, key) => {
                                return (
                                    <div
                                        className="submittedformActivityList"
                                        key={key}
                                    >
                                        {a.signedBy && (
                                            <p className="submittedformActivityText">
                                                Signed by: {a.signedBy}
                                            </p>
                                        )}
                                        {a.viewedBy && (
                                            <p className="submittedformActivityText">
                                                Viewed by: {a.viewedBy}
                                            </p>
                                        )}

                                        <p className="submittedformActivityText">
                                            Time: {a.date}
                                        </p>
                                    </div>
                                );
                            })
                            .reverse()}
                    <div className="submittedformActivityList">
                        <p className="submittedformActivityText">
                            Created by: {activity.createdBy}
                        </p>
                        <p className="submittedformActivityText">
                            Time:{" "}
                            {moment
                                .utc(activity.createdAt)
                                .format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                    </div>
                </div>
                <div className="submittedformItems">
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Form Name:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.formName}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Full Name:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.fullName}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Email:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.email}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Employee ID:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.employeeId}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Program:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.program}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Charge Code:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.chargeCode}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Street Address:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.workStreetAddress}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">City:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.workCity}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">State:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.workState}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Zip:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.workZipcode}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Days Away:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelDaysAway}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Travel Method:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelMethod}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Start Date:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.startDate}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">End Date:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.endDate}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">City:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelCity}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">State:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelState}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Country:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelCountry}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Justification:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.justification}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Travel Advance:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelAdvanceCheckbox
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">Amount:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.travelAdvanceAmount
                                ? location.state.props.travelAdvanceAmount
                                : "0"}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Estimated Cost:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.totalCostAmount}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">NCTS Code:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.regulatoryNctsCode}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">NCTS Email:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.regulatoryNctsEmail}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            Foreign Travel:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.regulatoryForeignTravel
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">CI Brief:</p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.regulatoryCiBrief
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                    <div className="submittedformDetails">
                        <p className="submittedformDetailsTitle">
                            IT Equipment:
                        </p>
                        <p className="submittedformDetailsInput">
                            {location.state.props.regulatoryItEquipment
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                </div>
                {props.user && props.user.user.role !== "Traveler" ? (
                    <form
                        className="submittedformForm"
                        onSubmit={approveReject}
                        noValidate
                    >
                        <label
                            className="submittedformFormLabel"
                            htmlFor="comment"
                        >
                            Comment
                        </label>
                        <input
                            id="comment"
                            name="comment"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="submittedformFormInput"
                        />
                        <div className="submittedformFormButtons">
                            <button
                                onClick={() => setApproveOrReject("Approved")}
                                type="submit"
                                className="submittedformFormButtonsButton"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Approve"}
                            </button>
                            <button
                                onClick={() => setApproveOrReject("Rejected")}
                                type="submit"
                                className="submittedformFormButtonsButton"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Reject"}
                            </button>
                        </div>
                    </form>
                ) : null}
                <div className="submittedformFeedback">
                    {location.state.props.approved === "Approved" && (
                        <p className="submittedformFeedbackApproved">
                            {location.state.props.approved}
                        </p>
                    )}
                    {location.state.props.approved === "Rejected" && (
                        <p className="submittedformFeedbackRejected">
                            {location.state.props.approved}
                        </p>
                    )}
                    <p className="submittedformFeedbackComment">
                        {location.state.props.comment}
                    </p>
                    <p className="submittedformFeedbackBy">
                        {location.state.props.approvalBy}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Form;
