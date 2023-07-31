import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{alignItems: "center"}}>
        <div className="loading-spinner">
        </div>
    </div>
  );
}