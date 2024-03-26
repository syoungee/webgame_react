import React from 'react';

export default function Popup({ message, className }) {
  function redo() {
    window.location.reload();
  }

  return (
    <div className={`pop-up ${className}`}>
      <button className="pop-up__refresh" onClick={redo}>
        Redo
      </button>
      <p className="pop-up__message">{message}</p>
    </div>
  );
}
