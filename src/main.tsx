import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import Modal from "react-modal";
import App from "./components/App";
import "./index.css";

import { dumpDb, getDB, initDB } from "./db";

await initDB();
const data = await dumpDb(await getDB());

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store(data)}>
    <App />
  </Provider>
);
