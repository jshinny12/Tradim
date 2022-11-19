import React from 'react'
import {useState} from 'react'
import {Nav} from "react-bootstrap";

const Customer = () => {
    const[cards, setCards] = useState([]);

    const contentStyle = {
        height: '750px',
        color: '#fff',
        textAlign: 'center',
        background: '#181818',
      };

      const paragraphStyle = {
        position: 'relative',
        width: '100%',
        top: '50%',
        left: '50%',
        margin: '0px 0px 0px 0px',
        transform: 'translate(-50%, -50%)',
      }


    return (
      <>
          <div style = {contentStyle}>
              <h1 style = {paragraphStyle}>My Discounts</h1>
          </div>
          <div>
             <Nav.Link href="/discounts" style = {{color: 'black'}} onClick = {console.log("navigate to discounts")}>Browse Discounts</Nav.Link>
          </div>
      </>
    )
}

export default Customer
