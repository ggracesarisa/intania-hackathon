import { Upload } from "lucide-react";
import React, { useState } from "react";

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
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="flex h-[142px] w-[142px] flex-col items-center justify-center rounded-full border-8 border-black bg-white text-lg font-bold text-black hover:scale-105 hover:cursor-pointer"
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
