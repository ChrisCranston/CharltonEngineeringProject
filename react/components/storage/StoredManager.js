import React from "react";
import Stored from "./Stored";

/**
 * StoredManager
 *
 * This component manages what is being shown by the Stored component via passing props, it also
 * manages pages which are on display and the search functionality display in the ViewingList and Paper components.
 * It calls the Stored component and is also responsible for retrieving data from the stored API.
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
      "http://unn-w18018468.newnumyspace.co.uk/kv6002/php/stored";
    this.fetchData(url);
  }

  componentDidUpdate(prevProps) {
  }

  fetchData = (url) => {
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

    return (
      <div>
        {noData}
        {filteredResults.map((stored_item, i) => (
          <Stored
            key={i + stored_item.stored_id}
            stored_item={stored_item} />
        ))}
      </div>
    );
  }
}

export default StoredManager;
