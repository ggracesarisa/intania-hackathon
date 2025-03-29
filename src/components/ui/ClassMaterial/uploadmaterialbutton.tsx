import React, { useState } from 'react'
import { Upload } from 'lucide-react';


type FileType = File | null;

const Uploadmaterialbutton = () => {
  const [file, setFile] = useState<FileType>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; 
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const handleButtonClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="w-[142px] h-[142px] rounded-full bg-white border-8 border-black flex items-center justify-center text-black text-lg font-bold flex-col hover:cursor-pointer hover:scale-105"
      >
        <Upload width={63} height={63} />
      </button>

      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      {file && (
        <div className="mt-4 text-center">
          <p>Selected File: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default Uploadmaterialbutton;
