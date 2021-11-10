import "./Submit.sass";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Submit = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const today = new Date();
    let history = useHistory();

    const [loading, setLoading] = useState(false);
    const [showSection, setShowSection] = useState("general");
    const [travelPurpose, setTravelPurpose] = useState("");
    const [travelPurposeDropdown, setTravelPurposeDropdown] = useState("AMS");
    const [fullName, setFullName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("HBG");
    const [chargeCode, setChargeCode] = useState("ExampleChargeCode");
    const [task, setTask] = useState("ExampleTask");
    const [travelMethod, setTravelMethod] = useState("");
    const [isVirtual, setIsVirtual] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [destinationStreetAddress, setDestinationStreetAddress] =
        useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [destinationState, setDestinationState] = useState("");
    const [destinationZipcode, setDestinationZipcode] = useState("");
    const [justification, setJustification] = useState("");
    const [justificationType, setJustificationType] = useState("");
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
    const [isNcts, setIsNcts] = useState(Boolean);
    const [regulatoryNctsCode, setRegulatoryNctsCode] = useState("");
    const [regulatoryNctsEmail, setRegulatoryNctsEmail] = useState("");
    const [regulatoryForeignTravel, setRegulatoryForeignTravel] = useState(
        isVirtual ? null : "Foreign"
    );
    const [regulatoryCiBrief, setRegulatoryCiBrief] = useState(false);
    const [regulatoryItEquipment, setRegulatoryItEquipment] = useState(false);
    const [regulatoryVisa, setRegulatoryVisa] = useState("Not required");
    const [travelAdvanceMoreThanTotal, setTravelAdvanceMoreThanTotal] =
        useState(false);
    const [step, setStep] = useState("20%");

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

    const submit = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Submit form?");

        if (confirmed) {
            setLoading(true);

            await fetch(`${devprodUrl}/submitForm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    creator: props.user && props.user._id,
                    travelPurposeDropdown: travelPurposeDropdown,
                    travelPurpose: travelPurpose,
                    fullName: fullName,
                    email: props.user && props.user.email,
                    employeeId: employeeId,
                    program: program,
                    chargeCode: chargeCode,
                    task: task,
                    workStreetAddress:
                        program === "STARSS"
                            ? "1 Enterprise Parkway, Suite 200"
                            : "10210 Greenbelt Rd., Ste 600",
                    workCity: program === "STARSS" ? "Hampton" : "Lanham",
                    workState: program === "STARSS" ? "Virginia" : "MD",
                    workZipcode: program === "STARSS" ? "23666" : "20706",
                    travelDaysAway: isNaN(days)
                        ? ""
                        : days.toLocaleString().replaceAll(/[-]/g, ""),
                    travelMethod: travelMethod,
                    startDate: !startDate
                        ? ""
                        : moment(startDate).format("L").toString(),
                    endDate: !endDate
                        ? ""
                        : moment(endDate).format("L").toString(),
                    destinationStreetAddress: destinationStreetAddress,
                    destinationCity: destinationCity,
                    destinationState: destinationState,
                    destinationZipcode: destinationZipcode,
                    justification: justification,
                    justificationType: justificationType,
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

            setLoading(false);
            alert("Successful.");
            return history.push(`/myforms`);
        } else {
            setLoading(false);
            return alert("Cancelled.");
        }
    };

    var date1 = new Date(moment(startDate).format("L"));
    var date2 = new Date(moment(endDate).format("L"));
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
    }, [showSection]);

    if (props.user && props.user.role === "Supervisor") {
        return (
            <div
                style={{
                    display: "grid",
                    alignContent: "center",
                    textAlign: "center",
                    height: "100vh",
                }}
            >
                <p>You are a {props.user.role}. You can't submit forms.</p>
            </div>
        );
    }

    return (
        <div className="formContainer">
            <form className="form" onSubmit={submit} noValidate>
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
                        <p>{step === "60%" && isVirtual && "Step 3 of 3"}</p>
                        <p>
                            {step === "60%" &&
                                regulatoryForeignTravel !== "Foreign" &&
                                !isVirtual &&
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
                                !isVirtual &&
                                "Step 4 of 4"}
                        </p>
                        <p>{step === "100%" && isVirtual && "Step 3 of 3"}</p>
                    </div>
                    {showSection === "general" && (
                        <div className="formItem">
                            <h2 className="formSubtitle">
                                General Information
                            </h2>
                            <label
                                className="formLabel"
                                htmlFor="travelPurpose"
                            >
                                Conference/Workshop/Seminar
                            </label>
                            <select
                                id="travelPurpose"
                                name="travelPurpose"
                                type="text"
                                value={travelPurposeDropdown}
                                onChange={(e) =>
                                    setTravelPurposeDropdown(e.target.value)
                                }
                                className="formInput"
                                style={{
                                    cursor: "pointer",
                                    marginBottom: "5px",
                                }}
                            >
                                <option value="AMS">AMS</option>
                                <option value="AGU">AGU</option>
                            </select>
                            <input
                                id="travelPurpose"
                                name="travelPurpose"
                                type="text"
                                value={travelPurpose}
                                onChange={(e) =>
                                    setTravelPurpose(e.target.value)
                                }
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="fullName">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="email">
                                Email
                            </label>
                            <p className="formInput">
                                {props.user && props.user.email}
                            </p>
                            <label className="formLabel" htmlFor="employeeId">
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
                            <label className="formLabel" htmlFor="chargeCode">
                                Charge Code
                            </label>
                            <select
                                id="chargeCode"
                                name="chargeCode"
                                type="text"
                                value={chargeCode}
                                onChange={(e) => setChargeCode(e.target.value)}
                                className="formInput"
                                style={{ cursor: "pointer" }}
                            >
                                <option value="ExampleChargeCode">
                                    ExampleChargeCode
                                </option>
                            </select>
                            {/*<input
                                id="chargeCode"
                                name="chargeCode"
                                type="text"
                                value={chargeCode}
                                onChange={(e) => setChargeCode(e.target.value)}
                                className="formInput"
                            />*/}
                            <label className="formLabel" htmlFor="task">
                                Task
                            </label>
                            <select
                                id="task"
                                name="task"
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                className="formInput"
                                style={{ cursor: "pointer" }}
                            >
                                <option value="ExampleTask">ExampleTask</option>
                            </select>
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
                                Is this a conference/seminar/workshop in NCTS?
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
                                    onClick={() => setIsNcts(true)}
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
                            <div className="formVerbage">
                                <ul>
                                    <li className="formVerbageLi">
                                        Requests for NASA sponsored travel must
                                        be submitted in the NCTS system at least{" "}
                                        <span style={{ fontWeight: "700" }}>
                                            60 days in advance
                                        </span>
                                        .
                                    </li>
                                    <li className="formVerbageLi">
                                        Forward NCTS notifications to your
                                        Travel Administrator upon receipt.
                                    </li>
                                    <li className="formVerbageLi">
                                        Submit SSAI Travel Request Forms at the
                                        same time as the NCTS request.
                                    </li>
                                    <li className="formVerbageLi">
                                        HTSOS or FACT training may be required
                                        if you are traveling to a foreign
                                        country. Please contact your Travel
                                        Administrator for more information.
                                    </li>
                                    <li className="formVerbageLi">
                                        Foreign travel may require a CI briefing
                                        before travel. Please contact your
                                        Travel Administrator for more
                                        information.
                                    </li>
                                    <li className="formVerbageLi">
                                        There is a NAMS workflow, found on ID
                                        Max, you must complete to request
                                        permission to take a government computer
                                        or access NASA data while on foreign
                                        travel.
                                    </li>
                                </ul>
                            </div>
                            <button
                                onClick={() => {
                                    setShowSection("travel");
                                    setStep("60%");
                                    setIsVirtual(false);
                                    setRegulatoryForeignTravel("Foreign");
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
                            <h2 className="formSubtitle">Travel Information</h2>
                            <p className="formLabel">
                                Is this a virtual travel?
                            </p>
                            <div className="nctsCheckboxText">
                                <span
                                    className={
                                        !isVirtual
                                            ? "nctsCheckboxChecked"
                                            : "nctsCheckboxUnchecked"
                                    }
                                    onClick={() => {
                                        setIsVirtual(false);

                                        setStartDate(
                                            today.setDate(today.getDate() + 30)
                                        );
                                        setEndDate(
                                            today.setDate(today.getDate() + 1)
                                        );
                                        setRegulatoryForeignTravel("Foreign");
                                        setStep("60%");
                                    }}
                                >
                                    {!isVirtual && (
                                        <span className="nctsCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                                <p className="nctsText">No</p>
                            </div>
                            <div className="nctsCheckboxText">
                                <span
                                    className={
                                        isVirtual
                                            ? "nctsCheckboxChecked"
                                            : "nctsCheckboxUnchecked"
                                    }
                                    onClick={() => {
                                        setIsVirtual(true);
                                        setStartDate("");
                                        setEndDate("");
                                        setRegulatoryForeignTravel("Virtual");
                                        setStep("100%");
                                    }}
                                >
                                    {isVirtual && (
                                        <span className="nctsCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                                <p className="nctsText">Yes</p>
                            </div>
                            {!isVirtual && (
                                <>
                                    <p className="formLabel">Travel Type</p>
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
                                        <p className="travelAdvanceText">
                                            Foreign
                                        </p>
                                    </div>
                                    <p className="formTravelTypeText">
                                        Not in USA
                                    </p>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                regulatoryForeignTravel ===
                                                "Local"
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setRegulatoryForeignTravel(
                                                    "Local"
                                                )
                                            }
                                        >
                                            {regulatoryForeignTravel ===
                                                "Local" && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            Local
                                        </p>
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
                                            onClick={() =>
                                                setRegulatoryForeignTravel(
                                                    "Domestic"
                                                )
                                            }
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
                                        <option value="Taxi/Uber">
                                            Taxi/Uber
                                        </option>
                                    </select>
                                    <label
                                        className="formLabel"
                                        htmlFor="startDate"
                                    >
                                        Start Date
                                    </label>
                                    <DatePicker
                                        closeOnScroll={true}
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                        }}
                                        minDate={new Date()}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        todayButton="Today"
                                        dateFormat="MM/dd/yyyy"
                                        calendarStartDay={1}
                                        className="formInput"
                                    />
                                    <label
                                        className="formLabel"
                                        htmlFor="endDate"
                                    >
                                        End Date
                                    </label>
                                    <DatePicker
                                        closeOnScroll={true}
                                        selected={endDate}
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
                                            End date must be higher than start
                                            date.
                                        </p>
                                    )}
                                    <label
                                        className="formLabel"
                                        htmlFor="travelDaysAway"
                                    >
                                        Number of Nights at this location
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
                                    <h3 className="formSublabel">
                                        Origination Address
                                    </h3>
                                    <label
                                        className="formLabel"
                                        htmlFor="workStreetAddress"
                                    >
                                        Street Address
                                    </label>
                                    <p className="formInput">
                                        {program === "STARSS"
                                            ? "1 Enterprise Parkway, Suite 200"
                                            : "10210 Greenbelt Rd., Ste 600"}
                                    </p>
                                    <label
                                        className="formLabel"
                                        htmlFor="workCity"
                                    >
                                        City
                                    </label>
                                    <p className="formInput">
                                        {program === "STARSS"
                                            ? "Hampton"
                                            : "Lanham"}
                                    </p>
                                    <label
                                        className="formLabel"
                                        htmlFor="workState"
                                    >
                                        State
                                    </label>
                                    <p className="formInput">
                                        {program === "STARSS"
                                            ? "Virginia"
                                            : "MD"}
                                    </p>
                                    <label
                                        className="formLabel"
                                        htmlFor="workZipcode"
                                    >
                                        Zipcode
                                    </label>
                                    <p className="formInput">
                                        {program === "STARSS"
                                            ? "23666"
                                            : "20706"}
                                    </p>
                                    <h3 className="formSublabel">
                                        Destination Address
                                    </h3>
                                    <label
                                        className="formLabel"
                                        htmlFor="destinationStreetAddress"
                                    >
                                        Street Address
                                    </label>
                                    <input
                                        id="destinationStreetAddress"
                                        name="destinationStreetAddress"
                                        type="text"
                                        value={destinationStreetAddress}
                                        onChange={(e) =>
                                            setDestinationStreetAddress(
                                                e.target.value
                                            )
                                        }
                                        className="formInput"
                                    />
                                    <label
                                        className="formLabel"
                                        htmlFor="destinationCity"
                                    >
                                        City
                                    </label>
                                    <input
                                        id="destinationCity"
                                        name="destinationCity"
                                        type="text"
                                        value={destinationCity}
                                        onChange={(e) =>
                                            setDestinationCity(e.target.value)
                                        }
                                        className="formInput"
                                    />
                                    <label
                                        className="formLabel"
                                        htmlFor="destinationState"
                                    >
                                        State
                                    </label>
                                    <input
                                        id="destinationState"
                                        name="destinationState"
                                        type="text"
                                        value={destinationState}
                                        onChange={(e) =>
                                            setDestinationState(e.target.value)
                                        }
                                        className="formInput"
                                    />
                                    <label
                                        className="formLabel"
                                        htmlFor="destinationZipcode"
                                    >
                                        Zipcode
                                    </label>
                                    <input
                                        id="destinationZipcode"
                                        name="destinationZipcode"
                                        type="text"
                                        value={destinationZipcode}
                                        onChange={(e) =>
                                            setDestinationZipcode(
                                                e.target.value
                                            )
                                        }
                                        className="formInput"
                                    />
                                    <h3 className="formSublabel">
                                        Justification
                                    </h3>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                justificationType ===
                                                "Presenting"
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setJustificationType(
                                                    "Presenting"
                                                )
                                            }
                                        >
                                            {justificationType ===
                                                "Presenting" && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            Presenting
                                        </p>
                                    </div>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                justificationType ===
                                                "Poster Session"
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setJustificationType(
                                                    "Poster Session"
                                                )
                                            }
                                        >
                                            {justificationType ===
                                                "Poster Session" && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            Poster Session
                                        </p>
                                    </div>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                justificationType ===
                                                "Mission Support"
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setJustificationType(
                                                    "Mission Support"
                                                )
                                            }
                                        >
                                            {justificationType ===
                                                "Mission Support" && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            Mission Support
                                        </p>
                                    </div>
                                    <div className="travelAdvanceCheckboxText">
                                        <span
                                            className={
                                                justificationType ===
                                                "Chair Person"
                                                    ? "travelAdvanceCheckboxChecked"
                                                    : "travelAdvanceCheckboxUnchecked"
                                            }
                                            onClick={() =>
                                                setJustificationType(
                                                    "Chair Person"
                                                )
                                            }
                                        >
                                            {justificationType ===
                                                "Chair Person" && (
                                                <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                            )}
                                        </span>
                                        <p className="travelAdvanceText">
                                            Chair Person
                                        </p>
                                    </div>
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
                                </>
                            )}
                            {regulatoryForeignTravel === "Foreign" && (
                                <div className="formVerbage">
                                    <ul>
                                        <li className="formVerbageLi">
                                            Submit SSAI Travel Request Forms for
                                            international travel at least{" "}
                                            <span style={{ fontWeight: "700" }}>
                                                35 days in advance
                                            </span>
                                            .
                                        </li>
                                        <li className="formVerbageLi">
                                            Ensure that your passport and visa
                                            are valid; passports often need to
                                            be valid for at least 6 months
                                            BEYOND travel dates.
                                        </li>
                                        <li className="formVerbageLi">
                                            Check for any travel advisories
                                            before leaving on international
                                            travel.
                                        </li>
                                        <li className="formVerbageLi">
                                            Register travel with the U.S. State
                                            Department’s Smart Traveler
                                            Enrollment Program (STEP).
                                        </li>
                                        <li className="formVerbageLi">
                                            Computer security best practices are
                                            that employees take ACES or SSAI
                                            loaner laptops on foreign travel
                                            rather than their usual machines.
                                            Goddard has a document that contains
                                            helpful information.
                                        </li>
                                    </ul>
                                </div>
                            )}
                            {!isVirtual ? (
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
                            ) : (
                                <button
                                    type="submit"
                                    className="formButton"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                            )}
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
                            <label className="formLabel" htmlFor="rentalCost">
                                Rental Cost
                            </label>
                            <input
                                id="rentalCost"
                                name="rentalCost"
                                type="number"
                                value={rentalCost}
                                onChange={(e) => setRentalCost(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="mileageCost">
                                Mileage Cost
                            </label>
                            <input
                                id="mileageCost"
                                name="mileageCost"
                                type="number"
                                value={mileageCost}
                                onChange={(e) => setMileageCost(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="lodgingCost">
                                Lodging Cost
                            </label>
                            <input
                                id="lodgingCost"
                                name="lodgingCost"
                                type="number"
                                value={lodgingCost}
                                onChange={(e) => setLodgingCost(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="mealsCost">
                                Meals Cost
                            </label>
                            <input
                                id="mealsCost"
                                name="mealsCost"
                                type="number"
                                value={mealsCost}
                                onChange={(e) => setMealsCost(e.target.value)}
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
                            <label className="formLabel" htmlFor="otherCost">
                                Other Cost
                            </label>
                            <input
                                id="otherCost"
                                name="otherCost"
                                type="number"
                                value={otherCost}
                                onChange={(e) => setOtherCost(e.target.value)}
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
                                    Travel advance amount can't be higher than
                                    total travel cost.
                                </p>
                            )}
                            {regulatoryForeignTravel !== "Foreign" ? (
                                <>
                                    <button
                                        type="submit"
                                        className="formButton"
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Submit"}
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
                                {loading ? "Loading..." : "Submit"}
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
            </form>
        </div>
    );
};

export default Submit;
