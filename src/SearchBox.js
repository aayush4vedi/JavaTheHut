import React from 'react';

const SearchBox = ()=>{
    return(
        <div className="pa2">
        <input 
            className='pa3 ba b--green bg-lightest-blue'
            type="text" 
            name="ranger" 
            placeholder="Search Ranger"
        />
        </div>
    );
}

export default SearchBox;