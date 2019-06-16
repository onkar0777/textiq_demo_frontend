import React from "react";
import "./List.container.css";
import ListComponent from "../components/List";

function ListContainer(props) {
  return (
    <div className="ListContainer">
      <ListComponent
        listHeight={700}
        rowHeight={50}
        rowWidth={250}
        onListItemClick={props.onListItemClick}
        list={props.docs}
        value="name"
        selectedIndex={props.selectedIndex}
        selectedClass="SelectedListItem"
      />
    </div>
  );
}

export default ListContainer;
