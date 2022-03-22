import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {

    const [term, setTerm] = useState('programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    // useEffect always runs when we first render the component
    // deBouncedterm increased effeciency and prevents multiple request call
        useEffect(() => {
            const timerId = setTimeout(() => {
                setDebouncedTerm(term);
            }, 1000)
            return() => {
                clearTimeout(timerId);
            } // cancel the timeout set when user inputs anything further
        }, [term]);
        // observing any term changes
        // every this useEffect changes, it will queue up a change to debounce term
        // if a user changes the term quickly, it will reset the timeout
        useEffect(() => {
            const search = async() => {
                const { data } = await axios.get('https://en.wikipedia.org/w/api.php' , {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: "json",
                        srsearch: debouncedTerm  // user input to search
                    }
                });
                setResults(data.query.search);
            };
            search();
        }, [debouncedTerm])
        // this will rerender when debouncedTerm changes
        
        /* useEffect(() => {
        
        if (term && !results.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                    }
                }, 1000); // declares a function and immediately invokes it
        
                return () => {
                    clearTimeout(timeoutId);
                }
        }
    }, [term, results.length]); */ // [] runs only at initial render

    const renderedResults = results.map((results) => {
        return (
            <div key={ results.pageid } className="item">
                <div className="right floated content">
                    <a className="ui button"
                        href={`https://en.wikipedia.org?curid=${results.pageid}`}>
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        { results.title }
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: results.snippet }}></span>
                </div>
            </div>
        )
    });

    return (
       <div>
           <div className="ui form">
            <div className="field">
            <label>Enter Search Term</label>
            <input 
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="input"/>
            </div>
           </div>
           <div className="ui celled list">
            { renderedResults }
           </div>
       </div>
    )
};

export default Search;