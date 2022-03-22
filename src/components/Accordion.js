import React from "react";
import { useState } from "react";
// receive list of items
const Accordion = ({ items }) => {
    // array destructuring, to get access to some elements inside an array
    const [activeIndex, setActiveIndex] = useState(null); // initial value null is immediately assigned to activeIndex
    // useState is a React primitive hooks
    // setActiveIndex is to update a piece of state, any time it is called it will cause the entire component to re-render
    const onTitleClick = (index) => {
        setActiveIndex(index);
    };
    const renderedItems = items.map((item, index)=> {
        const active = index === activeIndex ? 'active' : '';
        // wrap the callback function with an arrow function to run the callback function sometime in the future
        return (
        <React.Fragment key={ item.title }>
            <div className={`title ${active}`}
            onClick={() => onTitleClick(index)}>
                <i className="dropdown icon"></i>
                { item.title }
            </div>
            <div className={`content ${active}`}>
                <p>{ item.content }</p>
            </div>
        </React.Fragment>
        );
    });
    return (
        <div className="ui styled accordion">
            { renderedItems }
        </div>
    )
};

export default Accordion;