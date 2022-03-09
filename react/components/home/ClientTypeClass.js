import React from 'react';

class ClientType extends React.Component {
    constructor() {
        super();
    }

    render () {
        let clienttypes = this.props.state.clienttypes;
        console.log(clienttypes)
        let optionItems = clienttypes.map((clienttype) =>
                <option key={clienttype.prospective_client_type_id} value={clienttype.prospective_client_type_id}>{clienttype.prospective_client_type}</option>
            );

        return (
         <div>
             <select>
                {optionItems}
             </select>
         </div>
        )
    }
}

export default ClientType;