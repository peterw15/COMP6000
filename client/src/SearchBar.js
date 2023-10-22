import React from 'react';

function Search(props) {
    return (
        <div style={{display : 'flex', flexDirection : 'row'}}>
            <form>
                <input type='text' style={{width:'300px', marginTop:'40px', marginLeft:'100px'}}></input>
                <input type='submit' value='Search' onClick={props.onClick} style={{marginLeft : '5px'}}></input>
            </form>
        </div>
    );
}

export default Search;