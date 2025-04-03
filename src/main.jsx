import React from "react";
import ReactDOM from "react-dom/client";
import Hero from "./Hero.jsx";
import "./styles.css";

// Find all elements with the 'data-canvas="diamond"' attribute
const canvasContainers = document.querySelectorAll('[data-canvas="diamond"]');

canvasContainers.forEach((container) => {
    if (container) {
        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                {" "}
                {/* Added StrictMode for good practice */}
                <Hero />
            </React.StrictMode>,
        );
    } else {
        console.error(
            'Could not find container element with attribute [data-canvas="diamond"]:',
            container,
        );
    }
});

if (canvasContainers.length === 0) {
    console.warn(
        'No elements found with the attribute [data-canvas="diamond"]',
    );
}
