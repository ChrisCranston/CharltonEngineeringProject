import React from "react";

import MapPlaceholder from ".//img/map.jpg"
import TwitterPlaceholder from ".//img/twitter.png"
import { TwitterTimelineEmbed } from 'react-twitter-embed';
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
        <div className="main">
          <div className="welcome_banner">
            {/* <img src={warehouseIMG} className="bannerimg" alt="warehouseIMG img" /> */}
            <div className="text-on-img">
                <h3> Welcome!</h3>
                <p> Charlton Engineering is a...
                Etiam vel vulputate elit, at sollicitudin nisl. Donec ac tincidunt urna, ut sagittis lorem. 
                Phasellus ultricies eget purus placerat posuere. </p>
            </div>
          </div>
          <div id="about_the_company">
            <aside id="what_we_do">
              <h3>What we do</h3>
              <p>Charlton Engineering is a family business, founded in 1984 and based in the North East.
                     We work hard to...
              n ut neque sed felis malesuada tristique ac eleifend leo. Vestibulum non dictum erat. Donec consectetur dignissim ipsum ut luctus. Maecenas facilisis velit orci, ut placerat nisi mattis tempor. Sed a est porttitor, porttitor erat ac, elementum magna. Morbi in justo neque. Nullam sit amet nibh ac nibh luctus volutpat. </p>
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
              
                <div className="TwitterAPI">
                  <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="isostandards"
                      options={{height: 450}}
                  />
                </div>
                <div className="GoogleMaps">
                  <MapContainer />
                  
                </div>
            </div>
           
          </div>
        </div>
     </div>
    );
  }
  
}


export default HomePage;
