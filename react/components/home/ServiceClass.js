import React from "react";

/**
 * HomePage
 *
 *
 * @author Kess Strongman
 */
class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
  }
 
    render() {
      
      return (
        <div className="serviceDIV" onMouseEnter={e => {
          this.setState({ display: 'block'})
        }}
        onMouseLeave={e => {
          this.setState({ display: 'none'})
        } }>
        {console.log(".//img/" +this.props.img +".jpg")}
          <img src={require(`.//img/${this.props.img}.jpg`)} className="serviceimg" alt=" serviceimg" />
          <div className="text-on-serviceimg">
         <h4 className="servicetitle">{ this.props.img }</h4>
            <p style={{ display: this.state.display }}>{this.props.text}</p>
          </div>
        </div>
         
        )
    }
}

export default Service