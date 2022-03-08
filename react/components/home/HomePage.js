import React from "react";

import warehouseIMG from ".//img/warehouse1.jpg";
import warehouse2IMG from ".//img/warehouse2.jpg";
import MapPlaceholder from ".//img/map.jpg"
import TwitterPlaceholder from ".//img/twitter.png"
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

class HomePage extends React.Component {
 constructor(props) {
   super(props);
   this.serviceElement = React.createRef();
 }

 
  render() {
    return (
      <div className="background">
        <div className="main_content">
          <div id="welcome_banner">
            <img src={warehouseIMG} className="bannerimg" alt="warehouseIMG img" />
            <div className="text-on-img">
                <h3> Welcome!</h3>
                <p> Charlton Engineering is a... </p>
            </div>
          </div>
          <div id="about_the_company">
            <aside id="what_we_do">
              <h3>What we do</h3>
              <p>Charlton Engineering specializes in... </p>
            </aside>
            <div className="services_content">
              <Service ref={this.serviceElement} img='Pipe Bending' text='We offer a pipe bending service to...'/> 
              <Service ref={this.serviceElement} img='Decanting' text='We offer a pipe bending service to...'/> 
              <Service ref={this.serviceElement} img='Kit Assembly' text='We offer a pipe bending service to...'/> 
              <Service ref={this.serviceElement} img='Packaging' text='We offer a pipe bending service to...'/> 
              <Service ref={this.serviceElement} img='Active Carbon Supplier' text='We offer a pipe bending service to...'/> 
              <Service ref={this.serviceElement} img='Stock Control' text='We offer a pipe bending service to...'/> 
            </div>
            <div className="infoBanner">
              <img src={warehouse2IMG} className="bannerimg" alt="warehouseIMG2 img" />
              <div className="moreaboutCE">
              
                <div className="infoBox FamilyBusiness">
                  <p>Charlton Engineering is a family business, founded in 1984 and based in the North East.
                  We work hard to...</p>
                </div>
                <div className="infoBox TwitterAPI">
                <img src={TwitterPlaceholder} className="twitterimg" alt="twitter img" />
                </div>
                <div className="infoBox GoogleMaps">
                  <img src={MapPlaceholder} className="mapimg" alt="map img" />
                </div>
              </div>
              <div className="CEstandards">
              
              <div className="standards">
                <p>At CE we pride ourselves in delivering quality services to our clients and as such we work to ISO 9001 standards.
                We have iniatives in place that allow us to comply with...</p>
                <p>.....</p>
                <p>.....</p>
              </div>
              </div>
            </div>
          </div>
        </div>
     </div>
    );
  }
  
}


export default HomePage;
