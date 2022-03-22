import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {  // adding manual eventlistener
        const onBodyclick = (event) => { // to close dropdown when click out of the dropdown menu
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        } 
        document.body.addEventListener('click', onBodyclick, { capture: true } ); // include this for react v17
         
        return () => {
            document.body.removeEventListener('click', onBodyclick, 
            { capture : true });
          
         };
    }, []);

    const renderedOptions = options.map((option) => {
        if(option.value === selected.value) { // selected option will not be displayed in the dropdown list
            return null;
        }
        return (
            <div key={ option.value } 
            className="item"
            onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    });
    console.log(ref.current);
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{ label }</label>
                <div onClick={() => setOpen(!open)} 
                className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{ selected.label }</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        { renderedOptions }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dropdown;