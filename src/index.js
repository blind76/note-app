import React from "react";
import ReactDOM from "react-dom";

import { NotesProvider } from "./components/Notes/NotesProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
