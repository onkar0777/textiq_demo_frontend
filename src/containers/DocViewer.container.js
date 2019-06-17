import React, { Fragment, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import EntityPanel from "../components/EntityPanel";
import DocViewer from "../components/DocViewer";
import * as DocService from "../services/Doc.service";
import "./DocViewer.container.css";

function DocViewerContainer({
  document,
  updateCurrentDocumentOnDeletion,
  updateEntityInDoc,
  addEntityToDoc,
  selectedEntity,
  onHighlightClick
}) {
  const saveRelatedEntities = relatedEntities => {
    console.log("save these- ", selectedEntity, relatedEntities);
    DocService.updatedRelatedEntities({
      docId: document._id,
      entityId: selectedEntity._id,
      relatedEntities
    }).then(updatedEntity => {
      updateEntityInDoc(updatedEntity);
    });
  };

  const deleteEntity = () => {
    console.log("delete entity- ", selectedEntity);
    DocService.deleteEntity({
      docId: document._id,
      entity: selectedEntity._id
    }).then(updatedDoc => {
      updateCurrentDocumentOnDeletion(updatedDoc);
    });
  };

  const deleteAllEntities = () => {
    console.log("delete entity- ", selectedEntity);
    DocService.deleteAllEntities({
      docId: document._id
    }).then(updatedDoc => {
      updateCurrentDocumentOnDeletion(updatedDoc);
    });
  };

  const addSelectedTextAsEntity = selectedText => {
    console.log(selectedText);
    DocService.addSelectedTextAsEntity({
      docId: document._id,
      selectedText
    }).then(addedEntity => {
      addEntityToDoc(addedEntity);
    });
  };

  return (
    <Fragment>
      <DocViewer
        className="DocViewer"
        document={document}
        onHighlightClick={onHighlightClick}
        addSelectedTextAsEntity={addSelectedTextAsEntity}
      />
      <CSSTransition
        in={!!selectedEntity}
        timeout={2000}
        classNames="entityNode"
      >
        <div className="entityNodeDiv">
          {!!selectedEntity && (
            <EntityPanel
              saveRelatedEntities={saveRelatedEntities}
              deleteEntity={deleteEntity}
              document={document}
              entity={selectedEntity}
              deleteAllEntities={deleteAllEntities}
            />
          )}
        </div>
      </CSSTransition>
    </Fragment>
  );
}

export default DocViewerContainer;
