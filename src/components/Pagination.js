import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import "./Pagination.css";
import Dropdown from "./Dropdown";

const Pagination = ({
    currentPage,
    totalPages,
    totalRows,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
}) => {
    const startRecord = (currentPage - 1) * rowsPerPage + 1;
    const endRecord = Math.min(currentPage * rowsPerPage, totalRows);

    return (
        <div className="pagination">
            <Dropdown
                options={[10, 20, 40, 80]}
                onSelect={onRowsPerPageChange}
            />
            <span className="page-info">
                {startRecord}-{endRecord} of {totalRows}
            </span>
            <div className="pagination-buttons">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="pagination-button">
                    <ChevronsLeft size={18} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button">
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button">
                    <ChevronRight size={18} />
                </button>
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="pagination-button">
                    <ChevronsRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
