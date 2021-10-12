import "./Form.sass";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Form = () => {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [approveOrReject, setApproveOrReject] = useState("");

    const location = useLocation();

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
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => console.log(data));

            setLoading(false);
            alert("Successful.");
            return window.location.reload();
        } else {
            setLoading(false);
            return alert("Cancelled.");
        }
    };

    return (
        <div className="submittedformContainer">
            <div className="submittedform">
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
                <form
                    className="submittedformForm"
                    onSubmit={approveReject}
                    noValidate
                >
                    <label className="submittedformFormLabel" htmlFor="comment">
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
            </div>
        </div>
    );
};

export default Form;
