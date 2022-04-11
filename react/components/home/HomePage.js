import React from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Service from ".//ServiceClass"
import  MapContainer  from ".//GoogleAPI"
/**
 * HomePage
 *
 * This page is the base of the website. Used as the main selling point of the company to incoming clients
 * It works as a home for the employees also hoping to access the back end of the website.
 * 
 * The images acting as information boxes for the services they provide are imported as components
 * The map is generated from a google maps API components
 * the Twitter timeline is embedded using a react twitter embed import
 * twitter code sourced from npmjs: https://www.npmjs.com/package/react-twitter-embed (2022 Jan)
 * version 4.0.4
 * accessed 2022 March
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
            <div className="text-on-img">
                <h3> Welcome!</h3>
                <p> Charlton Engineering is a family business, founded in 1984 and based in the North East. At CE we aim to save you time and money in all aspects of assembly and manufacturing. </p>
            </div>
          </div>
          <div id="about_the_company">
            <aside id="what_we_do">
              <h3>What we do</h3>
              <p> At Charlton Engineering we look after our customers and provide an array of services to make work for you cost and time effective.
                     We work hard to provide solutions to all manufacturing and assembly needs whilst maintaining good recycling habits and clear, helpful routes of communication and customer service for out clients.</p>
            </aside>
            <div className="services_content">
              <Service 
              img='Pipe Bending' text='We offer a pipe bending service to client companies covering all aspects of instrumentation pipe bending.'
              /> 
              <Service 
              img='Decanting' text='We will buy large quantities of your product and are able to decant your product into smaller, more managable sizes for resale.'
              /> 
              <Service  
              img='Kit Assembly' text='We offer a service to build all aspects of assembly and sub assembly parts, svaing you and your employees time and energy.'
              /> 
              <Service 
              img='Packaging' text='Items can be packaged and forwarded directly to your customers from our depot.'
              /> 
              <Service 
              img='Active Carbon Supplier' text='We are able to supply and store various grades of activated carbon for filtration purposes.'
              /> 
              <Service 
              img='Stock Control' text='Our elite methods and client conenctions allow us to store and control your stock on our site whilst maintaining stock quality. Stock reports can be sent to you on request.'
              /> 
            </div>
            <div className="infoBanner">
              
                <div className="TwitterAPI">
                  <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="isostandards"
                      options={{height: '100%'}}
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
