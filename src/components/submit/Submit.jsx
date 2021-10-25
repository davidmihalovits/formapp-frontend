import "./Submit.sass";
import { useState, useEffect } from "react";

const Submit = (props) => {
    const [loading, setLoading] = useState(false);
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
    const [isNcts, setIsNcts] = useState(Boolean);
    const [regulatoryNctsCode, setRegulatoryNctsCode] = useState("");
    const [regulatoryNctsEmail, setRegulatoryNctsEmail] = useState("");
    const [regulatoryForeignTravel, setRegulatoryForeignTravel] =
        useState("Foreign");
    const [regulatoryCiBrief, setRegulatoryCiBrief] = useState(false);
    const [regulatoryItEquipment, setRegulatoryItEquipment] = useState(false);
    const [regulatoryVisa, setRegulatoryVisa] = useState("Not required");
    const [travelAdvanceMoreThanTotal, setTravelAdvanceMoreThanTotal] =
        useState(false);

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

            await fetch(
                "https://awesome-minsky-48a20a.netlify.app/.netlify/functions/submitForm",
                //"http://localhost:8888/.netlify/functions/submitForm",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullName: fullName,
                        email: props.user && props.user.user.email,
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
                        startDate: startDate,
                        endDate: endDate,
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

    const onKeyPressDateFormat = (e) => {
        if (e.target.value.length === 2 || e.target.value.length === 5) {
            e.target.value += "/";
        }
    };

    /*useEffect(() => {
        const months = startDate.substring(0, 2);
        console.log(months);
        if (months > 12) {
            console.log("more than 12");
        }
    }, [startDate]);*/

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
    }, [showSection]);

    return (
        <div className="formContainer">
            <form className="form" onSubmit={submit} noValidate>
                <div className="formItems">
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
                                onChange={(e) => setFullName(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="email">
                                Email
                            </label>
                            <p className="formInput">
                                {props.user && props.user.user.email}
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
                            {(employeeId > 9999 || employeeId < 1) &&
                                employeeId && (
                                    <p className="formError">
                                        Employee ID must range from 1 to 9999.
                                    </p>
                                )}
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
                            <input
                                id="chargeCode"
                                name="chargeCode"
                                type="text"
                                value={chargeCode}
                                onChange={(e) => setChargeCode(e.target.value)}
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
                                onChange={(e) => setWorkCity(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="workState">
                                State
                            </label>
                            <input
                                id="workState"
                                name="workState"
                                type="text"
                                value={workState}
                                onChange={(e) => setWorkState(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="workZipcode">
                                Zipcode
                            </label>
                            <input
                                id="workZipcode"
                                name="workZipcode"
                                type="text"
                                value={workZipcode}
                                onChange={(e) => setWorkZipcode(e.target.value)}
                                className="formInput"
                            />
                            <button
                                onClick={() => setShowSection("ncts")}
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
                                <p className="nctsText">No</p>
                                <span
                                    className={
                                        !isNcts
                                            ? "nctsCheckboxChecked"
                                            : "nctsCheckboxUnchecked"
                                    }
                                    onClick={() => setIsNcts(false)}
                                >
                                    {!isNcts && (
                                        <span className="nctsCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                            </div>
                            <div className="nctsCheckboxText">
                                <p className="nctsText">Yes</p>
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
                                onClick={() => setShowSection("travel")}
                                type="button"
                                className="formButton"
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {showSection === "travel" && (
                        <div className="formItem">
                            <h2 className="formSubtitle">Travel Information</h2>
                            <div className="travelAdvanceCheckboxText">
                                <p className="travelAdvanceText">Foreign</p>
                                <span
                                    className={
                                        regulatoryForeignTravel === "Foreign"
                                            ? "travelAdvanceCheckboxChecked"
                                            : "travelAdvanceCheckboxUnchecked"
                                    }
                                    onClick={() =>
                                        setRegulatoryForeignTravel("Foreign")
                                    }
                                >
                                    {regulatoryForeignTravel === "Foreign" && (
                                        <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                            </div>
                            <p className="formTravelTypeText">Not in USA</p>
                            <div className="travelAdvanceCheckboxText">
                                <p className="travelAdvanceText">Virtual</p>
                                <span
                                    className={
                                        regulatoryForeignTravel === "Virtual"
                                            ? "travelAdvanceCheckboxChecked"
                                            : "travelAdvanceCheckboxUnchecked"
                                    }
                                    onClick={() =>
                                        setRegulatoryForeignTravel("Virtual")
                                    }
                                >
                                    {regulatoryForeignTravel === "Virtual" && (
                                        <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                            </div>
                            <p className="formTravelTypeText">
                                Takes place without travel
                            </p>
                            <div className="travelAdvanceCheckboxText">
                                <p className="travelAdvanceText">Local</p>
                                <span
                                    className={
                                        regulatoryForeignTravel === "Local"
                                            ? "travelAdvanceCheckboxChecked"
                                            : "travelAdvanceCheckboxUnchecked"
                                    }
                                    onClick={() =>
                                        setRegulatoryForeignTravel("Local")
                                    }
                                >
                                    {regulatoryForeignTravel === "Local" && (
                                        <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                            </div>
                            <p className="formTravelTypeText">
                                50 miles or less away but in USA
                            </p>
                            <div className="travelAdvanceCheckboxText">
                                <p className="travelAdvanceText">Domestic</p>
                                <span
                                    className={
                                        regulatoryForeignTravel === "Domestic"
                                            ? "travelAdvanceCheckboxChecked"
                                            : "travelAdvanceCheckboxUnchecked"
                                    }
                                    onClick={() =>
                                        setRegulatoryForeignTravel("Domestic")
                                    }
                                >
                                    {regulatoryForeignTravel === "Domestic" && (
                                        <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                    )}
                                </span>
                            </div>
                            <p className="formTravelTypeText">
                                Over 50 miles away but in USA
                            </p>
                            <label className="formLabel" htmlFor="travelMethod">
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
                                <option value="Rental Car">Rental Car</option>
                                <option value="Personal Vehicle">
                                    Personal Vehicle
                                </option>
                                <option value="Taxi/Uber">Taxi/Uber</option>
                                <option value="None">None</option>
                            </select>
                            <label className="formLabel" htmlFor="startDate">
                                Start Date
                            </label>
                            <div className="formInputBox">
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="text"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    maxLength="8"
                                    className="formInput"
                                    placeholder="mm/dd/yy"
                                    onKeyPress={(e) => onKeyPressDateFormat(e)}
                                />
                                {startDate.length === 8 && (
                                    <div className="formInputBoxCheckmark"></div>
                                )}
                            </div>
                            <label className="formLabel" htmlFor="endDate">
                                End Date
                            </label>
                            <div className="formInputBox">
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="text"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    maxLength="8"
                                    className="formInput"
                                    placeholder="mm/dd/yy"
                                    onKeyPress={(e) => onKeyPressDateFormat(e)}
                                />
                                {endDate.length === 8 && (
                                    <div className="formInputBoxCheckmark"></div>
                                )}
                            </div>
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
                                {startDate.length === 8 && endDate.length === 8
                                    ? isNaN(days)
                                        ? null
                                        : days
                                              .toLocaleString()
                                              .replaceAll(/[-]/g, "")
                                    : null}
                            </p>
                            <label className="formLabel" htmlFor="travelCity">
                                City
                            </label>
                            <input
                                id="travelCity"
                                name="travelCity"
                                type="text"
                                value={travelCity}
                                onChange={(e) => setTravelCity(e.target.value)}
                                className="formInput"
                            />
                            <label className="formLabel" htmlFor="travelState">
                                State
                            </label>
                            <input
                                id="travelState"
                                name="travelState"
                                type="text"
                                value={travelState}
                                onChange={(e) => setTravelState(e.target.value)}
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
                                onClick={() => setShowSection("estimated")}
                                type="button"
                                className="formButton"
                            >
                                Next
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
                                <p className="travelAdvanceText">
                                    Travel Advance
                                </p>
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
                                <button
                                    type="submit"
                                    className="formButton"
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowSection("regulatory")}
                                    type="button"
                                    className="formButton"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                    {showSection === "regulatory" && (
                        <>
                            <div className="formItem">
                                <h2 className="formSubtitle">Regulatory</h2>
                                <div className="travelAdvanceCheckboxText">
                                    <p className="travelAdvanceText">
                                        CI Brief
                                    </p>
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
                                </div>
                                <div className="travelAdvanceCheckboxText">
                                    <p className="travelAdvanceText">
                                        IT Equipment
                                    </p>
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
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Submit;
