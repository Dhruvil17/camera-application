import "./Header.css";
import { Search } from "lucide-react";

const Header = ({ searchValue, setSearchValue }) => {
    return (
        <div className="header">
            <div className="logo">
                <img
                    className="logo-image"
                    src="/images/logo.jpg"
                    alt="wobot-ai"
                />
            </div>
            <div className="camera-search">
                <div>
                    <h1 className="camera-heading">Cameras</h1>
                    <p className="camera-text">Manage your cameras here.</p>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="search"
                        className="search-input"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Search className="search-input-icon" />
                </div>
            </div>
        </div>
    );
};

export default Header;
