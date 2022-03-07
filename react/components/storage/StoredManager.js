import React from "react";
import Stored from "./Stored";
import Parts from "./Parts";

/**
 * StoredManager
 *
 *
 * @author Chris Cranston - W18018468
 */
class StoredManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  componentDidMount() {
    const url =
      "http://localhost/kv6002/php/stored";
    this.fetchData(url);
  }

  componentDidUpdate(prevProps) {
    const url =
      "http://localhost/kv6002/php/stored";
    this.fetchData(url);
  }

  fetchData = (url) => {
    if (this.props.item_type === "part") {
      console.log("search")
      url += "?part_search=true"
    } else if (this.props.item_type === "location") {
      url += "?location_search=true"
    }
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        this.setState({ results: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  };

  render() {
    let noData = "";

    if (this.state.results.length === 0) {
      noData = <p>No data found</p>;
    }

    let filteredResults = this.state.results;

    let display = "";

    if (this.props.item_type === "location") {
      display = ( 
        <div>
        {noData}
        {filteredResults.map((stored_item, i) => (
          <Stored
            key={i + stored_item}
            stored_item={stored_item} />
        ))}
      </div>
      )
    } else if (this.props.item_type === "part"){
      display = (
        <div>
        {noData}
        {filteredResults.map((stored_item, i) => (
          <Parts
            key={i + stored_item}
            stored_item={stored_item} />
        ))}
      </div>

      )
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default StoredManager;
