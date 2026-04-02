import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import PwaUpdateNotice from "./components/PwaUpdateNotice.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <PwaUpdateNotice />
  </>,
);
