import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import Popover from "react-tiny-popover";

import "./DocViewer.css";
import Button from "../common/Button";

function DocViewer({
  document,
  selectedEntity,
  onHighlightClick,
  addSelectedTextAsEntity
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const onDoubleClick = () => {
    const newSelectedText = window.getSelection().toString();
    if (newSelectedText.length) {
      if (!(selectedEntity && selectedEntity.val === newSelectedText)) {
        setIsPopoverOpen(true);
        setSelectedText(newSelectedText);
        return;
      }
    }
    setSelectedText("");
    setIsPopoverOpen(false);
  };
  useEffect(() => {
    setIsPopoverOpen(false);
  }, [document]);
  function HighlightedEntity({ children }) {
    return (
      <mark
        className={
          selectedEntity && selectedEntity.val === children
            ? "HighlightClassName SelectedHighlight"
            : "HighlightClassName"
        }
        onClick={() => onHighlightClick(children)}
      >
        {children}
      </mark>
    );
  }
  return (
    <Popover
      isOpen={isPopoverOpen}
      position={"top"} // preferred position
      content={
        <Button
          onClick={() => addSelectedTextAsEntity(selectedText)}
          background="lightgreen"
        >
          Add as Named Entity
        </Button>
      }
    >
      <Highlighter
        className="HighlightedEmail"
        highlightClassName="HighlightClassName"
        caseSensitive={true}
        searchWords={document.searchWords}
        autoEscape={true}
        textToHighlight={document.text}
        highlightTag={HighlightedEntity}
        onDoubleClick={onDoubleClick}
        onMouseUp={onDoubleClick}
      />
    </Popover>
  );
}

export default DocViewer;
