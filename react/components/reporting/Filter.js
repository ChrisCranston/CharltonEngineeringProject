import React from "react";

class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }

    render() {

     let options = this.props.options;


        return (
            <form className="dropdown">
               <strong>{this.props.filterType}</strong>
                <select value={this.props.custType} onChange={this.props.handleSelect}>
                    <option value="">No Filter</option>
                    {options.map(( index) => <option value={index} >{index}</option>)}
            </select>
               
            </form>
                
        )
    }
}

export default Filter;