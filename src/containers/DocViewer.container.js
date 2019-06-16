import React, { Fragment, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import EntityPanel from "../components/EntityPanel";
import DocViewer from "../components/DocViewer";
import * as DocService from "../services/Doc.service";
import "./DocViewer.container.css";

function DocViewerContainer({
  document,
  updateCurrentDocument,
  updateEntityInDoc,
  addEntityToDoc
}) {
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    setSelectedEntity(null);
  }, [document]);

  const onHighlightClick = entityText => {
    const selectedEntity = document.entities.filter(
      x => x.val === entityText
    )[0];
    console.log(entityText, selectedEntity, document.entities);
    setSelectedEntity(selectedEntity);
  };
  const saveRelatedEntities = relatedEntities => {
    console.log("save these- ", selectedEntity, relatedEntities);
    DocService.updatedRelatedEntities({
      docId: document._id,
      entityId: selectedEntity._id,
      relatedEntities
    }).then(updatedEntity => {
      setSelectedEntity(updatedEntity);
      updateEntityInDoc(updatedEntity);
    });
  };

  const deleteEntity = () => {
    console.log("delete entity- ", selectedEntity);
    DocService.deleteEntity({
      docId: document._id,
      entity: selectedEntity._id
    }).then(updatedDoc => {
      updateCurrentDocument(updatedDoc);
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
            />
          )}
        </div>
      </CSSTransition>
    </Fragment>
  );
}

export default DocViewerContainer;
