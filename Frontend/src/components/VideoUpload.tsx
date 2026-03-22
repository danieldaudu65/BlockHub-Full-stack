import { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import type { UploadedFile } from "../types/course";

interface VideoUploadProps {
  file: File | UploadedFile | null;
  onFileSelect: (file: File | null) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ file, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="text-white/70 text-sm mb-1">Upload Video</label>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 py-12 cursor-pointer transition
                    ${isDragging ? 'border-green-500 bg-[#111]' : 'border-[#232323] bg-transparent'}
                    hover:border-green-500`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('video-input')?.click()}
      >
        {!file ? (
          <>
            <IoCloudUploadSharp className="w-10 h-10 mb-2" />
            <span className="text-white/50 text-sm">Drag & Drop or Click to Upload</span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <video
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : file?.url
              } controls
              className="w-full max-w-xs rounded-lg"
            />
            <button
              onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}
              className="text-red-500 text-sm hover:text-red-400 mt-2"
            >
              Remove Video
            </button>
          </div>
        )}
        <input
          type="file"
          id="video-input"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};