import "./Profile.sass";

const Profile = (props) => {
    return (
        <div
            style={{
                height: "100vh",
                display: "grid",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <div>
                <p>Hey {props.user && props.user.user.email}!</p>
                <p>This will be your profile page.</p>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
