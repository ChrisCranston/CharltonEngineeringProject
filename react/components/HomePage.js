import React from "react";

/**
 * HomePage
 *
 * This simple component controls what is being shown on the homepage,
 * via the use of props it makes the shows the most simplistic version of a random paper without filter
 * with the preview video shown without needing to click a button.
 * This component calls to PaperManager.
 *
 * @author Chris Cranston - W18018468
 */
class HomePage extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="main_content">
          <p>homepage</p>
        </div>
      </div>
    );
  }
}

export default HomePage;
