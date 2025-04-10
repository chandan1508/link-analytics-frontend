

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserUrls } from "../api/urls";
import CreateLinkForm from "../components/Dashboard/CreateLinkform";
import StatsCards from "../components/Dashboard/StatsCards";
import { selectCurrentUser } from "../features/auth/authSlice";
import { FiCopy, FiDownload } from "react-icons/fi";
// import { toast } from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';

const DashboardPage = () => {
  const user = useSelector(selectCurrentUser);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newShortUrl, setNewShortUrl] = useState(null);
  const [newQrCode, setNewQrCode] = useState(null);

  const fetchLinks = async (id) => {
    setIsLoading(true);
    try {
      const data = await getUserUrls(id);
      // console.log(data.data);
      setLinks(data.data);
    } catch (err) {
      setError(err.message || "Failed to fetch links");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLinks(user.id);
    }
  }, [user]);

  const handleLinkCreated = (newLink) => {
    setLinks([newLink, ...links]);
    setNewShortUrl(newLink.shortUrl);
    setNewQrCode(newLink.qrCode);
    // console.log(newLink.qrCode)
     // Assuming qrCode is included in the response
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newShortUrl);
    toast("URL copied to clipboard!");
  };

  const downloadQRCode = () => {
    if (!newQrCode) return;
    
    const link = document.createElement('a');
    link.href = newQrCode;
    link.download = `qr-code-${newShortUrl?.split('/').pop() || 'link'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return <div>Please log in to view this page</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <StatsCards links={links} />
          {/* Show short URL only when it exists */}
          {newShortUrl && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  Your new short URL:
                </p>
                <button
                  onClick={copyToClipboard}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FiCopy className="inline" />
                  <span className="text-sm">Copy</span>
                </button>
              </div>
              <a
                href={newShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all block mt-2"
              >
                {newShortUrl}
              </a>
              
              {/* QR Code Section */}
              {newQrCode && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">QR Code:</p>
                    <button
                      onClick={downloadQRCode}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiDownload className="inline" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <img 
                      src={newQrCode} 
                      alt="QR Code" 
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <CreateLinkForm onSuccess={handleLinkCreated} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
