import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor } from "./redux/store";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>
);
