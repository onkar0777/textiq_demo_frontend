import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ListContainer from "./containers/List.container";
import DocViewerContainer from "./containers/DocViewer.container";
import * as DocService from "./services/Doc.service";

function App() {
  // This can be calculated using docs and currentIndex. Used it like this for ease of use. Would have refactored if had time.
  const [currentDoc, setCurrentDoc] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(null);
  const [docs, setDocs] = useState([]); // List of docs fetched initially
  const [selectedEntity, setSelectedEntity] = useState(null); // The selected named entity

  useEffect(() => {
    console.log("rendering again");
    DocService.getAllDocs()
      .then(docs => {
        setDocs(docs);
        fetchFile(docs[0], 0);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // For inital rendering

  const onHighlightClick = entityText => {
    const selectedEntity = currentDoc.entities.filter(
      x => x.val === entityText
    )[0];
    console.log(entityText, selectedEntity, currentDoc.entities);
    setSelectedEntity(selectedEntity);
  };

  const fetchFile = (docMeta, index) => {
    setCurrentDocIndex(index);
    DocService.getTextFromFile(docMeta.name).then(text => {
      docMeta.text = text;
      docMeta.searchWords = docMeta.entities.map(x => x.val);
      setCurrentDoc(docMeta);
      setSelectedEntity(null);
    });
  };

  const updateCurrentDocInList = updatedDoc => {
    setDocs([
      ...docs.slice(0, currentDocIndex),
      updatedDoc,
      ...docs.slice(currentDocIndex + 1)
    ]);
  };

  const updateCurrentDocumentOnDeletion = doc => {
    let newDoc = {
      ...currentDoc,
      entities: doc.entities,
      searchWords: doc.entities.map(x => x.val)
    };
    setCurrentDoc(newDoc);
    setSelectedEntity(null);
    updateCurrentDocInList(newDoc);
  };

  const updateEntityInDoc = entity => {
    const entityIndex = currentDoc.entities.findIndex(
      x => x._id === entity._id
    );
    console.log(entityIndex, currentDoc, currentDoc.entities);
    if (entityIndex !== -1) {
      let newDoc = {
        ...currentDoc,
        entities: [
          ...currentDoc.entities.slice(0, entityIndex),
          entity,
          ...currentDoc.entities.slice(entityIndex)
        ]
      };
      setCurrentDoc(newDoc);
      setSelectedEntity(entity);
      updateCurrentDocInList(newDoc);
    }
    console.log(entityIndex, currentDoc, currentDoc.entities);
  };

  const addEntityToDoc = entity => {
    let newDoc = {
      ...currentDoc,
      entities: [...currentDoc.entities, entity],
      searchWords: [...currentDoc.searchWords, entity.val]
    };
    setCurrentDoc(newDoc);
    updateCurrentDocInList(newDoc);
  };

  return (
    <Fragment>
      <header className="App-header">
        <h1>Demo for TextIQ {!!currentDoc && `-${currentDoc.name}`}</h1>
      </header>
      <div className="App">
        {/* <FileUploader />  --- Created this in beginning. Didn't have time to integrate*/}
        {docs.length ? (
          <ListContainer
            selectedIndex={currentDocIndex}
            onListItemClick={fetchFile}
            docs={docs}
          />
        ) : (
          <span>Loading...</span>
        )}
        {!!currentDoc && (
          <DocViewerContainer
            updateCurrentDocumentOnDeletion={updateCurrentDocumentOnDeletion}
            updateEntityInDoc={updateEntityInDoc}
            addEntityToDoc={addEntityToDoc}
            document={currentDoc}
            onHighlightClick={onHighlightClick}
            selectedEntity={selectedEntity}
            removeSelectedEntity={() => setSelectedEntity(null)}
          />
        )}
      </div>
    </Fragment>
  );
}

export default App;
