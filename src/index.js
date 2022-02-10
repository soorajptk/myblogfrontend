import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextAppProvider } from "./context/context";

ReactDOM.render(
  <React.StrictMode>
    <ContextAppProvider>
      <App />
    </ContextAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
