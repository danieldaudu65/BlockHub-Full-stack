import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { HiFolderOpen } from "react-icons/hi2";
import toast, { Toaster } from 'react-hot-toast';
// import { ClipLoader } from 'react-spinners';
// import type CLiploader from '../../components/CLiploader';
import { API_URL } from '../../confiq';
import { ClipLoader } from 'react-spinners';

const UploadPortfolio: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isFileTypeValid = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setError(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      if (isFileTypeValid(uploadedFile)) {
        setFile(uploadedFile);
      } else {
        setError('Invalid file type. Please upload a PDF, JPEG, or PNG.');
        setFile(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      if (isFileTypeValid(uploadedFile)) {
        setFile(uploadedFile);
      } else {
        setError('Invalid file type. Please upload a PDF, JPEG, or PNG.');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    toast.loading('Uploading portfolio...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', localStorage.getItem('token') || '');

      const res = await fetch(`${API_URL}/user_onboard/upload_portfolio`, {
        method: 'POST',
        body: formData
      });

      toast.dismiss(); // remove the loading toast

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      toast.success('Portfolio uploaded successfully!');
      navigate('/all-set-success');

    } catch (err: any) {
      toast.dismiss();
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex flex-col">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Link to="/select-interest">
          <FaArrowLeft className="text-xl hover:text-blue-main transition-colors ease-in-out duration-150" />
        </Link>
        <div className="flex gap-2">
          <div className="w-6 h-1 bg-blue-main rounded-full"></div>
          <div className="w-6 h-1 bg-blue-main rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col p-5 flex-grow">
        <div className='mb-8'>
          <h2 className='text-3xl font-semibold mb-2'>Upload your portfolio</h2>
          <p className='text-gray-400 text-sm'>
            Upload portfolio to use as proof of work.
          </p>
        </div>

        {/* Drag and drop area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative flex-grow flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-500 rounded-xl"
        >
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {!file ? (
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <HiFolderOpen size={48} className="text-secondary-main mb-2" />
              <span className="text-lg text-gray-400">
                Drag and drop, or <span className="text-secondary-main font-bold">browse</span> for your file
              </span>
              <p className="text-sm text-gray-500 mt-2">File must be in PDF, JPEG or PNG</p>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="flex flex-col items-center">
              <HiFolderOpen size={48} className="text-secondary-main mb-2" />
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(3)} MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom button */}
      <div className='w-full border-t-1 border-neutral-800 bg-neutral-900 sticky bottom-0 flex items-center justify-center p-4'>
        <button
          disabled={!file || loading}
          onClick={handleUpload}
          className={`
            w-full p-4 text-center rounded-2xl font-medium transition flex justify-center items-center gap-2
            ${file
              ? 'bg-blue-main text-white hover:bg-secondary-main/80'
              : 'bg-blue-main/40 text-gray-400 cursor-not-allowed'
            }`}
        >
{loading ? <ClipLoader  size={32} color="#4F46E5" /> : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default UploadPortfolio;
