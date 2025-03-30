import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";

// Find the root element
const container = document.getElementById("root");

// Ensure the container exists before creating the root
if (container) {
  // Create a root
  const root = createRoot(container);

  // Initial render
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
