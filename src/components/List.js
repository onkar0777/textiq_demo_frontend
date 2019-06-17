import React from "react";
//TODO I am using this list to improve performance. But it has issues like fixed height. Need to implement AutoSizer for this
import { List } from "react-virtualized";
import "./List.css";

function ListComponent(props) {
  const renderRow = ({ index, key, style }) => {
    return (
      <div
        onClick={
          !!props.onListItemClick
            ? () => props.onListItemClick(props.list[index], index)
            : undefined
        }
        key={key}
        style={style}
        className={
          index === props.selectedIndex
            ? `${props.selectedClass} ListItems`
            : "ListItems"
        }
      >
        {index + 1}.&nbsp;{props.list[index][props.value]}
      </div>
    );
  };
  return (
    <div className="list">
      <List
        width={props.rowWidth}
        height={props.listHeight}
        rowHeight={props.rowHeight}
        rowRenderer={renderRow}
        rowCount={props.list.length}
      />
    </div>
  );
}

export default ListComponent;
