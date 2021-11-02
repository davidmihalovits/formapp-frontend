import "./Notification.sass";
import { Link } from "react-router-dom";

const Notification = (props) => {
    const devprodUrl =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8888/.netlify/functions"
            : "https://awesome-minsky-48a20a.netlify.app/.netlify/functions";

    const readNotification = async (formId) => {
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
                formId: formId,
                user: props.user && props.user.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => props.getNotifications());
    };

    const userEmail = props.user && props.user.email;

    return (
        <div className="notificationsContainer">
            {props.notifications &&
                props.notifications.map((n, key) => {
                    return (
                        <Link
                            key={key}
                            to={`/pending/${n.formId}#${n.formName.replaceAll(
                                /[. /]/g,
                                ""
                            )}`}
                            className="notificationsLink"
                            onClick={() => readNotification(n.formId)}
                        >
                            <div className="notifications">
                                {!n.read.includes(userEmail) && (
                                    <div className="notificationsBadge"></div>
                                )}
                                <p className="notificationsText">
                                    {n.notification}
                                </p>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};

export default Notification;
