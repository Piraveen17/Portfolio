import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";
import { App } from "./App";
import { CASE_STUDY_PATH } from "./lib/data";

const CaseStudyAiWorkflow = lazy(() =>
  import("./pages/CaseStudyAiWorkflow").then((m) => ({ default: m.CaseStudyAiWorkflow }))
);

const path = window.location.pathname.replace(/\/+$/, "");
const isCaseStudy = path === CASE_STUDY_PATH;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isCaseStudy ? (
      <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
        <CaseStudyAiWorkflow />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
