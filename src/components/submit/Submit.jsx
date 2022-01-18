import "./Submit.sass";
import { Link } from "react-router-dom";
import travelIcon from "../../assets/travel.svg";
import workIcon from "../../assets/work.svg";
import personnelIcon from "../../assets/personnel.svg";

const Submit = () => {
    return (
        <div className="submitContainer">
            <div className="submitContainerBoxes">
                <Link className="submitContainerBox" to={`/submit/travel`}>
                    <img
                        src={travelIcon}
                        alt="travel icon"
                        className="submitContainerBoxIcon"
                    />
                    <p className="submitContainerBoxText">Travel</p>
                </Link>
                <Link className="submitContainerBox" to={`/submit/work`}>
                    <img
                        src={workIcon}
                        alt="work icon"
                        className="submitContainerBoxIcon"
                    />
                    <p className="submitContainerBoxText">Work Authorization</p>
                </Link>
                <Link className="submitContainerBox" to={`/submit/personnel`}>
                    <img
                        src={personnelIcon}
                        alt="work icon"
                        className="submitContainerBoxIcon"
                    />
                    <p className="submitContainerBoxText">
                        Personnel Action Change
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Submit;
