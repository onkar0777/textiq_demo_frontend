import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import ListContainer from "./containers/List.container";
import DocViewerContainer from "./containers/DocViewer.container";
import * as DocService from "./services/Doc.service";

function App() {
  const [currentDoc, setCurrentDoc] = useState(null);
  const [currentDocIndex, setCurrentDocIndex] = useState(null);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    DocService.getAllDocs()
      .then(docs => {
        setDocs(docs);
        fetchFile(docs[0], 0);
      })
      .catch(err => {
        console.log(err);
      });
  }, [docs.length]);

  const fetchFile = (docMeta, index) => {
    setCurrentDocIndex(index);
    DocService.getTextFromFile(docMeta.name).then(text => {
      docMeta.text = text;
      docMeta.searchWords = docMeta.entities.map(x => x.val);
      setCurrentDoc(docMeta);
    });
  };

  const updateCurrentDocInList = () => {
    const selctedDoc = { ...docs[currentDocIndex] };
    console.log(selctedDoc);
    selctedDoc.entities = currentDoc.entities;
    selctedDoc.searchWords = currentDoc.searchWords;
    setDocs([
      ...docs.slice(0, currentDocIndex),
      selctedDoc,
      ...docs.slice(currentDocIndex)
    ]);
  };

  const updateCurrentDocument = doc => {
    setCurrentDoc({
      ...currentDoc,
      entities: doc.entities,
      searchWords: doc.entities.map(x => x.val)
    });
    updateCurrentDocInList();
  };

  const updateEntityInDoc = entity => {
    const entityIndex = currentDoc.entities.findIndex(
      x => x._id === entity._id
    );
    console.log(entityIndex, currentDoc, currentDoc.entities);
    if (entityIndex !== -1) {
      setCurrentDoc({
        ...currentDoc,
        entities: [
          ...currentDoc.entities.slice(0, entityIndex),
          entity,
          ...currentDoc.entities.slice(entityIndex)
        ]
      });
    }
    console.log(entityIndex, currentDoc, currentDoc.entities);
  };

  const addEntityToDoc = entity => {
    setCurrentDoc({
      ...currentDoc,
      entities: [...currentDoc.entities, entity],
      searchWords: [...currentDoc.searchWords, entity.val]
    });
    updateCurrentDocInList();
  };

  return (
    <Fragment>
      <header className="App-header">
        <h1>Demo for TextIQ {!!currentDoc && `-${currentDoc.name}`}</h1>
      </header>
      <div className="App">
        {/* <FileUploader /> */}
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
            updateCurrentDocument={updateCurrentDocument}
            updateEntityInDoc={updateEntityInDoc}
            addEntityToDoc={addEntityToDoc}
            document={currentDoc}
          />
        )}
      </div>
    </Fragment>
  );
}

export default App;
