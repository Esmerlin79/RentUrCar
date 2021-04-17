import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AppRouter } from "./routes/AppRouter";
import { setupAxios } from "./setupAxios";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

setupAxios();

ReactDOM.render(<AppRouter />, rootElement);

registerServiceWorker();
