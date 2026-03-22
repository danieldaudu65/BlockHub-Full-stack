import React, { useEffect, useRef, useState } from 'react';
import { HiFolderOpen } from 'react-icons/hi2';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { GoCheckCircleFill, GoCircle } from 'react-icons/go';
import { API_URL } from '../../../confiq';
import toast from 'react-hot-toast';

type PortfolioItem = {
  _id: string;
  name: string;
  url: string;
  publicId: string;
  size?: number;
  mimeType?: string;
  isPrimary?: boolean;
};

type PortfolioModalProps = {
  onClose: () => void;
  user: any

};

const EditPortfolioModal: React.FC<PortfolioModalProps> = ({ onClose }) => {
  const [cvs, setCvs] = useState<PortfolioItem[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem('token') || '';

  const fetchPortfolios = async () => {
    try {
      const res = await fetch(`${API_URL}/user_profile/get_portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch portfolios');

      setCvs(data.portfolios || []);
      const primary = (data.portfolios || []).find((p: PortfolioItem) => p.isPrimary);
      setSelectedCvId(primary?._id || (data.portfolio?.[0]?._id ?? null));
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Could not load portfolios');
    }
  };

  useEffect(() => {
    fetchPortfolios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('token', token);

      const res = await fetch(`${API_URL}/user_profile/add_portfolio`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setCvs(data.portfolios || []);
      const newItem = (data.portfolios || [])[0];
      setSelectedCvId(newItem?._id || null);
      toast.success('Portfolio uploaded');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
      e.target.value = ''; // reset input
    }
  };

  const refreshPortfolios = async () => {
    try {
      const res = await fetch(`${API_URL}/user_profile/get_portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch portfolios');

      setCvs(data.portfolios || []);
      const primary = (data.portfolios || []).find((p: PortfolioItem) => p.isPrimary);
      setSelectedCvId(primary?._id || (data.portfolio?.[0]?._id ?? null));
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Could not load portfolios');
    }
  };
  const selectPrimary = async (portfolioId: string) => {

    console.log(token, portfolioId)
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user_profile/portfolios/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, portfolioId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to set primary');

      setCvs(data.portfolios || []);
      setSelectedCvId(portfolioId);
      await refreshPortfolios()
      toast.success('Primary portfolio updated');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Failed to set primary');
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolio = async (portfolioId: string) => {
    if (!confirm('Delete this portfolio?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user_profile/delete_portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, publicId: portfolioId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');

      setCvs(data.portfolios || []);
      const primary = (data.portfolios || []).find((p: PortfolioItem) => p.isPrimary);
      setSelectedCvId(primary?._id || (data.portfolios?.[0]?._id ?? null));
      toast.success('Portfolio deleted');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end z-60">
      <div className="bg-[#181A1D] w-full max-w-lg p-6 rounded-t-xl shadow-lg transform translate-y-0 transition-transform duration-700 ease-out min-h-1/3 flex flex-col max-h-screen">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-100">Edit portfolio</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-400 p-[1px] bg-zinc-600 rounded-full hover:text-gray-200">
            <IoIosClose size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto modal-content-scrollable pr-4">
          <div className="mb-6 text-sm">
            <label className="block font-medium text-gray-200 mb-2">Portfolio</label>

            {cvs.length === 0 && (
              <p className="text-gray-400 text-sm mb-3">No portfolio yet. Upload one below.</p>
            )}

            {cvs.map((cv, index) => (
              <div
                key={cv._id || `${cv.publicId}-${index}`}
                className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg transition-all border-2 border-dashed bg-neutral-900 ${selectedCvId === cv._id ? 'border-secondary-main' : 'border-transparent'
                  }`}
              >
                <span className="flex items-center text-gray-300 truncate space-x-5">
                  <HiFolderOpen size={50} />
                  <span className="truncate">
                    <p className="font-semibold truncate">{cv.name?.slice(0, 60) || 'Portfolio'}</p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={cv.url}
                      className="mt-1 text-xs underline text-gray-400 truncate inline-block"
                    >
                      Preview
                    </a>
                  </span>
                </span>

                <div className="flex items-center gap-3">
                  {/* Select primary */}
                  <button
                    className="text-secondary-main"
                    onClick={() => selectPrimary(cv.publicId)}
                    title="Set as primary"
                    disabled={loading}
                  >
                    {selectedCvId === cv._id ? <GoCheckCircleFill size={20} /> : <GoCircle size={20} />}
                  </button>

                  {/* Delete */}
                  <button
                    className="text-gray-400 hover:text-red-400 text-xs"
                    onClick={() => deletePortfolio(cv.publicId)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Portfolio */}
          <div className="mb-16">
            <div className="flex items-center mb-2 space-x-1 text-sm text-secondary-main">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center hover:text-gray-400 disabled:opacity-60"
                disabled={loading}
              >
                <span className="block cursor-pointer"><IoIosAdd size={30} /></span>
                <label className="block cursor-pointer">Upload portfolio</label>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
              />
            </div>
            <p className="text-xs text-gray-500">PDF, DOCX, or image. Cloudinary free tier max ~100MB per file.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full p-4 fixed bottom-0 left-0 bg-neutral-900 border-zinc-900">
          <button
            onClick={onClose}
            className="w-full bg-blue-main text-white py-4 rounded-xl font-medium cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Working…' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolioModal;
