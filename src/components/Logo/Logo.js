 import React from 'react';
 import './Logo.css';
import icon from '../../assets/images/icon.jpg';
 const logo=(props)=>(
<div className="Logo" style={{height:props.height}}>
    <img src={icon} alt="MyBurger"/>
</div>
 );
 export default logo;