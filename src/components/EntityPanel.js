import React, { useState, useEffect } from "react";
import "./EntityPanel.css";
import Select from "react-select";
import Button from "../common/Button";

function EntityPanel({ document, entity, deleteEntity, saveRelatedEntities }) {
  const [dropdownVal, setDropdownVal] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    let filteredEntities = document.entities.filter(x => x._id !== entity._id);
    filteredEntities = filteredEntities.filter(item =>
      entity.linked_to.every(item2 => item2._id !== item._id)
    );
    setDropdownOptions(filteredEntities);
    setDropdownVal([]);
  }, [entity, document]);

  return (
    <div className="EntityPanel">
      <h4 className="EntityLabels">Selected Named Entity</h4>
      <h4 className="SelctedEntityName">{entity.val}</h4>
      <h4 className="EntityLabels">Related Entities:</h4>
      <ol className="RelatedEntityList">
        {entity.linked_to && entity.linked_to.length
          ? entity.linked_to.map(x => <li key={x._id}>{x.val}</li>)
          : "NA"}
      </ol>
      <Select
        value={dropdownVal}
        onChange={selectedOptions => setDropdownVal(selectedOptions)}
        options={dropdownOptions}
        isMulti={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        getOptionLabel={option => option.val}
        getOptionValue={option => option._id}
        hideSelectedOptions={true}
        placeholder="Select Related Entity"
      />
      <Button
        background="darkgreen"
        color="white"
        onClick={() => saveRelatedEntities(dropdownVal)}
      >
        Save Related Entities
      </Button>
      <Button background="darkred" color="white" onClick={deleteEntity}>
        Delete Entity
      </Button>
    </div>
  );
}

export default EntityPanel;
