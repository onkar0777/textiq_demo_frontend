export const uploadFileToServer = file => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    const formData = new FormData();
    formData.append("file", file, file.name);

    req.open("POST", "http://localhost:3500/api/upload");
    req.send(formData);
  });
};
