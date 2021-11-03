import "./Form.sass";
import { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [form, setForm] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [approveOrReject, setApproveOrReject] = useState("");
    const [activity, setActivity] = useState("");
    const [editForm, setEditForm] = useState(false);

    const [showSection, setShowSection] = useState("general");
    const [fullName, setFullName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("HBG");
    const [chargeCode, setChargeCode] = useState("");
    const [workStreetAddress, setWorkStreetAddress] = useState("");
    const [workCity, setWorkCity] = useState("");
    const [workState, setWorkState] = useState("");
    const [workZipcode, setWorkZipcode] = useState("");
    const [travelMethod, setTravelMethod] = useState("Air");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelCity, setTravelCity] = useState("");
    const [travelState, setTravelState] = useState("");
    const [travelCountry, setTravelCountry] = useState("");
    const [justification, setJustification] = useState("");
    const [travelAdvanceCheckbox, setTravelAdvanceCheckbox] = useState(false);
    const [travelAdvanceAmount, setTravelAdvanceAmount] = useState("");
    const [transportCost, setTransportCost] = useState("");
    const [rentalCost, setRentalCost] = useState("");
    const [mileageCost, setMileageCost] = useState("");
    const [lodgingCost, setLodgingCost] = useState("");
    const [mealsCost, setMealsCost] = useState("");
    const [registrationFees, setRegistrationFees] = useState("");
    const [otherCost, setOtherCost] = useState("");
    const [totalCostAmount, setTotalCostAmount] = useState("");
    const [isNcts, setIsNcts] = useState(false);
    const [regulatoryNctsCode, setRegulatoryNctsCode] = useState("");
    const [regulatoryNctsEmail, setRegulatoryNctsEmail] = useState("");
    const [regulatoryForeignTravel, setRegulatoryForeignTravel] =
        useState("Foreign");
    const [regulatoryCiBrief, setRegulatoryCiBrief] = useState(false);
    const [regulatoryItEquipment, setRegulatoryItEquipment] = useState(false);
    const [regulatoryVisa, setRegulatoryVisa] = useState("");
    const [travelAdvanceMoreThanTotal, setTravelAdvanceMoreThanTotal] =
        useState(false);
    const [step, setStep] = useState("20%");
    const [route, setRoute] = useState("");

    useEffect(() => {
        const calculateTotalCostAmount = () => {
            setTotalCostAmount(
                Number(transportCost) +
                    Number(rentalCost) +
                    Number(mileageCost) +
                    Number(lodgingCost) +
                    Number(mealsCost) +
                    Number(registrationFees) +
                    Number(otherCost)
            );
        };

        calculateTotalCostAmount();
    }, [
        transportCost,
        rentalCost,
        mileageCost,
        lodgingCost,
        mealsCost,
        registrationFees,
        otherCost,
    ]);

    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var difference = date1.getTime() - date2.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));
    const date1Hours = date1.setHours(0, 0, 0, 0);
    const date2Hours = date2.setHours(0, 0, 0, 0);

    useEffect(() => {
        const travelAdvMoreThanTravelCost =
            travelAdvanceAmount > totalCostAmount;

        if (travelAdvMoreThanTravelCost) setTravelAdvanceMoreThanTotal(true);
        if (!travelAdvMoreThanTravelCost) setTravelAdvanceMoreThanTotal(false);
    }, [travelAdvanceAmount, totalCostAmount]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [showSection, editForm]);

    const getForm = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(
            `${devprodUrl}/getForm?id=${props.match.params.id}`,

            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setForm(data));
    };

    const viewed = async () => {
        await fetch(`${devprodUrl}/viewForm`, {
            method: "POST",
            /*headers: {
                    Authorization: token,
                },*/
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: form._id,
                email: form.email,
                user: props.user.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const getActivity = async () => {
        await fetch(`${devprodUrl}/getActivity`, {
            method: "GET",
            headers: {
                form: form._id,
            },
        })
            .then((res) => res.json())
            .then((data) => setActivity(data));
    };

    useEffect(() => {
        getForm();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFullName(form.fullName);
        setEmployeeId(form.employeeId);
        setProgram(form.program);
        setChargeCode(form.chargeCode);
        setWorkStreetAddress(form.workStreetAddress);
        setWorkCity(form.workCity);
        setWorkState(form.workState);
        setWorkZipcode(form.workZipcode);

        setRegulatoryNctsCode(form.regulatoryNctsCode);
        setRegulatoryNctsEmail(form.regulatoryNctsEmail);

        setRegulatoryForeignTravel(form.regulatoryForeignTravel);
        setTravelMethod(form.travelMethod);
        setStartDate(form.startDate);
        setEndDate(form.endDate);
        setTravelCity(form.travelCity);
        setTravelState(form.travelState);
        setTravelCountry(form.travelCountry);
        setJustification(form.justification);

        setTransportCost(form.transportCost);
        setRentalCost(form.rentalCost);
        setMileageCost(form.mileageCost);
        setLodgingCost(form.lodgingCost);
        setMealsCost(form.mealsCost);
        setRegistrationFees(form.registrationFees);
        setOtherCost(form.otherCost);
        setTotalCostAmount(form.totalCostAmount);
        setTravelAdvanceCheckbox(form.travelAdvanceCheckbox);
        setTravelAdvanceAmount(form.travelAdvanceAmount);

        setRegulatoryCiBrief(form.regulatoryCiBrief);
        setRegulatoryItEquipment(form.regulatoryItEquipment);
        setRegulatoryVisa(form.regulatoryVisa);
    }, [form]);

    useEffect(() => {
        if (form) {
            getActivity();
        }

        // eslint-disable-next-line
    }, [form]);

    useEffect(() => {
        if (props.user && form) {
            viewed();
        }

        // eslint-disable-next-line
    }, [props.user, form]);

    const approveReject = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        const confirmed = window.confirm("Are you sure?");

        if (confirmed) {
            setLoading(true);

            await fetch(`${devprodUrl}/approveReject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    comment: comment,
                    approved: approveOrReject,
                    formDetails: form,
                    email: props.user.email,
                }),
            })
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

    const submitEdit = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Edit form?");

        if (confirmed) {
            await fetch(`${devprodUrl}/editForm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: form._id,
                    formNameLastDigit: form.formName.split("-").pop().trim(),
                    fullName: fullName,
                    email: props.user && props.user.email,
                    employeeId: employeeId,
                    program: program,
                    chargeCode: chargeCode,
                    workStreetAddress: workStreetAddress,
                    workCity: workCity,
                    workState: workState,
                    workZipcode: workZipcode,
                    travelDaysAway: days
                        .toLocaleString()
                        .replaceAll(/[-]/g, ""),
                    travelMethod: travelMethod,
                    startDate: moment(startDate).format("L").toString(),
                    endDate: moment(endDate).format("L").toString(),
                    travelCity: travelCity,
                    travelState: travelState,
                    travelCountry: travelCountry,
                    justification: justification,
                    travelAdvanceCheckbox: travelAdvanceCheckbox,
                    travelAdvanceAmount: travelAdvanceAmount,
                    transportCost: transportCost,
                    rentalCost: rentalCost,
                    mileageCost: mileageCost,
                    lodgingCost: lodgingCost,
                    mealsCost: mealsCost,
                    registrationFees: registrationFees,
                    otherCost: otherCost,
                    totalCostAmount: totalCostAmount,
                    regulatoryNctsCode: regulatoryNctsCode,
                    regulatoryNctsEmail: regulatoryNctsEmail,
                    regulatoryForeignTravel: regulatoryForeignTravel,
                    regulatoryCiBrief: regulatoryCiBrief,
                    regulatoryItEquipment: regulatoryItEquipment,
                    regulatoryVisa: regulatoryVisa,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));

            alert("Successful edit.");
            return window.location.reload();
        } else {
            return alert("Cancelled edit.");
        }
    };

    const submitComment = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Edit form?");

        if (confirmed) {
            await fetch(`${devprodUrl}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: form._id,
                    email: props.user && props.user.email,
                    comment: comment,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));

            alert("Successful comment.");
            return window.location.reload();
        } else {
            return alert("Cancelled comment.");
        }
    };

    const routing = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/route`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                id: form._id,
                routing: route,
            }),
        })
            .then((res) => res.json())
            .then((data) => alert(data));

        return window.location.reload();
    };

    if (editForm) {
        return (
            <div className="formContainer">
                <form className="form" onSubmit={submitEdit} noValidate>
                    <div className="formItems">
                        <div className="formStep">
                            <div
                                style={{ width: step }}
                                className="formStepCompleted"
                            ></div>
                        </div>
                        <div className="formStepCounter">
                            <p>{step === "20%" && "Step 1 of 5"}</p>
                            <p>{step === "40%" && "Step 2 of 5"}</p>
                            <p>
                                {step === "60%" &&
                                    regulatoryForeignTravel === "Foreign" &&
                                    "Step 3 of 5"}
                            </p>
                            <p>
                                {step === "60%" &&
                                    regulatoryForeignTravel !== "Foreign" &&
                                    "Step 3 of 4"}
                            </p>
                            <p>
                                {step === "80%" &&
                                    regulatoryForeignTravel === "Foreign" &&
                                    "Step 4 of 5"}
                            </p>
                            <p>
                                {step === "100%" &&
                                    regulatoryForeignTravel === "Foreign" &&
                                    "Step 5 of 5"}
                            </p>
                            <p>
                                {step === "100%" &&
                                    regulatoryForeignTravel !== "Foreign" &&
                                    "Step 4 of 4"}
                            </p>
                        </div>
                        {showSection === "general" && (
                            <div className="formItem">
                                <h2 className="formSubtitle">
                                    General Information
                                </h2>
                                <label className="formLabel" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label className="formLabel" htmlFor="email">
                                    Email
                                </label>
                                <p className="formInput">
                                    {props.user && props.user.email}
                                </p>
                                <label
                                    className="formLabel"
                                    htmlFor="employeeId"
                                >
                                    Employee ID
                                </label>
                                <input
                                    id="employeeId"
                                    name="employeeId"
                                    type="text"
                                    value={employeeId}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (
                                            e.target.value === "" ||
                                            re.test(e.target.value)
                                        ) {
                                            setEmployeeId(e.target.value);
                                        }
                                    }}
                                    className="formInput"
                                    placeholder="1 - 9999"
                                    maxLength="4"
                                />
                                <label className="formLabel" htmlFor="program">
                                    Program
                                </label>
                                <select
                                    id="program"
                                    name="program"
                                    type="text"
                                    value={program}
                                    onChange={(e) => setProgram(e.target.value)}
                                    className="formInput"
                                    style={{ cursor: "pointer" }}
                                >
                                    <option value="HBG">HBG</option>
                                    <option value="STARSS">STARSS</option>
                                    <option value="ESES">ESES</option>
                                    <option value="TESS">TESS</option>
                                    <option value="SAMDA">SAMDA</option>
                                    <option value="LITES">LITES</option>
                                    <option value="SSAIHQ">SSAIHQ</option>
                                    <option value="TIDES">TIDES</option>
                                    <option value="GEUSTAR">GEUSTAR</option>
                                </select>
                                <label
                                    className="formLabel"
                                    htmlFor="chargeCode"
                                >
                                    Charge Code
                                </label>
                                <input
                                    id="chargeCode"
                                    name="chargeCode"
                                    type="text"
                                    value={chargeCode}
                                    onChange={(e) =>
                                        setChargeCode(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="workStreetAddress"
                                >
                                    Street Address
                                </label>
                                <input
                                    id="workStreetAddress"
                                    name="workStreetAddress"
                                    type="text"
                                    value={workStreetAddress}
                                    onChange={(e) =>
                                        setWorkStreetAddress(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label className="formLabel" htmlFor="workCity">
                                    City
                                </label>
                                <input
                                    id="workCity"
                                    name="workCity"
                                    type="text"
                                    value={workCity}
                                    onChange={(e) =>
                                        setWorkCity(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="workState"
                                >
                                    State
                                </label>
                                <input
                                    id="workState"
                                    name="workState"
                                    type="text"
                                    value={workState}
                                    onChange={(e) =>
                                        setWorkState(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="workZipcode"
                                >
                                    Zipcode
                                </label>
                                <input
                                    id="workZipcode"
                                    name="workZipcode"
                                    type="text"
                                    value={workZipcode}
                                    onChange={(e) =>
                                        setWorkZipcode(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <button
                                    onClick={() => {
                                        setShowSection("ncts");
                                        setStep("40%");
                                    }}
                                    type="button"
                                    className="formButton"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {showSection === "ncts" && (
                            <div className="formItem">
                                <h2 className="formSubtitle">
                                    NASA Conference Travel System
                                </h2>
                                <p className="formLabel">
                                    Is this a conference/seminar/workshop in
                                    NCTS?
                                </p>
                                <div className="nctsCheckboxText">
                                    <span
                                        className={
                                            !isNcts
                                                ? "nctsCheckboxChecked"
                                                : "nctsCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            setIsNcts(false);
                                            setRegulatoryNctsCode("");
                                            setRegulatoryNctsEmail("");
                                        }}
                                    >
                                        {!isNcts && (
                                            <span className="nctsCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="nctsText">No</p>
                                </div>
                                <div className="nctsCheckboxText">
                                    <span
                                        className={
                                            isNcts
                                                ? "nctsCheckboxChecked"
                                                : "nctsCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            setIsNcts(true);
                                            setRegulatoryNctsCode(
                                                form.regulatoryNctsCode
                                            );
                                            setRegulatoryNctsEmail(
                                                form.regulatoryNctsEmail
                                            );
                                        }}
                                    >
                                        {isNcts && (
                                            <span className="nctsCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="nctsText">Yes</p>
                                </div>
                                {isNcts && (
                                    <>
                                        <label
                                            className="formLabel"
                                            htmlFor="regulatoryNctsCode"
                                        >
                                            NCTS Code
                                        </label>
                                        <input
                                            id="regulatoryNctsCode"
                                            name="regulatoryNctsCode"
                                            type="text"
                                            value={regulatoryNctsCode}
                                            onChange={(e) =>
                                                setRegulatoryNctsCode(
                                                    e.target.value
                                                )
                                            }
                                            className="formInput"
                                        />
                                        <label
                                            className="formLabel"
                                            htmlFor="regulatoryNctsEmail"
                                        >
                                            NCTS Email
                                        </label>
                                        <input
                                            id="regulatoryNctsEmail"
                                            name="regulatoryNctsEmail"
                                            type="text"
                                            value={regulatoryNctsEmail}
                                            onChange={(e) =>
                                                setRegulatoryNctsEmail(
                                                    e.target.value
                                                )
                                            }
                                            className="formInput"
                                        />
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        setShowSection("travel");
                                        setStep("60%");
                                    }}
                                    type="button"
                                    className="formButton"
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => {
                                        setShowSection("general");
                                        setStep("20%");
                                    }}
                                    type="button"
                                    className="formButtonBack"
                                >
                                    Back
                                </button>
                            </div>
                        )}
                        {showSection === "travel" && (
                            <div className="formItem">
                                <h2 className="formSubtitle">
                                    Travel Information
                                </h2>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            regulatoryForeignTravel ===
                                            "Foreign"
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() =>
                                            setRegulatoryForeignTravel(
                                                "Foreign"
                                            )
                                        }
                                    >
                                        {regulatoryForeignTravel ===
                                            "Foreign" && (
                                            <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="travelAdvanceText">Foreign</p>
                                </div>
                                <p className="formTravelTypeText">Not in USA</p>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            regulatoryForeignTravel ===
                                            "Virtual"
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            setRegulatoryForeignTravel(
                                                "Virtual"
                                            );
                                            setRegulatoryVisa("N/A");
                                        }}
                                    >
                                        {regulatoryForeignTravel ===
                                            "Virtual" && (
                                            <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="travelAdvanceText">Virtual</p>
                                </div>
                                <p className="formTravelTypeText">
                                    Takes place without travel
                                </p>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            regulatoryForeignTravel === "Local"
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            setRegulatoryForeignTravel("Local");
                                            setRegulatoryVisa("N/A");
                                        }}
                                    >
                                        {regulatoryForeignTravel ===
                                            "Local" && (
                                            <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="travelAdvanceText">Local</p>
                                </div>
                                <p className="formTravelTypeText">
                                    50 miles or less away but in USA
                                </p>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            regulatoryForeignTravel ===
                                            "Domestic"
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            setRegulatoryForeignTravel(
                                                "Domestic"
                                            );
                                            setRegulatoryVisa("N/A");
                                        }}
                                    >
                                        {regulatoryForeignTravel ===
                                            "Domestic" && (
                                            <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="travelAdvanceText">
                                        Domestic
                                    </p>
                                </div>
                                <p className="formTravelTypeText">
                                    Over 50 miles away but in USA
                                </p>
                                <label
                                    className="formLabel"
                                    htmlFor="travelMethod"
                                >
                                    Travel Method
                                </label>
                                <select
                                    id="travelMethod"
                                    name="travelMethod"
                                    type="text"
                                    value={travelMethod}
                                    onChange={(e) =>
                                        setTravelMethod(e.target.value)
                                    }
                                    className="formInput"
                                    style={{ cursor: "pointer" }}
                                >
                                    <option value="Air">Air</option>
                                    <option value="Train">Train</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Rental Car">
                                        Rental Car
                                    </option>
                                    <option value="Personal Vehicle">
                                        Personal Vehicle
                                    </option>
                                    <option value="Taxi/Uber">Taxi/Uber</option>
                                    <option value="None">None</option>
                                </select>
                                <label
                                    className="formLabel"
                                    htmlFor="startDate"
                                >
                                    Start Date
                                </label>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={new Date(startDate)}
                                    onChange={(date) => setStartDate(date)}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    todayButton="Today"
                                    dateFormat="MM/dd/yyyy"
                                    calendarStartDay={1}
                                    className="formInput"
                                />
                                <label className="formLabel" htmlFor="endDate">
                                    End Date
                                </label>
                                <DatePicker
                                    closeOnScroll={true}
                                    selected={new Date(endDate)}
                                    onChange={(date) => setEndDate(date)}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    todayButton="Today"
                                    dateFormat="MM/dd/yyyy"
                                    calendarStartDay={1}
                                    className="formInput"
                                />
                                {date1Hours >= date2Hours && (
                                    <p className="formError">
                                        End date must be higher than start date.
                                    </p>
                                )}
                                <label
                                    className="formLabel"
                                    htmlFor="travelDaysAway"
                                >
                                    Days Away
                                </label>
                                <p
                                    className="formInput"
                                    style={{
                                        height: "53.2px",
                                        cursor: "not-allowed",
                                    }}
                                >
                                    {!isNaN(days) && date1Hours < date2Hours
                                        ? days
                                              .toLocaleString()
                                              .replaceAll(/[-]/g, "")
                                        : "-"}
                                </p>
                                <label
                                    className="formLabel"
                                    htmlFor="travelCity"
                                >
                                    City
                                </label>
                                <input
                                    id="travelCity"
                                    name="travelCity"
                                    type="text"
                                    value={travelCity}
                                    onChange={(e) =>
                                        setTravelCity(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="travelState"
                                >
                                    State
                                </label>
                                <input
                                    id="travelState"
                                    name="travelState"
                                    type="text"
                                    value={travelState}
                                    onChange={(e) =>
                                        setTravelState(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="travelCountry"
                                >
                                    Country
                                </label>
                                <input
                                    id="travelCountry"
                                    name="travelCountry"
                                    type="text"
                                    value={travelCountry}
                                    onChange={(e) =>
                                        setTravelCountry(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="justification"
                                >
                                    Justification
                                </label>
                                <textarea
                                    id="justification"
                                    name="justification"
                                    type="text"
                                    value={justification}
                                    onChange={(e) =>
                                        setJustification(e.target.value)
                                    }
                                    className="formTextarea"
                                />
                                <button
                                    onClick={() => {
                                        setShowSection("estimated");
                                        if (
                                            regulatoryForeignTravel !==
                                            "Foreign"
                                        ) {
                                            setStep("100%");
                                        } else {
                                            setStep("80%");
                                        }
                                    }}
                                    type="button"
                                    className="formButton"
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => {
                                        setShowSection("ncts");
                                        setStep("40%");
                                    }}
                                    type="button"
                                    className="formButtonBack"
                                >
                                    Back
                                </button>
                            </div>
                        )}
                        {showSection === "estimated" && (
                            <div className="formItem">
                                <h2 className="formSubtitle">Estimated Cost</h2>
                                <label
                                    className="formLabel"
                                    htmlFor="transportCost"
                                >
                                    Transport Cost
                                </label>
                                <input
                                    id="transportCost"
                                    name="transportCost"
                                    type="number"
                                    value={transportCost}
                                    onChange={(e) =>
                                        setTransportCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="rentalCost"
                                >
                                    Rental Cost
                                </label>
                                <input
                                    id="rentalCost"
                                    name="rentalCost"
                                    type="number"
                                    value={rentalCost}
                                    onChange={(e) =>
                                        setRentalCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="mileageCost"
                                >
                                    Mileage Cost
                                </label>
                                <input
                                    id="mileageCost"
                                    name="mileageCost"
                                    type="number"
                                    value={mileageCost}
                                    onChange={(e) =>
                                        setMileageCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="lodgingCost"
                                >
                                    Lodging Cost
                                </label>
                                <input
                                    id="lodgingCost"
                                    name="lodgingCost"
                                    type="number"
                                    value={lodgingCost}
                                    onChange={(e) =>
                                        setLodgingCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="mealsCost"
                                >
                                    Meals Cost
                                </label>
                                <input
                                    id="mealsCost"
                                    name="mealsCost"
                                    type="number"
                                    value={mealsCost}
                                    onChange={(e) =>
                                        setMealsCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="registrationFees"
                                >
                                    Registration Fees
                                </label>
                                <input
                                    id="registrationFees"
                                    name="registrationFees"
                                    type="number"
                                    value={registrationFees}
                                    onChange={(e) =>
                                        setRegistrationFees(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label
                                    className="formLabel"
                                    htmlFor="otherCost"
                                >
                                    Other Cost
                                </label>
                                <input
                                    id="otherCost"
                                    name="otherCost"
                                    type="number"
                                    value={otherCost}
                                    onChange={(e) =>
                                        setOtherCost(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <div className="costTotalContainer">
                                    <p className="costTotalText">Total:</p>
                                    <p className="costTotalAmount">
                                        {totalCostAmount}
                                    </p>
                                </div>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            travelAdvanceCheckbox
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() =>
                                            setTravelAdvanceCheckbox(
                                                !travelAdvanceCheckbox
                                            )
                                        }
                                    >
                                        {travelAdvanceCheckbox && (
                                            <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="travelAdvanceText">
                                        Travel Advance
                                    </p>
                                </div>
                                <label
                                    className="formLabel"
                                    htmlFor="travelAdvanceAmount"
                                >
                                    Amount
                                </label>
                                <input
                                    id="travelAdvanceAmount"
                                    name="travelAdvanceAmount"
                                    type="text"
                                    value={travelAdvanceAmount}
                                    onChange={(e) =>
                                        setTravelAdvanceAmount(e.target.value)
                                    }
                                    className="formInput"
                                />
                                {travelAdvanceMoreThanTotal && (
                                    <p className="formError">
                                        Travel advance amount can't be higher
                                        than total travel cost.
                                    </p>
                                )}
                                {regulatoryForeignTravel !== "Foreign" ? (
                                    <>
                                        <button
                                            type="submit"
                                            className="formButton"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Loading..."
                                                : "Accept Edit"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowSection("travel");
                                                setStep("60%");
                                            }}
                                            type="button"
                                            className="formButtonBack"
                                        >
                                            Back
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setShowSection("regulatory");
                                                setStep("100%");
                                            }}
                                            type="button"
                                            className="formButton"
                                        >
                                            Next
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowSection("travel");
                                                setStep("60%");
                                            }}
                                            type="button"
                                            className="formButtonBack"
                                        >
                                            Back
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        {showSection === "regulatory" && (
                            <>
                                <div className="formItem">
                                    <h2 className="formSubtitle">Regulatory</h2>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                regulatoryCiBrief
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setRegulatoryCiBrief(
                                                    !regulatoryCiBrief
                                                )
                                            }
                                        >
                                            {regulatoryCiBrief && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            CI Brief
                                        </p>
                                    </div>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                regulatoryItEquipment
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setRegulatoryItEquipment(
                                                    !regulatoryItEquipment
                                                )
                                            }
                                        >
                                            {regulatoryItEquipment && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            IT Equipment
                                        </p>
                                    </div>
                                    <label
                                        className="formLabel"
                                        htmlFor="regulatoryVisa"
                                    >
                                        Visa Status
                                    </label>
                                    <select
                                        id="regulatoryVisa"
                                        name="regulatoryVisa"
                                        type="text"
                                        value={regulatoryVisa}
                                        onChange={(e) =>
                                            setRegulatoryVisa(e.target.value)
                                        }
                                        className="formInput"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <option value="Not required">
                                            Not required
                                        </option>
                                        <option value="Pending">Pending</option>
                                        <option value="Valid">Valid</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="formButton"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Accept Edit"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowSection("estimated");
                                        setStep("80%");
                                    }}
                                    type="button"
                                    className="formButtonBack"
                                >
                                    Back
                                </button>
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setShowSection("general");
                            setEditForm(false);
                            setStep("20%");
                        }}
                        type="button"
                        className="formButtonCancel"
                    >
                        Cancel Edit
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="submittedformContainer">
            <div className="submittedform">
                <div>
                    <div className="submittedformActivity">
                        <h2 className="submittedformActivityTitle">Routing</h2>
                        {form.approved === "Approved" && (
                            <p className="submittedformActivityRouting">
                                Form is already approved.
                            </p>
                        )}
                        {(form.approved === "Rejected" || !form.approved) && (
                            <p className="submittedformActivityRouting">
                                Form is waiting for approval from {form.routing}
                                .
                            </p>
                        )}
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
                                                <>
                                                    <p className="submittedformActivityText">
                                                        Signed by:
                                                        <br />
                                                        {a.signedBy}
                                                    </p>
                                                    {a.approved ===
                                                        "Approved" && (
                                                        <p className="submittedformActivityApproved">
                                                            Approved
                                                        </p>
                                                    )}
                                                    {a.approved ===
                                                        "Rejected" && (
                                                        <p className="submittedformActivityRejected">
                                                            Rejected
                                                        </p>
                                                    )}
                                                    <p className="submittedformActivityComment">
                                                        {a.comment}
                                                    </p>
                                                </>
                                            )}
                                            {a.viewedBy && (
                                                <p className="submittedformActivityText">
                                                    Viewed by:
                                                    <br />
                                                    {a.viewedBy}
                                                </p>
                                            )}
                                            {a.editedBy && (
                                                <p className="submittedformActivityText">
                                                    Edited by:
                                                    <br />
                                                    {a.editedBy}
                                                </p>
                                            )}
                                            {a.commentBy && (
                                                <>
                                                    <p className="submittedformActivityText">
                                                        Comment by:
                                                        <br />
                                                        {a.commentBy}
                                                    </p>
                                                    <p className="submittedformActivityComment">
                                                        {a.comment}
                                                    </p>
                                                </>
                                            )}
                                            <p className="submittedformActivityText">
                                                {moment(a.date).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                )}
                                            </p>
                                        </div>
                                    );
                                })
                                .reverse()}
                        <div className="submittedformActivityList">
                            <p className="submittedformActivityText">
                                Created by:
                                <br />
                                {activity.createdBy}
                            </p>
                            <p className="submittedformActivityText">
                                {moment(activity.createdAt).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    {props.user &&
                    props.user.email === form.email &&
                    form.approved !== "Approved" ? (
                        <button
                            className="submittedformEditButton"
                            onClick={() => setEditForm(true)}
                        >
                            Edit Form
                        </button>
                    ) : null}
                    <div className="submittedformItems">
                        <h2 className="submittedformItemsSubtitle">
                            General Information
                        </h2>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Form Name:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.formName}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Full Name:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.fullName}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">Email:</p>
                            <p className="submittedformDetailsInput">
                                {form.email}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Employee ID:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.employeeId}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Program:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.program}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Charge Code:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.chargeCode}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Street Address:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.workStreetAddress}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">City:</p>
                            <p className="submittedformDetailsInput">
                                {form.workCity}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">State:</p>
                            <p className="submittedformDetailsInput">
                                {form.workState}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">Zip:</p>
                            <p className="submittedformDetailsInput">
                                {form.workZipcode}
                            </p>
                        </div>
                        <h2 className="submittedformItemsSubtitle">
                            NASA Conference Travel System
                        </h2>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                NCTS Code:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryNctsCode}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                NCTS Email:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryNctsEmail}
                            </p>
                        </div>
                        <h2 className="submittedformItemsSubtitle">
                            Travel Information
                        </h2>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Travel Type:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryForeignTravel}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Travel Method:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelMethod}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Start Date:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.startDate}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                End Date:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.endDate}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Days Away:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelDaysAway}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">City:</p>
                            <p className="submittedformDetailsInput">
                                {form.travelCity}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">State:</p>
                            <p className="submittedformDetailsInput">
                                {form.travelState}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Country:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelCountry}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Justification:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.justification}
                            </p>
                        </div>
                        <h2 className="submittedformItemsSubtitle">
                            Estimated Cost
                        </h2>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Estimated Cost:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.totalCostAmount}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Travel Advance:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelAdvanceCheckbox ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">Amount:</p>
                            <p className="submittedformDetailsInput">
                                {form.travelAdvanceAmount
                                    ? form.travelAdvanceAmount
                                    : "0"}
                            </p>
                        </div>
                        <h2 className="submittedformItemsSubtitle">
                            Regulatory
                        </h2>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                CI Brief:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryCiBrief ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                IT Equipment:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryItEquipment ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Visa Status
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.regulatoryVisa}
                            </p>
                        </div>
                    </div>
                    {props.user &&
                    form &&
                    props.user.role !== "Traveler" &&
                    props.user.supervisorRole !== "TA" &&
                    props.user.email !== form.email &&
                    form.approved !== "Approved" &&
                    form.routing.includes(props.user.supervisorRole) ? (
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
                                    onClick={() =>
                                        setApproveOrReject("Approved")
                                    }
                                    type="submit"
                                    className="submittedformFormButtonsButton"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Approve"}
                                </button>
                                <button
                                    onClick={() =>
                                        setApproveOrReject("Rejected")
                                    }
                                    type="submit"
                                    className="submittedformFormButtonsButton"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Reject"}
                                </button>
                            </div>
                        </form>
                    ) : null}
                    {props.user &&
                    props.user.email === form.email &&
                    form.approved === "Rejected" ? (
                        <form
                            className="submittedformForm"
                            onSubmit={submitComment}
                            noValidate
                        >
                            <label
                                className="submittedformFormLabel"
                                htmlFor="comment"
                            >
                                My comment
                            </label>
                            <input
                                id="comment"
                                name="comment"
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="submittedformFormInput"
                            />
                            <button
                                type="submit"
                                className="submittedformFormButton"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Submit Comment"}
                            </button>
                        </form>
                    ) : null}
                    {props.user &&
                        props.user.supervisorRole === "TA" &&
                        form.approved !== "Approved" &&
                        form.approved !== "Rejected" &&
                        props.user.email !== form.email && (
                            <div className="submittedformRouting">
                                <h2 className="submittedformRoutingTitle">
                                    Routing
                                </h2>
                                <div className="submittedformRoutingCheckboxText">
                                    <span
                                        className={
                                            route.includes("TM")
                                                ? "submittedformRoutingCheckboxChecked"
                                                : "submittedformRoutingCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (route.includes("TM")) {
                                                return setRoute(
                                                    route.replace("TM ", "")
                                                );
                                            }
                                            setRoute(route.concat("TM "));
                                        }}
                                    >
                                        {route.includes("TM") && (
                                            <span className="submittedformRoutingCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="submittedformRoutingText">
                                        TM
                                    </p>
                                </div>
                                <div className="submittedformRoutingCheckboxText">
                                    <span
                                        className={
                                            route.includes("PL")
                                                ? "submittedformRoutingCheckboxChecked"
                                                : "submittedformRoutingCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (route.includes("PL ")) {
                                                return setRoute(
                                                    route.replace("PL ", "")
                                                );
                                            }
                                            setRoute(route.concat("PL "));
                                        }}
                                    >
                                        {route.includes("PL") && (
                                            <span className="submittedformRoutingCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="submittedformRoutingText">
                                        PL
                                    </p>
                                </div>
                                <div className="submittedformRoutingCheckboxText">
                                    <span
                                        className={
                                            route.includes("PM")
                                                ? "submittedformRoutingCheckboxChecked"
                                                : "submittedformRoutingCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (route.includes("PM")) {
                                                return setRoute(
                                                    route.replace("PM ", "")
                                                );
                                            }
                                            setRoute(route.concat("PM "));
                                        }}
                                    >
                                        {route.includes("PM") && (
                                            <span className="submittedformRoutingCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="submittedformRoutingText">
                                        PM
                                    </p>
                                </div>
                                <div className="submittedformRoutingCheckboxText">
                                    <span
                                        className={
                                            route.includes("CO")
                                                ? "submittedformRoutingCheckboxChecked"
                                                : "submittedformRoutingCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (route.includes("CO")) {
                                                return setRoute(
                                                    route.replace("CO ", "")
                                                );
                                            }
                                            setRoute(route.concat("CO "));
                                        }}
                                    >
                                        {route.includes("CO") && (
                                            <span className="submittedformRoutingCheckboxCheckedCheckmark"></span>
                                        )}
                                    </span>
                                    <p className="submittedformRoutingText">
                                        CO
                                    </p>
                                </div>
                                <button
                                    className="submittedformRoutingButton"
                                    onClick={() => routing()}
                                >
                                    Route
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Form;
