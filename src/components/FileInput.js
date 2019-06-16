import React, { useRef, useState } from "react";
import "./FileInput.css";

function FileInput(props) {
  const [hightlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadedFiles = files => {
    console.log(files);
    props.handleFileUpload(files);
    // upload to server here!
  };

  const handleChange = event => {
    event.preventDefault();
    handleUploadedFiles(fileInputRef.current.files);
  };

  const onDrop = event => {
    event.preventDefault();
    handleUploadedFiles(event.dataTransfer.files);
    setHighlight(false);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDragOver = evt => {
    evt.preventDefault();
    setHighlight(true);
  };

  return (
    <div
      className={`Dropzone ${hightlight ? "Highlight" : ""}`}
      onClick={() => fileInputRef.current.click()}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <img alt="upload" className="Icon" src="cloud_upload.svg" />
      <input
        className="FileInput"
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleChange}
      />
      <span style={{ color: "black" }}>Upload File(s)</span>
    </div>
  );
}

export default FileInput;
