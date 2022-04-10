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
      <span className="item-control-wrapper">
      <label>
        Filter by Warehouse:
        </label>
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
        </span>
      
    );
  }
}

export default SelectWarehouse;
