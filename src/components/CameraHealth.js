import "./CameraHealth.css";

const CameraHealth = ({ health }) => {
    const getClassName = () => {
        switch (health) {
            case "A":
                return "camera-health health-a";
            case "B":
            case "C":
                return "camera-health health-b";
            default:
                return "camera-health health-default";
        }
    };

    return (
        <span
            className={getClassName()}
            style={{ color: health === "-" ? "#6B7280" : "white" }}>
            {health}
        </span>
    );
};

export default CameraHealth;
