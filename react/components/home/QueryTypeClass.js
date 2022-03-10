import React from 'react';

class QueryType extends React.Component {
    constructor() {
        super();
    }

    render () {
        let querytypes = this.props.state.querytypes;
        let optionItems = querytypes.map((querytype) =>
                <option key={querytype.query_type_id}  value={querytype.query_type_id}>{querytype.query_type_name}</option>
            );

        return (
         <div>
             <select value={this.props.querytype}
            onChange={this.props.handleQueryType}>
                {optionItems}
             </select>
         </div>
        )
    }
}

export default QueryType;