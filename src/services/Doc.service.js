const server_api = "http://localhost:3500/api";
export const getAllDocs = function() {
  return fetch(server_api + "/doc")
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      return data;
    });
};

export const getTextFromFile = function(filename) {
  console.log(filename);
  return fetch(server_api + "/doc/file?filename=" + filename)
    .then(resp => resp.text()) // Transform the data into text
    .then(function(data) {
      return data;
    });
};

export const updatedRelatedEntities = function(formData) {
  return fetch(server_api + "/doc/update_related_entities", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(response => response.json());
};

export const deleteEntity = function(formData) {
  return fetch(server_api + "/doc/entity", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(response => response.json());
};

export const deleteAllEntities = function(formData) {
  return fetch(server_api + "/doc/all_entities", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(response => response.json());
};

export const addSelectedTextAsEntity = function(formData) {
  return fetch(server_api + "/doc/add_entity", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  }).then(response => response.json());
};
