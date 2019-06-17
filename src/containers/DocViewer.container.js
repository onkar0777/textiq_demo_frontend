import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import EntityPanel from "../components/EntityPanel";
import DocViewer from "../components/DocViewer";
import * as DocService from "../services/Doc.service";
import "./DocViewer.container.css";
import Button from "../common/Button";

function DocViewerContainer({
  document,
  updateCurrentDocumentOnDeletion,
  updateEntityInDoc,
  addEntityToDoc,
  selectedEntity,
  onHighlightClick,
  removeSelectedEntity
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
        selectedEntity={selectedEntity}
        onHighlightClick={onHighlightClick}
        addSelectedTextAsEntity={addSelectedTextAsEntity}
      />
      <div className="entityNodeDiv">
        <CSSTransition
          in={!!selectedEntity}
          timeout={2000}
          classNames="entityNode"
        >
          <div>
            {!!selectedEntity && (
              <EntityPanel
                saveRelatedEntities={saveRelatedEntities}
                deleteEntity={deleteEntity}
                document={document}
                entity={selectedEntity}
                deleteAllEntities={deleteAllEntities}
                removeSelectedEntity={removeSelectedEntity}
              />
            )}
          </div>
        </CSSTransition>
        <Button
          style={{ marginTop: "2rem", width: "100%" }}
          background="white"
          color="maroon"
          onClick={deleteAllEntities}
        >
          Delete All Entities
        </Button>
      </div>
    </Fragment>
  );
}

export default DocViewerContainer;
