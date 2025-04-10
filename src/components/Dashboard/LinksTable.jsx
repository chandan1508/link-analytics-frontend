import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUrl } from "../../api/urls";
import Button from "../UI/Button";
import { format } from "date-fns";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { FaCopy, FaSearch } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LinksTable = ({ links = [], onDelete, handleRefresh }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        const response = await deleteUrl(id);
        if (response && response.success) {
          if (typeof onDelete === "function") onDelete(id);
          toast.success("URL deleted successfully");
        } else {
          throw new Error("Deletion failed on server");
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete URL");
      }
    }
  };

  const handleDetails = (id) => {
    navigate(`/analytics/${id}`);
  };

  const handleRedirect = (shortCode) => {
    window.open(`${API_BASE_URL}/${shortCode}`, "_blank");
    setTimeout(async () => {
      handleRefresh();
    }, 500);
  };

  const copyToClipboard = (text) => {
    copy(text, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast("Copied to clipboard!");
  };

  // Filter links based on search term (case insensitive)
  const filteredLinks = links.filter((link) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      link.originalUrl.toLowerCase().includes(searchLower) ||
      link.shortCode.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageLinks = 10;
    let startPage, endPage;

    if (totalPages <= maxPageLinks) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxPageLinks / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPageLinks / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxPageLinks;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPageLinks + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (!Array.isArray(links) || links.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 text-center text-gray-500">
        No links found
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by URL or short code"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 text-sm">
        <ToastContainer />
        {currentLinks.length > 0 ? (
          currentLinks.map((link) => (
            <div
              key={link._id}
              className="bg-white p-2 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[300px]">
                    {link.originalUrl}
                  </p>
                  <div className="mt-1 flex items-center">
                    <button
                      onClick={() => handleRedirect(link.shortCode)}
                      className="text-blue-600 hover:text-blue-800 text-xs truncate max-w-[200px] mr-2"
                    >
                      {`${API_BASE_URL}/${link.shortCode}`}
                    </button>
                    {/* <CopyToClipboard
                      text={`${API_BASE_URL}/${link.shortCode}`}
                      onClick={() => copyToClipboard(`${API_BASE_URL}/${link.shortCode}`)}
                    > */}
                      <button onClick={() => copyToClipboard(`${API_BASE_URL}/${link.shortCode}`)} className="text-gray-400 hover:text-gray-600">
                        <FaCopy />
                      </button>
                    {/* </CopyToClipboard> */}
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      new Date(link.expiresAt) > new Date() || !link.expiresAt
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {new Date(link.expiresAt) > new Date() || !link.expiresAt
                      ? "Active"
                      : "Expired"}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Clicks: {link.totalClicks}</span>
                <span>{format(new Date(link.createdAt), "MMM dd, yyyy")}</span>
              </div>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                <Button
                  variant="secondary"
                  size="xs"
                  onClick={() => handleDetails(link._id)}
                >
                  Details
                </Button>
                <Button
                  variant="danger"
                  size="xs"
                  onClick={() => handleDelete(link._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg p-4 text-center text-gray-500">
            No matching links found
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <ToastContainer />
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Original URL",
                    "Short URL",
                    "Clicks",
                    "Created",
                    "Status",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentLinks.length > 0 ? (
                  currentLinks.map((link) => (
                    <tr key={link._id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 truncate max-w-[200px] lg:max-w-xs">
                          {link.originalUrl}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRedirect(link.shortCode)}
                            className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-[160px] lg:max-w-none mr-2"
                          >
                            {`${API_BASE_URL}/${link.shortCode}`}
                          </button>
                          {/* <CopyToClipboard
                            text={`${API_BASE_URL}/${link.shortCode}`}
                            onClick={() => copyToClipboard(`${API_BASE_URL}/${link.shortCode}`)}
                          > */}
                            <button onClick={() => copyToClipboard(`${API_BASE_URL}/${link.shortCode}`)} className="text-gray-400 hover:text-gray-600">
                              <FaCopy />
                            </button>
                          {/* </CopyToClipboard> */}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-900 whitespace-nowrap">
                        {link.totalClicks}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {format(new Date(link.createdAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                            new Date(link.expiresAt) > new Date() ||
                            !link.expiresAt
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {new Date(link.expiresAt) > new Date() ||
                          !link.expiresAt
                            ? "Active"
                            : "Expired"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDetails(link._id)}
                        >
                          Details
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(link._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No matching links found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === number
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LinksTable;
