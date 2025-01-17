import React from 'react'
import Coldesign from './Coldesign'
import resta from '../Assets/icons/restaurant.png'
import bike from '../Assets/icons/delivery.png'
import bottle from '../Assets/icons/bottle.png'
import wifi from '../Assets/icons/wifi.png'
export default function Services() {
    const service = [
        {name:'Professional' , img:resta , des:'' },
        {name:'Free Delivery' , img:bike , des:'' },
        // {name:'Bottles' , img:bottle , des:'Lorem ipsum, dolor sit amet adipisicing.' },
        {name:'Free Wifi' , img:wifi , des:'' }
    ]
  return (
    <div className='flex-wrap sm:flex-nowrap flex items-center justify-around ' style={{display: "flex", justifyContent: "space-around", paddingLeft: "40px"}}>
        {service.map((item)=>{
            return(
                <Coldesign key={item.name} name={item.name} icon={item.img} des={item.des} />
            )
        })
        }
    </div>
  )
}
