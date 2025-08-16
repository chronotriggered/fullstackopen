import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering React components

import App from "./App"; // Import the App component from App.jsx
let counter = 1;

// render the App component to the root element that has the id "root"
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
