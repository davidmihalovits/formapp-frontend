import "./Form.sass";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import chargeCodesCsv from "../../assets/chargecodes.csv";

const Form = (props) => {
    const params = useParams();

    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const [form, setForm] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [approveOrReject, setApproveOrReject] = useState("");
    const [editForm, setEditForm] = useState(false);

    const [showSection, setShowSection] = useState("general");
    const [travelPurpose, setTravelPurpose] = useState("");
    const [travelPurposeDropdown, setTravelPurposeDropdown] = useState("AMS");
    const [fullName, setFullName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("HBG");
    const [chargeCode, setChargeCode] = useState("");
    const [task, setTask] = useState("");
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
    const [regulatoryVisa, setRegulatoryVisa] = useState("");
    const [travelAdvanceMoreThanTotal, setTravelAdvanceMoreThanTotal] =
        useState(false);
    const [step, setStep] = useState("20%");

    const [messageToCO, setMessageToCO] = useState("");

    const [chargeCodes, setChargeCodes] = useState([]);

    const getChargeCodes = async () => {
        const response = await fetch(chargeCodesCsv);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        const data = results.data;
        setChargeCodes(data);
    };
    useEffect(() => {
        getChargeCodes();
    }, [editForm]);

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
        setFormLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(
            `${devprodUrl}/getForm?id=${params.id}`,

            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setForm(data));

        setFormLoading(false);
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
                user: props.user._id,
                userEmail: props.user.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    useEffect(() => {
        getForm();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setTravelPurposeDropdown(form.travelPurposeDropdown);
        setTravelPurpose(form.travelPurpose);
        setFullName(form.fullName);
        setEmployeeId(form.employeeId);
        setProgram(form.program);
        setChargeCode(form.chargeCode);
        setTask(form.task);
        /*setWorkStreetAddress(form.workStreetAddress);
        setWorkCity(form.workCity);
        setWorkState(form.workState);
        setWorkZipcode(form.workZipcode);*/

        setRegulatoryNctsCode(form.regulatoryNctsCode);
        setRegulatoryNctsEmail(form.regulatoryNctsEmail);

        setRegulatoryForeignTravel(form.regulatoryForeignTravel);
        setTravelMethod(form.travelMethod);
        setStartDate(new Date(form.startDate));
        setEndDate(new Date(form.endDate));
        setDestinationStreetAddress(form.destinationStreetAddress);
        setDestinationCity(form.destinationCity);
        setDestinationState(form.destinationState);
        setDestinationZipcode(form.destinationZipcode);
        setJustification(form.justification);
        setJustificationType(form.justificationType);

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

        // eslint-disable-next-line

        if (form.regulatoryNctsCode || form.regulatoryNctsEmail) {
            setIsNcts(true);
        }
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
                    user: props.user,
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
                    startDate: startDate,
                    endDate: endDate,
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
                    userId: props.user._id,
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

        const confirmed = window.confirm("Comment on form?");

        if (confirmed) {
            await fetch(`${devprodUrl}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: form._id,
                    formName: form.formName,
                    user: props.user && props.user,
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

    /*const routing = async () => {
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
                routingPending: route,
            }),
        })
            .then((res) => res.json())
            .then((data) => alert(data));

        return window.location.reload();
    };*/

    const routeTo = async (r) => {
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
                routingPending: r,
                routedBy: props.user,
                messageToCO: messageToCO,
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
                                    id="travelPurposeDropdown"
                                    name="travelPurposeDropdown"
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
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <label className="formLabel" htmlFor="email">
                                    Email
                                </label>
                                <p className="formInput formInputEmail">
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
                                    placeholder="1 - 999999"
                                    maxLength="6"
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
                                {(program === "HBG" ||
                                    program === "STARSS" ||
                                    program === "ESES" ||
                                    program === "TESS" ||
                                    program === "SAMDA" ||
                                    program === "LITES") && (
                                    <select
                                        id="chargeCode"
                                        name="chargeCode"
                                        type="text"
                                        value={chargeCode}
                                        onChange={(e) =>
                                            setChargeCode(e.target.value)
                                        }
                                        className="formInput"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program === "HBG" &&
                                                    program === "HBG"
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program ===
                                                        "STARSS III" &&
                                                    program === "STARSS"
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program === "ESES III" &&
                                                    program === "ESES"
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program ===
                                                        "TESS Bridge" &&
                                                    program === "TESS"
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program === "SAMDA" &&
                                                    program === "SAMDA" &&
                                                    p.chargeCode.includes("CY5")
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                        {chargeCodes
                                            .filter(
                                                (p) =>
                                                    p.program ===
                                                        "LITES - II" &&
                                                    program === "LITES"
                                            )
                                            .map((c, key) => {
                                                return (
                                                    <option
                                                        value={c.chargeCode}
                                                        key={key}
                                                    >
                                                        {c.chargeCode}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                )}
                                {(program === "SSAIHQ" ||
                                    program === "TIDES" ||
                                    program === "GEUSTAR") && (
                                    <input
                                        id="chargeCode"
                                        name="chargeCode"
                                        type="text"
                                        value={chargeCode}
                                        onChange={(e) =>
                                            setChargeCode(e.target.value)
                                        }
                                        className="formInput"
                                        placeholder="Type your charge code"
                                    />
                                )}
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
                                    <option value="ExampleTask">
                                        ExampleTask
                                    </option>
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
                                <div className="formVerbage">
                                    <ul>
                                        <li className="formVerbageLi">
                                            Requests for NASA sponsored travel
                                            must be submitted in the NCTS system
                                            at least{" "}
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
                                            Submit SSAI Travel Request Forms at
                                            the same time as the NCTS request.
                                        </li>
                                        <li className="formVerbageLi">
                                            HTSOS or FACT training may be
                                            required if you are traveling to a
                                            foreign country. Please contact your
                                            Travel Administrator for more
                                            information.
                                        </li>
                                        <li className="formVerbageLi">
                                            Foreign travel may require a CI
                                            briefing before travel. Please
                                            contact your Travel Administrator
                                            for more information.
                                        </li>
                                        <li className="formVerbageLi">
                                            There is a NAMS workflow, found on
                                            ID Max, you must complete to request
                                            permission to take a government
                                            computer or access NASA data while
                                            on foreign travel.
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowSection("travel");
                                        setStep("60%");
                                        //setIsVirtual(false);
                                        //setRegulatoryForeignTravel(
                                        //    form.regulatoryForeignTravel
                                        //);
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
                                                new Date(form.startDate)
                                            );
                                            setEndDate(new Date(form.endDate));
                                            setRegulatoryForeignTravel(
                                                form.regulatoryForeignTravel
                                            );
                                            setTravelMethod(form.travelMethod);
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
                                            //setStartDate("");
                                            //setEndDate("");
                                            setRegulatoryForeignTravel(
                                                "Virtual"
                                            );
                                            setTravelMethod("None");
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
                                    </>
                                )}
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
                                <label className="formLabel" htmlFor="endDate">
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
                                        End date must be higher than start date.
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
                                <h2 className="formSublabel">
                                    Origination Address
                                </h2>
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
                                <label className="formLabel" htmlFor="workCity">
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
                                    {program === "STARSS" ? "Virginia" : "MD"}
                                </p>
                                <label
                                    className="formLabel"
                                    htmlFor="workZipcode"
                                >
                                    Zipcode
                                </label>
                                <p className="formInput">
                                    {program === "STARSS" ? "23666" : "20706"}
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
                                        setDestinationZipcode(e.target.value)
                                    }
                                    className="formInput"
                                />
                                <h3 className="formSublabel">Justification</h3>
                                <div className="travelAdvanceCheckboxText">
                                    <span
                                        className={
                                            justificationType.includes(
                                                "Presenting"
                                            )
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (
                                                !justificationType.includes(
                                                    "Presenting"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType +
                                                        "Presenting"
                                                );
                                            }
                                            if (
                                                justificationType.includes(
                                                    "Presenting"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType.replace(
                                                        "Presenting",
                                                        ""
                                                    )
                                                );
                                            }
                                            return setJustificationType(
                                                "Presenting"
                                            );
                                        }}
                                    >
                                        {justificationType.includes(
                                            "Presenting"
                                        ) && (
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
                                            justificationType.includes(
                                                "PosterSession"
                                            )
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (
                                                !justificationType.includes(
                                                    "PosterSession"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType +
                                                        "PosterSession"
                                                );
                                            }
                                            if (
                                                justificationType.includes(
                                                    "PosterSession"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType.replace(
                                                        "PosterSession",
                                                        ""
                                                    )
                                                );
                                            }
                                            return setJustificationType(
                                                "PosterSession"
                                            );
                                        }}
                                    >
                                        {justificationType.includes(
                                            "PosterSession"
                                        ) && (
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
                                            justificationType.includes(
                                                "MissionSupport"
                                            )
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (
                                                !justificationType.includes(
                                                    "MissionSupport"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType +
                                                        "MissionSupport"
                                                );
                                            }
                                            if (
                                                justificationType.includes(
                                                    "MissionSupport"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType.replace(
                                                        "MissionSupport",
                                                        ""
                                                    )
                                                );
                                            }
                                            return setJustificationType(
                                                "MissionSupport"
                                            );
                                        }}
                                    >
                                        {justificationType.includes(
                                            "MissionSupport"
                                        ) && (
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
                                            justificationType.includes(
                                                "ChairPerson"
                                            )
                                                ? "travelAdvanceCheckboxChecked"
                                                : "travelAdvanceCheckboxUnchecked"
                                        }
                                        onClick={() => {
                                            if (
                                                !justificationType.includes(
                                                    "ChairPerson"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType +
                                                        "ChairPerson"
                                                );
                                            }
                                            if (
                                                justificationType.includes(
                                                    "ChairPerson"
                                                )
                                            ) {
                                                return setJustificationType(
                                                    justificationType.replace(
                                                        "ChairPerson",
                                                        ""
                                                    )
                                                );
                                            }
                                            return setJustificationType(
                                                "ChairPerson"
                                            );
                                        }}
                                    >
                                        {justificationType.includes(
                                            "ChairPerson"
                                        ) && (
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
                                {regulatoryForeignTravel === "Foreign" && (
                                    <div className="formVerbage">
                                        <ul>
                                            <li className="formVerbageLi">
                                                Submit SSAI Travel Request Forms
                                                for international travel at
                                                least{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    35 days in advance
                                                </span>
                                                .
                                            </li>
                                            <li className="formVerbageLi">
                                                Ensure that your passport and
                                                visa are valid; passports often
                                                need to be valid for at least 6
                                                months BEYOND travel dates.
                                            </li>
                                            <li className="formVerbageLi">
                                                Check for any travel advisories
                                                before leaving on international
                                                travel.
                                            </li>
                                            <li className="formVerbageLi">
                                                Register travel with the U.S.
                                                State Department's Smart
                                                Traveler Enrollment Program
                                                (STEP).
                                            </li>
                                            <li className="formVerbageLi">
                                                Computer security best practices
                                                are that employees take ACES or
                                                SSAI loaner laptops on foreign
                                                travel rather than their usual
                                                machines. Goddard has a document
                                                that contains helpful
                                                information.
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

    if (formLoading) {
        return (
            <div className="submittedformContainer">
                <div className="submittedform">
                    <p className="submittedformLoading">Loading form...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="submittedformContainer">
            <div className="submittedform">
                <div>
                    <div className="submittedformActivity">
                        <h2 className="submittedformActivityTitle">Routing</h2>
                        <div className="submittedformActivityRouting">
                            <p className="submittedformActivityRoutingText">
                                Task Monitor
                                <span
                                    className="submittedformActivityRoutingCircle"
                                    style={{
                                        background:
                                            (form &&
                                                form.routingPending.includes(
                                                    "TM"
                                                ) &&
                                                "#FFCA28") ||
                                            (form &&
                                                form.routingApproved.includes(
                                                    "TM"
                                                ) &&
                                                "#28b834") ||
                                            (form &&
                                                form.routingRejected.includes(
                                                    "TM"
                                                ) &&
                                                "#dd1572"),
                                    }}
                                ></span>
                            </p>
                            <p className="submittedformActivityRoutingText">
                                Group/Project Lead
                                <span
                                    className="submittedformActivityRoutingCircle"
                                    style={{
                                        background:
                                            (form &&
                                                form.routingPending.includes(
                                                    "PL"
                                                ) &&
                                                "#FFCA28") ||
                                            (form &&
                                                form.routingApproved.includes(
                                                    "PL"
                                                ) &&
                                                "#28b834") ||
                                            (form &&
                                                form.routingRejected.includes(
                                                    "PL"
                                                ) &&
                                                "#dd1572"),
                                    }}
                                ></span>
                            </p>
                            <p className="submittedformActivityRoutingText">
                                Program Manager
                                <span
                                    className="submittedformActivityRoutingCircle"
                                    style={{
                                        background:
                                            (form &&
                                                form.routingPending.includes(
                                                    "PM"
                                                ) &&
                                                "#FFCA28") ||
                                            (form &&
                                                form.routingApproved.includes(
                                                    "PM"
                                                ) &&
                                                "#28b834") ||
                                            (form &&
                                                form.routingRejected.includes(
                                                    "PM"
                                                ) &&
                                                "#dd1572"),
                                    }}
                                ></span>
                            </p>
                            <p className="submittedformActivityRoutingText">
                                Contracting Officer
                                <span
                                    className="submittedformActivityRoutingCircle"
                                    style={{
                                        background:
                                            (form &&
                                                form.routingPending.includes(
                                                    "CO"
                                                ) &&
                                                "#FFCA28") ||
                                            (form &&
                                                form.routingApproved.includes(
                                                    "CO"
                                                ) &&
                                                "#28b834") ||
                                            (form &&
                                                form.routingRejected.includes(
                                                    "CO"
                                                ) &&
                                                "#dd1572"),
                                    }}
                                ></span>
                            </p>
                        </div>
                        {props.user &&
                            props.user.supervisorRole === "CO" &&
                            form.messageToCO && (
                                <p className="submittedformActivityMessageToCO">
                                    "{form.messageToCO}"
                                </p>
                            )}
                        <h2 className="submittedformActivityTitle">Activity</h2>
                        <div className="submittedformActivityList">
                            <p className="submittedformActivityText">
                                Created by:
                                <br />
                                {form && form.creator.email}
                                {form && form.creator.supervisorRole && (
                                    <span>({form.creator.supervisorRole})</span>
                                )}
                            </p>
                            <p className="submittedformActivityText">
                                {moment(form.createdAt).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </p>
                        </div>
                        {
                            form &&
                                form.activity.map((f, key) => {
                                    return (
                                        <div
                                            className="submittedformActivityList"
                                            key={key}
                                        >
                                            {f.signedBy && (
                                                <div>
                                                    <p className="submittedformActivityText">
                                                        Signed by:
                                                        <br />
                                                        {f.signedBy.email}(
                                                        {
                                                            f.signedBy
                                                                .supervisorRole
                                                        }
                                                        )
                                                    </p>
                                                    {f.approved.toUpperCase() ===
                                                        "APPROVED" && (
                                                        <p className="submittedformActivityApproved">
                                                            Approved
                                                        </p>
                                                    )}
                                                    {f.approved.toUpperCase() ===
                                                        "REJECTED" && (
                                                        <p className="submittedformActivityRejected">
                                                            Rejected
                                                        </p>
                                                    )}
                                                    <p className="submittedformActivityComment">
                                                        {f.comment}
                                                    </p>
                                                    <p className="submittedformActivityText">
                                                        {moment(f.date).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {f.viewedBy && (
                                                <div>
                                                    <p className="submittedformActivityText">
                                                        Viewed by:
                                                        <br />
                                                        {f.viewedBy.email}
                                                        {f.viewedBy
                                                            .supervisorRole && (
                                                            <span>
                                                                (
                                                                {
                                                                    f.viewedBy
                                                                        .supervisorRole
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="submittedformActivityText">
                                                        {moment(f.date).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {f.editedBy && (
                                                <div>
                                                    <p className="submittedformActivityText">
                                                        Edited by:
                                                        <br />
                                                        {f.editedBy.email}
                                                        {f.editedBy
                                                            .supervisorRole && (
                                                            <span>
                                                                (
                                                                {
                                                                    f.editedBy
                                                                        .supervisorRole
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="submittedformActivityText">
                                                        {moment(f.date).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {f.commentBy && (
                                                <div>
                                                    <p className="submittedformActivityText">
                                                        Comment by:
                                                        <br />
                                                        {f.commentBy.email}
                                                        {f.commentBy
                                                            .supervisorRole && (
                                                            <span>
                                                                (
                                                                {
                                                                    f.commentBy
                                                                        .supervisorRole
                                                                }
                                                                )
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="submittedformActivityComment">
                                                        {f.comment}
                                                    </p>
                                                    <p className="submittedformActivityText">
                                                        {moment(f.date).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                            {f.routedTo && (
                                                <div>
                                                    <p className="submittedformActivityText">
                                                        Routed by:
                                                        <br />
                                                        {f.routedBy.email}(
                                                        {
                                                            f.routedBy
                                                                .supervisorRole
                                                        }
                                                        )
                                                        <br />
                                                        routed to {f.routedTo}
                                                    </p>
                                                    <p className="submittedformActivityText">
                                                        {moment(f.date).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            //.reverse()
                        }
                    </div>
                </div>
                <div className="submittedformItemsContainer">
                    {props.user &&
                    props.user.email === form.email &&
                    form.approved.toUpperCase() !== "APPROVED" ? (
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
                                Conference/Workshop/Seminar:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelPurposeDropdown}
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelPurpose}
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
                            <p className="submittedformDetailsTitle">Task:</p>
                            <p className="submittedformDetailsInput">
                                {form.task}
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
                                {moment(form.startDate).format("L")}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                End Date:
                            </p>
                            <p className="submittedformDetailsInput">
                                {moment(form.endDate).format("L")}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Number of nights at this location:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.travelDaysAway}
                            </p>
                        </div>
                        <h3 className="submittedformSublabel">
                            Origination Address
                        </h3>
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
                        <h3 className="submittedformSublabel">
                            Destination Address
                        </h3>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Street Address:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.destinationStreetAddress}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">City:</p>
                            <p className="submittedformDetailsInput">
                                {form.destinationCity}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">State:</p>
                            <p className="submittedformDetailsInput">
                                {form.destinationState}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Zipcode:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.destinationZipcode}
                            </p>
                        </div>
                        <div className="submittedformDetails">
                            <p className="submittedformDetailsTitle">
                                Justification:
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.justification}
                            </p>
                            <p className="submittedformDetailsInput">
                                {form.justificationType}
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
                </div>
                <div className="submittedformFormContainer">
                    {props.user &&
                    form &&
                    props.user.role !== "Traveler" &&
                    props.user.supervisorRole !== "TA" &&
                    props.user.email !== form.email &&
                    form.approved.toUpperCase() !== "APPROVED" &&
                    (form.routingPending.includes(props.user.supervisorRole) ||
                        form.routingRejected.includes(
                            props.user.supervisorRole
                        )) ? (
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
                                        setApproveOrReject("approved")
                                    }
                                    type="submit"
                                    className="submittedformFormButtonsButton"
                                    disabled={loading}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() =>
                                        setApproveOrReject("rejected")
                                    }
                                    type="submit"
                                    className="submittedformFormButtonsButton"
                                    disabled={loading}
                                >
                                    Reject
                                </button>
                            </div>
                        </form>
                    ) : null}
                    {props.user &&
                    props.user.email === form.email &&
                    form.approved.toUpperCase() !== "APPROVED" ? (
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
                    {props.user && props.user.email !== form.email && (
                        <div className="submittedformRouting">
                            <button
                                className="submittedformRoutingButton"
                                onClick={() => routeTo("TM")}
                            >
                                Route to Task Monitor
                            </button>
                            <button
                                className="submittedformRoutingButton"
                                onClick={() => routeTo("PL")}
                            >
                                Route to Group/Project Lead
                            </button>
                            <button
                                className="submittedformRoutingButton"
                                onClick={() => routeTo("PM")}
                            >
                                Route to Program Manager
                            </button>
                            {props.user.supervisorRole === "TA" && (
                                <>
                                    <textarea
                                        id="messageToCO"
                                        name="messageToCO"
                                        type="text"
                                        value={messageToCO}
                                        onChange={(e) =>
                                            setMessageToCO(e.target.value)
                                        }
                                        className="submittedformRoutingTextarea"
                                        placeholder="Message to CO"
                                    />
                                    <button
                                        className="submittedformRoutingButton"
                                        onClick={() => routeTo("CO")}
                                    >
                                        Route to Contracting Officer
                                    </button>
                                    <div className="submittedformRoutingToCoButtons">
                                        <button
                                            className="submittedformRoutingToCoButton"
                                            onClick={() => routeTo("notify")}
                                        >
                                            Notify
                                        </button>
                                        <button
                                            className="submittedformRoutingToCoButton"
                                            onClick={() =>
                                                routeTo("concurrence")
                                            }
                                        >
                                            Concurrence
                                        </button>
                                    </div>
                                </>
                            )}
                            {/*<div className="submittedformRoutingCheckboxText">
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
                                    Task Monitor
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
                                    Group/Project Lead
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
                                    Program Manager
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
                                    Contracting Officer
                                </p>
                            </div>
                            <button
                                className="submittedformRoutingButton"
                                onClick={() => routing()}
                            >
                                Route
                            </button>*/}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
