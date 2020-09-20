import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App/App";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then(registration => {
          // tslint:disable-next-line:no-console
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope,
          );
        })
        .catch(err => {
          // tslint:disable-next-line:no-console
          console.log("ServiceWorker registration failed: ", err);
        });
    });
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
