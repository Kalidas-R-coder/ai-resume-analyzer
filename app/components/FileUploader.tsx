import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";

interface FileUploaderProps {
  onFileSelect? : (file: File | null) => void;
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);
  return `${size} ${units[i]}`;
};

const FileUploader = ({onFileSelect} :FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0] || null;
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024;
  const {getRootProps, getInputProps, isDragActive, inputRef} = useDropzone({
    onDrop,
    multiple: false,
    accept: {'application/pdf' : ['.pdf']},
    maxSize: maxFileSize});

  return (
    <div className="w-full">
      <div {...getRootProps()} className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-300 ${
        isDragActive
          ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 scale-[1.01]'
          : 'border-[#26334D] bg-[#111C32] hover:border-[#8B5CF6]/50 hover:bg-[#182238]'
      }`}>
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 min-w-0">
              {/* PDF Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#182238] border border-[#26334D] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#F8FAFC] truncate">{file.name}</p>
                <p className="text-sm text-[#94A3B8]">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              type="button"
              className="flex-shrink-0 p-2 rounded-lg hover:bg-[#182238] transition-colors duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                onFileSelect?.(null);
                if (inputRef?.current) {
                  inputRef.current.value = '';
                }
              }}
            >
              <svg className="w-5 h-5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            {/* Upload icon with gradient background */}
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl" />
              <div className="relative rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-[#26334D] w-16 h-16 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-[#F8FAFC] text-base font-medium">
              <span className="text-[#8B5CF6]">Click to upload</span> or drag and drop
            </p>
            <p className="mt-2 text-[#94A3B8] text-sm">
              PDF only (max {formatSize(maxFileSize)})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;