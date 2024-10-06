import "./Body.css";
import Header from "./Header";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";
import CameraHealth from "./CameraHealth";
import { useEffect, useState } from "react";
import { CircleAlert, MapPin, Signal } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [uniqueLocations, setUniqueLocations] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const fetchData = async () => {
        const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

        const response = await fetch(
            "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const json = await response.json();
        setCameras(json.data);

        const locations = [
            ...new Set(json.data.map((camera) => camera.location)),
        ];
        setUniqueLocations(locations);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchedCameras = cameras.filter((camera) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return (
            camera.name.toLowerCase().includes(lowerCaseSearchValue) ||
            camera.location.toLowerCase().includes(lowerCaseSearchValue) ||
            (camera.recorder &&
                camera.recorder.toLowerCase().includes(lowerCaseSearchValue)) ||
            camera.status.toLowerCase().includes(lowerCaseSearchValue) ||
            camera.tasks.toLowerCase().includes(lowerCaseSearchValue)
        );
    });

    const filteredCameras = searchedCameras.filter((camera) => {
        const matchesLocation =
            !selectedLocation || camera.location === selectedLocation;
        const matchesStatus =
            !selectedStatus || camera.status === selectedStatus;
        return matchesLocation && matchesStatus;
    });

    const totalFilteredPages = Math.ceil(filteredCameras.length / rowsPerPage);
    const totalRows = filteredCameras.length;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedCameras = filteredCameras.slice(startIndex, endIndex);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedCameras(displayedCameras.map((camera) => camera.id));
        } else {
            setSelectedCameras([]);
        }
    };

    const handleIndividualCheckboxChange = (id) => {
        if (selectedCameras.includes(id)) {
            setSelectedCameras(
                selectedCameras.filter((cameraId) => cameraId !== id)
            );
        } else {
            setSelectedCameras([...selectedCameras, id]);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1) return;
        if (page > totalFilteredPages) {
            setCurrentPage(totalFilteredPages);
        } else {
            setCurrentPage(page);
        }
    };

    const handleRowsChange = (rows) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location === "Location" ? "" : location);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status === "Status" ? "" : status);
    };

    const handleDeleteCamera = (id) => {
        const updatedCameras = cameras.filter((camera) => camera.id !== id);
        setCameras(updatedCameras);
        setSelectedCameras(
            selectedCameras.filter((cameraId) => cameraId !== id)
        );

        toast.success("The record has been deleted successfully!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
        });
    };

    return (
        <div>
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="body">
                <div className="dropdowns">
                    <div className="location-dropdown">
                        <MapPin className="location-icon" />
                        <Dropdown
                            options={["Location", ...uniqueLocations]}
                            onSelect={handleLocationSelect}
                        />
                    </div>
                    <div className="status-dropdown">
                        <Signal className="status-icon" />
                        <Dropdown
                            options={["Status", "Active", "Inactive"]}
                            onSelect={handleStatusSelect}
                        />
                    </div>
                </div>
                <div className="separator"></div>
                <div>
                    <table className="table">
                        <thead>
                            <tr className="table-row">
                                <th className="table-row-heading">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={
                                            selectedCameras.length ===
                                            displayedCameras.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="table-row-headings">NAME</th>
                                <th className="table-row-headings">HEALTH</th>
                                <th className="table-row-headings">LOCATION</th>
                                <th className="table-row-headings">RECORDER</th>
                                <th className="table-row-headings">TASKS</th>
                                <th className="table-row-headings">STATUS</th>
                                <th className="table-row-headings">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCameras.map((camera) => (
                                <tr key={camera.id} className="tablebody-row">
                                    <td className="tablebody-data">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectedCameras.includes(
                                                camera.id
                                            )}
                                            onChange={() =>
                                                handleIndividualCheckboxChange(
                                                    camera.id
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="tablebody-data">
                                        <div className="tablebody-data-style">
                                            <div>
                                                <div className="camera-name">
                                                    {(camera.health.cloud ===
                                                        "F" ||
                                                        camera.health.cloud ===
                                                            "D") &&
                                                    (camera.health.device ===
                                                        "F" ||
                                                        camera.health.device ===
                                                            "D") ? (
                                                        <div className="red-circle"></div>
                                                    ) : (
                                                        <div className="empty"></div>
                                                    )}
                                                    {camera.name}
                                                    {camera.hasWarning && (
                                                        <CircleAlert className="circle-alert" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tablebody-data">
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                            }}>
                                            {camera.health.cloud !== "" && (
                                                <img
                                                    className="cloud"
                                                    src="/images/cloud.jpg"
                                                    alt="cloud"
                                                />
                                            )}
                                            <CameraHealth
                                                health={camera.health.cloud}
                                            />
                                            {camera.health.device !== "" && (
                                                <img
                                                    className="edge"
                                                    src="/images/edge.jpg"
                                                    alt="edge"
                                                />
                                            )}
                                            <CameraHealth
                                                health={camera.health.device}
                                            />
                                        </div>
                                    </td>
                                    <td className="camera-location">
                                        {camera.location}
                                    </td>
                                    <td className="camera-recorder">
                                        {camera.recorder || "N/A"}
                                    </td>
                                    <td className="camera-tasks">
                                        {camera.tasks === "1"
                                            ? `${camera.tasks} task`
                                            : `${camera.tasks} tasks` || "N/A"}
                                    </td>
                                    <td className="table-cell">
                                        <span
                                            className={`camera-status ${
                                                camera.status === "Active"
                                                    ? "camera-status-active"
                                                    : "camera-status-inactive"
                                            }`}>
                                            {camera.status}
                                        </span>
                                    </td>
                                    <td className="table-cell">
                                        <button
                                            className="action-button"
                                            onClick={() =>
                                                handleDeleteCamera(camera.id)
                                            }>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalFilteredPages}
                        totalRows={totalRows}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsChange}
                        disablePrev={currentPage === 1}
                        disableNext={currentPage === totalFilteredPages}
                    />
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Body;
