import "./Notification.sass";
import { Link } from "react-router-dom";
import moment from "moment";

const Notification = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const readNotification = async (n) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return console.log("No token.");
        }

        await fetch(`${devprodUrl}/readNotification`, {
            method: "PUT",
            headers: {
                Authorization: token,
            },
            body: JSON.stringify({
                formId: n.formId,
                user: props.user && props.user,
                id: n._id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                props.getNotifications();
                console.log(data);
            });
    };

    const userEmail = props.user && props.user.email;

    return (
        <div className="notificationsContainer">
            {props.notifications &&
                props.notifications.map((n, key) => {
                    return (
                        <div key={key}>
                            <Link
                                to={`/form/${n.formId}`}
                                className="notificationsLink"
                                onClick={() => readNotification(n)}
                            >
                                <div className="notifications">
                                    <div className="notificationsTextBadge">
                                        <p className="notificationsText">
                                            {n.notification}
                                        </p>
                                        {!n.read.includes(userEmail) && (
                                            <div className="notificationsBadge"></div>
                                        )}
                                    </div>
                                    <p className="notificationsDate">
                                        {moment(n.createdAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                    </p>
                                </div>
                            </Link>
                            <div
                                style={{
                                    borderTop: "1px solid #dae1ec",
                                    margin: "20px 0",
                                }}
                            ></div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Notification;
