import React from "react";
import "./FileUploader.container.css";
import FileInput from "../components/FileInput";
import { uploadFileToServer } from "../services/FileUploader.service";

const handleFileUpload = function(files) {
  console.log(files);
  [...files].forEach(file => {
    uploadFileToServer(file);
  });
};

function FileUploader() {
  return (
    <div className="FileUploadContainer">
      <FileInput handleFileUpload={handleFileUpload} />
    </div>
  );
}

export default FileUploader;
