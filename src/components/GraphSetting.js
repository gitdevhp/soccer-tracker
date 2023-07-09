import React, {useState, useEffect, useRef} from 'react';

const GraphSetting = ({ children }) => {
    const [open, setOpen] = useState(false);
    
    let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className='graph-setting'>
        {children}
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <button id='graphForm'> No Graph Selected </button>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem text = {"Tackles"} onClick={() => document.getElementById('graphFrom').innerHTML = 'Tackles'}/>
            <DropdownItem text = {"Shots"} onClick={() => document.getElementById('graphFrom').innerHTML = 'Shots'}/>
            <DropdownItem text = {"Passes"} onClick={() => document.getElementById('graphForm').innerHTML = 'Passes'}/>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}


export default GraphSetting;