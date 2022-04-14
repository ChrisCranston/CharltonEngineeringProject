import React from 'react';

/**
 * Client Type Option box Component
 *
 *This component is an option box populated from the database and applied on the form
 * 
 * @author Kess Strongman
 */
class ClientType extends React.Component {
 
    render () {
        let clienttypes = this.props.state.clienttypes;
        let optionItems = clienttypes.map((clienttype) =>
                <option key={clienttype.prospective_client_type_id} value={clienttype.prospective_client_type_id}>{clienttype.prospective_client_type}</option>
            );

        return (
         <div>
             <select value={this.props.clienttype}
            onChange={this.props.handleClientType}>
                {optionItems}
             </select>
         </div>
        )
    }
}

export default ClientType;