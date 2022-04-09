import React from 'react';
import { NavLink } from "react-router-dom";
import ISOlogo from ".//iso-logo.gif"

/**
 * Footer Component
 *
 *
 * 
 * @author Kess Strongman
 */
class Footer extends React.Component {
 
    render () {
     
        return (
        <><div className="addressbox">
                <a href="https://www.google.co.uk/maps/place/Charlton+Engineering+Services/@54.9014034,-1.5548096,17z/data=!3m1!4b1!4m5!3m4!1s0x487e7b047ec02325:0x7f8627ed98c4dd63!8m2!3d54.9014034!4d-1.5526209?hl=en-GB" target="_blank" rel="noreferrer">
                    <p> Charlton Engineering Services Limited</p></a>
                <p> Unit 9, Harvey Close</p>
                <p> Crowther Industrial Estate</p>
                <p> Washington</p>
                <p> Tyne & Wear</p>
                <p> NE38 0AB</p>
                <br></br>
                <p>Tel: 0191 4163099</p>
                <p>Email: info@charltoneng.co.uk</p>
            </div><div className="usefullinks">
                    <h4>Useful links</h4>
                    <p><NavLink to="customerquery">Get In Touch</NavLink></p>
                    <p>
                        <a href="https://www.dnv.co.uk/services/iso-9001-quality-management-3283?gclid=CjwKCAiAvaGRBhBlEiwAiY-yMKf98yZBRrF9jrx68HRsOW-5XogtEH_yilMxir2V7v8pnGwt0Bn6FRoCho4QAvD_BwE" target="_blank" rel="noreferrer">ISO 9001 standards</a>
                    </p>
                    <p>Photos sourced from <a href="https://unsplash.com/" target="_blank" rel="noreferrer">unsplash.com</a> <br></br>(inspect image for specific credits)</p>

                </div><div>
                    <img src={ISOlogo} height="20%" width="20%" alt="ISO img" />
                </div></>
      
        )
    }
}

export default Footer;