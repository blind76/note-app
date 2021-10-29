import React from "react";

import NoteList from "./components/Notes/NoteList";
import GlobalStyle from "./theme/globalStyles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NoteList />
    </>
  );
};

export default App;
