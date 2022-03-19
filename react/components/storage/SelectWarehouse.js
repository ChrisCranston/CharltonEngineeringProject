import React from "react";

/**
 * SelectAward
 *
 * This simple component returns a dropdown select list used to filter awards in
 * the PaperManager component.
 *
 * @author Chris Cranston - W18018468
 */
class SelectWarehouse extends React.Component {
  render() {
    return (
      <label>
        Filter by Warehouse:
        <select
          value={this.props.warehouse}
          onChange={this.props.handleWarehouseSelect}
        >
          <option value=""> show all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>          
        </select>
      </label>
    );
  }
}

export default SelectWarehouse;
