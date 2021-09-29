import "./Form.sass";
import { useEffect, useState } from "react";

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [program, setProgram] = useState("");
    const [chargeCode, setChargeCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="formContainer">
            <form className="form" onSubmit={submit} noValidate>
                <label className="formLabel" htmlFor="name">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <label className="formLabel" htmlFor="streetAddress">
                    Street Address
                </label>
                <input
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="formInput"
                    placeholder="10210 Greenbelt Rd"
                />
                <label className="formLabel" htmlFor="city">
                    City
                </label>
                <input
                    id="city"
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="formInput"
                    placeholder="Lanham"
                />
                <label className="formLabel" htmlFor="state">
                    State
                </label>
                <input
                    id="state"
                    name="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="formInput"
                    placeholder="MD"
                />
                <label className="formLabel" htmlFor="zipcode">
                    Zipcode
                </label>
                <input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="formInput"
                />
            </form>
        </div>
    );
};

export default Form;
