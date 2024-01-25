import React from 'react';

function Search(props) {
    return (
        <div style={{display : 'flex', flexDirection : 'row', alignItems: 'center'}}>
            <form style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <input type='text' style={{width:'200px', height: '30px'}}></input>
                <input type='submit' value='Search' onClick={props.onClick} style={{marginLeft : '5px', height: '30px'}}></input>
            </form>
        </div>
    );
}

export default Search;