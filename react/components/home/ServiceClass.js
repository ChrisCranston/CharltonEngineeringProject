import React from "react";
/**
 * ServiceClass
 * 
 * Since there are several services offered by CE this is a repeated element making it easier to populate
 * the page with a component. They could also increase or decrease it at anytime
 * This takes the image and text and produces an informative box that has further text appear when the
 * customer hovers their mouse over the relevant box.
 *
 * @author Kess Strongman
 */
class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.handleDisplay = this.handleDisplay.bind(this)
  }
  // componentDidMount() {
  //   this.setState({ display: 'none'})
  // }
  handleDisplay = (e) =>  {
    // console.log(e.type)
     if (e.type === "mouseenter") {
       this.setState({ display: 'block'})
     } else if (e.type === "mouseleave") {
       this.setState({ display: 'none'})
     }
    
    }
  
    render() {
      
      return (
        <div className="serviceDIV" onMouseEnter={this.handleDisplay} onMouseLeave={this.handleDisplay} >
        {/*onsole.log(".//img/" +this.props.img +".jpg")*/}
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