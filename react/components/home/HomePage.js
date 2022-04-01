import React from "react";

import MapPlaceholder from ".//img/map.jpg";
import TwitterPlaceholder from ".//img/twitter.png";
import Service from ".//ServiceClass";
import MapContainer from ".//GoogleAPI";
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
              <p>
                {" "}
                Charlton Engineering is a... Etiam vel vulputate elit, at
                sollicitudin nisl. Donec ac tincidunt urna, ut sagittis lorem.
                Phasellus ultricies eget purus placerat posuere.{" "}
              </p>
            </div>
          </div>
          <div id="about_the_company">
            <aside id="what_we_do">
              <h3>What we do</h3>
              <p>
                Charlton Engineering specializes in... n ut neque sed felis
                malesuada tristique ac eleifend leo. Vestibulum non dictum erat.
                Donec consectetur dignissim ipsum ut luctus. Maecenas facilisis
                velit orci, ut placerat nisi mattis tempor. Sed a est porttitor,
                porttitor erat ac, elementum magna. Morbi in justo neque. Nullam
                sit amet nibh ac nibh luctus volutpat.{" "}
              </p>
            </aside>
            <div className="services_content">
              <Service
                img="Pipe Bending"
                text="We offer a pipe bending service to client companies and..."
              />
              <Service
                img="Decanting"
                text="We are able to decant your product into..."
              />
              <Service
                img="Kit Assembly"
                text="We offer a service to assemble kit..."
              />
              <Service
                img="Packaging"
                text="Items can be packaged and forwarded..."
              />
              <Service
                img="Active Carbon Supplier"
                text="We are able to source and sell activated carbon..."
              />
              <Service
                img="Stock Control"
                text="Our elite methods and client conenctions allow us to..."
              />
            </div>
            <div className="infoBanner">
              {/* <img src={warehouse2IMG} className="bannerimg" alt="warehouseIMG2 img" /> */}
              <div className="moreaboutCE">
                <div className="information">
                  <div className="infoBox FamilyBusiness">
                    <p>
                      Charlton Engineering is a family business, founded in 1984
                      and based in the North East. We work hard to... Nam
                      scelerisque ipsum et auctor scelerisque. Fusce gravida
                      laoreet augue, vitae lacinia tortor. Donec eget risus a
                      odio semper pulvinar rutrum quis velit.
                    </p>
                  </div>
                  <div className="infoBox TwitterAPI">
                    <img
                      src={TwitterPlaceholder}
                      className="twitterimg"
                      alt="twitter img"
                    />
                  </div>
                  <div className="infoBox GoogleMaps">
                    <MapContainer />
                    <div id="addressbox">
                      <a
                        href="https://www.google.co.uk/maps/place/Charlton+Engineering+Services/@54.9014034,-1.5548096,17z/data=!3m1!4b1!4m5!3m4!1s0x487e7b047ec02325:0x7f8627ed98c4dd63!8m2!3d54.9014034!4d-1.5526209?hl=en-GB"
                        target="_blank"
                      >
                        Unit 9 Crowther Industrial Estate, NE38 0AB
                      </a>
                    </div>
                  </div>
                </div>
                <div className="CEstandards">
                  <div className="standards">
                    <p>
                      At CE we pride ourselves in delivering quality services to
                      our clients and as such we work to ISO 9001 standards. We
                      have iniatives in place that allow us to comply with...
                    </p>
                    <p>
                      Vivamus eu suscipit justo. Aliquam sed feugiat mi.
                      Phasellus vulputate a nulla id tincidunt. Ut ut convallis
                      turpis. Phasellus placerat libero nec tellus lacinia
                      feugiat. Pellentesque pretium sagittis lorem, sed
                      vestibulum quam facilisis id. Duis condimentum, velit
                      lacinia volutpat pretium, sem eros gravida lectus, vel
                      porta nibh tellus sed libero. Sed gravida nec velit ut
                      ullamcorper.{" "}
                    </p>
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
