import React, { useState, useRef, useEffect } from "react";

const GraphSetting = ({ id, data, format, updateGraph, removeGraph }) => {
  const [graphData, setGraphData] = useState(data);
  const [graphFormat, setGraphFormat] = useState(format);
  const [dataOpen, setDataOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);
  const formatMenuRef = useRef(null);
  const dataMenuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dataMenuRef.current && !dataMenuRef.current.contains(event.target)) {
      setDataOpen(false);
    }
    if (formatMenuRef.current && !formatMenuRef.current.contains(event.target)) {
      setFormatOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDataChange = (value) => {
    setGraphData(value);
    updateGraph(id, value, graphFormat);
    setDataOpen(!dataOpen);
  };

  const handleFormatChange = (value) => {
    setGraphFormat(value);
    updateGraph(id, graphData, value);
    setFormatOpen(!formatOpen);
  };

  const handleRemove = () => {
    removeGraph(id);
  };

  return (
    <div className="graph-setting">
      Graph {id + 1} Settings:
      <div className="menu-container" ref={dataMenuRef}>
        <div className="menu-trigger" onClick={() => setDataOpen(!dataOpen)}>
          <button id="graphForm">{graphData}</button>
        </div>
          <div className={`dropdown-menu ${dataOpen ? "active" : "inactive"}`}>
            <ul className="dropdownList">
              <button onClick={() => handleDataChange("Tackles")}>
                Tackles
              </button>
              <button onClick={() => handleDataChange("Shots")}>Shots</button>
              <button onClick={() => handleDataChange("Passes")}>
                Passes
              </button>
            </ul>
          </div>
      </div>
      <div className="menu-container" ref={formatMenuRef}>
        <div className="menu-trigger" onClick={() => setFormatOpen(!formatOpen)}>
          <button id="graphForm">{graphFormat}</button>
        </div>
        <div className="optionHolder">
          <div className={`dropdown-menu ${formatOpen ? "active" : "inactive"}`}>
            <ul className="dropdownList">
              <button onClick={() => handleFormatChange("Bar")}>Bar</button>
              <button onClick={() => handleFormatChange("Line")}>Line</button>
              <button onClick={() => handleFormatChange("Pie")}>Pie</button>
            </ul>
          </div>
        </div>
      </div>
      <button onClick={handleRemove}>Remove Graph</button>
    </div>
  );
};

export default GraphSetting;