import "./SubmitFormWork.sass";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SubmitFormWork = () => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const today = new Date();

    const [employeeName, setEmployeeName] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [exempt, setExempt] = useState("");
    const [dateOfHire, setDateOfHire] = useState(
        today.setDate(today.getDate())
    );
    const [reviewingManager, setReviewingManager] = useState("");
    const [revisionDate, setRevisionDate] = useState(
        today.setDate(today.getDate())
    );

    /*useEffect(() => {
        window.scrollTo(0, 0);
    }, [showSection]);*/

    return (
        <div className="formContainer">
            <form className="form" /*onSubmit*/ noValidate>
                <div className="formItems">
                    <div className="formItem">
                        <label className="formLabel">Employee Name</label>
                        <input
                            id="employeeName"
                            name="employeeName"
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="formInput"
                        />
                        <label className="formLabel">Employee Number</label>
                        <input
                            id="employeeNumber"
                            name="employeeNumber"
                            type="text"
                            value={employeeNumber}
                            onChange={(e) => setEmployeeNumber(e.target.value)}
                            className="formInput"
                        />
                        <div className="nctsCheckboxText">
                            <span
                                className={
                                    exempt
                                        ? "nctsCheckboxChecked"
                                        : "nctsCheckboxUnchecked"
                                }
                                onClick={() => {
                                    setExempt("Exempt");
                                }}
                            >
                                {exempt === "Exempt" && (
                                    <span className="nctsCheckboxCheckedCheckmark"></span>
                                )}
                            </span>
                            <p className="nctsText">Exempt</p>
                        </div>
                        <div className="nctsCheckboxText">
                            <span
                                className={
                                    exempt
                                        ? "nctsCheckboxChecked"
                                        : "nctsCheckboxUnchecked"
                                }
                                onClick={() => {
                                    setExempt("Non-Exempt");
                                }}
                            >
                                {exempt === "Non-Exempt" && (
                                    <span className="nctsCheckboxCheckedCheckmark"></span>
                                )}
                            </span>
                            <p className="nctsText">Non-Exempt</p>
                        </div>
                        <label className="formLabel">Date of Hire</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={dateOfHire}
                            onChange={(date) => {
                                setDateOfHire(date);
                            }}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            dateFormat="MM/dd/yyyy"
                            calendarStartDay={1}
                            className="formInput"
                        />
                        <label className="formLabel">Reviewing Manager</label>
                        <input
                            id="reviewingManager"
                            name="reviewingManager"
                            type="text"
                            value={reviewingManager}
                            onChange={(e) =>
                                setReviewingManager(e.target.value)
                            }
                            className="formInput"
                        />
                        <label className="formLabel">Revision Date</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={revisionDate}
                            onChange={(date) => {
                                setRevisionDate(date);
                            }}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            dateFormat="MM/dd/yyyy"
                            calendarStartDay={1}
                            className="formInput"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SubmitFormWork;
