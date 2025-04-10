import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Button from "../components/UI/Button";
import { FaArrowLeft, FaCopy, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "copy-to-clipboard";
import { format } from "date-fns";
import { getUrlAnalytics } from "../api/analytics";
import { ToastContainer, toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LinkAnalyticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [daysFilter, setDaysFilter] = useState(30);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUrlAnalytics(id, daysFilter);
        // console.log(daysFilter);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch analytics data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalytics();
    }
  }, [id, daysFilter]);

  const handleRedirect = (shortCode) => (e) => {
    e.preventDefault();
    window.open(`${API_BASE_URL}/${shortCode}`, "_blank");

    setTimeout(async () => {
      try {
        const response = await getUrlAnalytics(id, daysFilter);

        setData(response.data);
      } catch (err) {
        console.error("Error refetching analytics:", err);
      }
    }, 500);
  };

  const copyToClipboard = (text) => {
    copy(text, {
      debug: true,
      message: "Press #{key} to copy",
    });
    toast("Copied to clipboard!");
  };

  const downloadQRCode = () => {
    if (!data?.urlDetails?.qrCode?.imageUrl) return;

    const link = document.createElement("a");
    link.href = data.urlDetails.qrCode.imageUrl;
    link.download = `qr-code-${data.urlDetails.shortCode || "link"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <FaArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Link Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Original URL:</span>
              </p>
              <a
                href={data.urlDetails.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {data.urlDetails.originalUrl}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Short URL:</span>
              </p>
              <div className="flex items-center gap-1">
                <a
                  href={data.urlDetails.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  onClick={handleRedirect(data.urlDetails.shortCode)}
                >
                  {`${API_BASE_URL}/${data.urlDetails.shortCode}`}
                </a>
                {/* <CopyToClipboard
                  text={`${API_BASE_URL}/${data.urlDetails.shortCode}`}
                  onClick={() => copyToClipboard(`${API_BASE_URL}/${data.urlDetails.shortCode}`)}
                > */}
                  <button onClick={() => copyToClipboard(`${API_BASE_URL}/${data.urlDetails.shortCode}`)} className="text-gray-400 hover:text-gray-600">
                    <FaCopy />
                  </button>
                {/* </CopyToClipboard> */}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Created:</span>{" "}
                {format(new Date(data.urlDetails.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    data.urlDetails.expiresAt &&
                    new Date() > new Date(data.urlDetails.expiresAt)
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {data.urlDetails.expiresAt &&
                  new Date() > new Date(data.urlDetails.expiresAt)
                    ? "Expired"
                    : "Active"}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* First Row: QR Code and Stats */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* QR Code Section - Takes about 1/3 width on desktop */}
              {data.urlDetails.qrCode?.imageUrl && (
                <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      QR Code
                    </h3>
                    <button
                      onClick={downloadQRCode}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <FaDownload className="inline" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={data.urlDetails.qrCode.imageUrl}
                      alt="QR Code"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              )}

              {/* Stats Cards - Takes remaining space */}
              <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Total Clicks Card */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Total Clicks
                  </h3>
                  <p className="text-3xl font-bold text-blue-900">
                    {data.totalClicks}
                  </p>
                </div>

                {/* Unique Clicks Card */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-2">
                    Unique Clicks
                  </h3>
                  <p className="text-3xl font-bold text-green-900">
                    {data.uniqueClicks}
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row: Time Filter */}
            <div className="flex items-center">
              <label
                htmlFor="daysFilter"
                className="mr-2 text-sm font-medium text-gray-700"
              >
                Show data for:
              </label>
              <select
                id="daysFilter"
                value={daysFilter}
                onChange={(e) => setDaysFilter(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clicks Over Time Chart - Changed to LineChart */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.clicksOverTime}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="clicks"
                name="Clicks"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Grid - Only show if there's data */}

      {data.clicksByDevice.length > 0 && (
        <div className="grid grid-cols-1 mt-4">
          {/* Devices - Changed to BarChart */}
          {data.clicksByDevice.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Devices</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.clicksByDevice}
                    barSize={40}
                    barCategoryGap="10%"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Clicks">
                      {data.clicksByDevice.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#8884d8",
                              "#82ca9d",
                              "#ffc658",
                              "#ff7f50",
                              "#00C49F",
                            ][index % 5]
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {(data.clicksByBrowser.length > 0 ||
        data.clicksByOS.length > 0 ||
        data.topReferrers.length > 0) && (
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-6">
          {/* Top Countries - Changed to BarChart */}

          {/* Browsers */}
          {data.clicksByBrowser.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Browsers</h2>
              <div className="space-y-2">
                {data.clicksByBrowser.map((browser, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 font-medium">
                      {browser._id || "Unknown"}
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${
                              (browser.count / data.totalClicks) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-600">
                      {browser.count} (
                      {Math.round((browser.count / data.totalClicks) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operating Systems */}
          {data.clicksByOS.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Operating Systems</h2>
              <div className="space-y-2">
                {data.clicksByOS.map((os, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 font-medium">
                      {os._id || "Unknown"}
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${(os.count / data.totalClicks) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-600">
                      {os.count} (
                      {Math.round((os.count / data.totalClicks) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Referrers */}
          {data.topReferrers.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.topReferrers.map((referrer, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referrer._id || "Direct"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {referrer.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.round(
                            (referrer.count / data.totalClicks) * 100
                          )}
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state for analytics data */}
      {data.totalClicks === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">
            No analytics data available yet. This link hasn't received any
            clicks.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkAnalyticsPage;
