import React, { useState, useEffect, useRef } from 'react';

const GraphSetting = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState('No Graph Selected');

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className='graph-setting'>
      {children}
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
          <button id='graphForm'>
            {buttonText}
          </button>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
          <ul className='dropdownList'>
            <button onClick={() => {setButtonText("Tackles"); setOpen(!open)}}> Tackles </button>
            <button onClick={() => {setButtonText("Shots"); setOpen(!open)}}> Shots </button>
            <button onClick={() => {setButtonText("Passes");setOpen(!open)}}> Passes </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

/*function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}*/


export default GraphSetting;