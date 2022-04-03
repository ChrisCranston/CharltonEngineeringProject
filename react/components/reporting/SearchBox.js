import React from "react";


/**
 * A search box used to search elements
 * 
 * This search box allow for the string enterd to be sent and handlew by a handleSearch methoid in the component that uses it
 * 
 * @author Christopher Ewart
 */
class SearchBox extends React.Component {

    render() {
        return (
            <div className="filter-element">
            <form className="search">
                <strong>Search: </strong>
                <input 
                type='text' 
                placeholder='search'
                value={this.props.search} 
                onChange={this.props.handleSearch} />
            </form>
            </div>
        )
    }
}

export default SearchBox;