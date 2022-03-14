import React from "react";

import MapPlaceholder from ".//img/map.jpg"
import TwitterPlaceholder from ".//img/twitter.png"
import Service from ".//ServiceClass"
import  MapContainer  from ".//GoogleAPI"
/**
 * HomePage
 *
 *
 * @author Kess Strongman
 */
class HomePage extends React.Component {
 
  render() {
    
    
    return (
      <div className="background">
        <div className="main_content">
          <div className="welcome_banner">
            {/* <img src={warehouseIMG} className="bannerimg" alt="warehouseIMG img" /> */}
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
              <Service img='Pipe Bending' text='We offer a pipe bending service to client companies and...'/> 
              <Service img='Decanting' text='We are able to decant your product into...'/> 
              <Service img='Kit Assembly' text='We offer a service to assemble kit...'/> 
              <Service img='Packaging' text='Items can be packaged and forwarded...'/> 
              <Service img='Active Carbon Supplier' text='We are able to source and sell activated carbon...'/> 
              <Service img='Stock Control' text='Our elite methods and client conenctions allow us to...'/> 
            </div>
            <div className="infoBanner">
              {/* <img src={warehouse2IMG} className="bannerimg" alt="warehouseIMG2 img" /> */}
              <div className="moreaboutCE">
                <div className="information">
                  <div className="infoBox FamilyBusiness">
                     <p>Charlton Engineering is a family business, founded in 1984 and based in the North East.
                     We work hard to...</p>
                  </div>
                  <div className="infoBox TwitterAPI">
                    <img src={TwitterPlaceholder} className="twitterimg" alt="twitter img" />
                  </div>
                  <div className="infoBox GoogleMaps">
                    <MapContainer />
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
     </div>
    );
  }
  
}


export default HomePage;
