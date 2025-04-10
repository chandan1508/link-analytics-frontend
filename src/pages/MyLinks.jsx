import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserUrls } from "../api/urls";
import LinksTable from "../components/Dashboard/LinksTable";
import { selectCurrentUser } from "../features/auth/authSlice";
import Loader from "../components/UI/Loader";
import { ToastContainer, toast } from 'react-toastify';

const MyLinks = () => {
  const user = useSelector(selectCurrentUser);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLinks = async (id, isRefresh = false) => {
    isRefresh ? setIsRefreshing(true) : setIsLoading(true);
    try {
      const { data } = await getUserUrls(id);
      setLinks(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch links"
      );
    } finally {
      isRefresh ? setIsRefreshing(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLinks(user.id);
    }
  }, [user]);

  const handleRefresh = () => {
    if (user) {
      fetchLinks(user.id, true);
      // console.log(`hanrr, ${user.id}`);
    }
  };

  const handleLinkDeleted = (deletedId) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link._id !== deletedId));
    // console.log("deleted");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Please log in
          </h2>
          <p className="text-gray-600">
            You need to be logged in to view your links
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Your Links</h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isRefreshing ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className={`-ml-0.5 mr-2 h-4 w-4 ${
                isRefreshing ? "animate-spin" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader size="lg" />
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Failed to load your links. Please try again.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleRefresh}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No links yet
              </h3>
              <p className="mt-1 text-gray-500">
                Get started by creating your first short link.
              </p>
            </div>
          ) : (
            <LinksTable
              links={links}
              onDelete={handleLinkDeleted}
              handleRefresh={handleRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLinks;
