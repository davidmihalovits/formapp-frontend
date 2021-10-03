import "./Form.sass";
import { useState, useEffect } from "react";

const Form = () => {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("");
    const [chargeCode, setChargeCode] = useState("");
    const [workStreetAddress, setWorkStreetAddress] = useState("");
    const [workCity, setWorkCity] = useState("");
    const [workState, setWorkState] = useState("");
    const [workZipcode, setWorkZipcode] = useState("");
    const [travelDaysAway, setTravelDaysAway] = useState("");
    const [travelMethod, setTravelMethod] = useState("");
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
    const [regulatoryNctsCode, setRegulatoryNctsCode] = useState("");
    const [regulatoryNctsEmail, setRegulatoryNctsEmail] = useState("");
    const [regulatoryForeignTravel, setRegulatoryForeignTravel] = useState("");
    const [regulatoryCiBrief, setRegulatoryCiBrief] = useState("");
    const [regulatoryItEquipment, setRegulatoryItEquipment] = useState("");

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

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="formContainer">
            <form className="form" onSubmit={submit} noValidate>
                <div className="formItems">
                    <div className="formItem">
                        <h2 className="formSubtitle">General Information</h2>
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
                            placeholder="Joe Smith"
                        />
                        <label className="formLabel" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="employeeId">
                            Employee ID
                        </label>
                        <input
                            id="employeeId"
                            name="employeeId"
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="program">
                            Program
                        </label>
                        <input
                            id="program"
                            name="program"
                            type="text"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            className="formInput"
                        />
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
                            placeholder="10210 Greenbelt Rd"
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
                            placeholder="Lanham"
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
                            placeholder="MD"
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
                    </div>
                    <div className="formItem">
                        <h2 className="formSubtitle">Travel Information</h2>
                        <label className="formLabel" htmlFor="travelDaysAway">
                            Days Away
                        </label>
                        <input
                            id="travelDaysAway"
                            name="travelDaysAway"
                            type="text"
                            value={travelDaysAway}
                            onChange={(e) => setTravelDaysAway(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="travelMethod">
                            Travel Method
                        </label>
                        <input
                            id="travelMethod"
                            name="travelMethod"
                            type="text"
                            value={travelMethod}
                            onChange={(e) => setTravelMethod(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            id="startDate"
                            name="startDate"
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="endDate">
                            End Date
                        </label>
                        <input
                            id="endDate"
                            name="endDate"
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="formInput"
                        />
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
                        <label className="formLabel" htmlFor="travelCountry">
                            Country
                        </label>
                        <input
                            id="travelCountry"
                            name="travelCountry"
                            type="text"
                            value={travelCountry}
                            onChange={(e) => setTravelCountry(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel" htmlFor="justification">
                            Justification
                        </label>
                        <textarea
                            id="justification"
                            name="justification"
                            type="text"
                            value={justification}
                            onChange={(e) => setJustification(e.target.value)}
                            className="formTextarea"
                        />
                        <div className="travelAdvanceCheckboxText">
                            <p className="travelAdvanceText">Travel Advance</p>
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
                    </div>
                    <div className="formItem">
                        <h2 className="formSubtitle">Estimated Cost</h2>
                        <label className="formLabel" htmlFor="transportCost">
                            Transport Cost
                        </label>
                        <input
                            id="transportCost"
                            name="transportCost"
                            type="number"
                            value={transportCost}
                            onChange={(e) => setTransportCost(e.target.value)}
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
                        <label className="formLabel" htmlFor="registrationFees">
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
                            <p className="costTotalAmount">{totalCostAmount}</p>
                        </div>
                    </div>
                    <div className="formItem">
                        <h2 className="formSubtitle">Regulatory</h2>
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
                                setRegulatoryNctsCode(e.target.value)
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
                                setRegulatoryNctsEmail(e.target.value)
                            }
                            className="formInput"
                        />
                        <div className="travelAdvanceCheckboxText">
                            <p className="travelAdvanceText">Foreign Travel</p>
                            <span
                                className={
                                    regulatoryForeignTravel
                                        ? "travelAdvanceCheckboxChecked"
                                        : "travelAdvanceCheckboxUnchecked"
                                }
                                onClick={() =>
                                    setRegulatoryForeignTravel(
                                        !regulatoryForeignTravel
                                    )
                                }
                            >
                                {regulatoryForeignTravel && (
                                    <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                )}
                            </span>
                        </div>
                        <div className="travelAdvanceCheckboxText">
                            <p className="travelAdvanceText">CI Brief</p>
                            <span
                                className={
                                    regulatoryCiBrief
                                        ? "travelAdvanceCheckboxChecked"
                                        : "travelAdvanceCheckboxUnchecked"
                                }
                                onClick={() =>
                                    setRegulatoryCiBrief(!regulatoryCiBrief)
                                }
                            >
                                {regulatoryCiBrief && (
                                    <span className="travelAdvanceCheckboxCheckedCheckmark"></span>
                                )}
                            </span>
                        </div>
                        <div className="travelAdvanceCheckboxText">
                            <p className="travelAdvanceText">IT Equipment</p>
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
                    </div>
                </div>
                <button type="submit" className="formButton" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
};

export default Form;
