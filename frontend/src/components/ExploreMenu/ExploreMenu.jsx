import React from 'react'
import './ExploreMenu.css'

import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='ExploreMenu' id='exploreMenu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring an array of delectable dishes. Our mission is to provide a memorable dining experience by offering exceptional culinary creations that celebrate global flavors and ingredients.</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return <div onClick={() => setCategory(prev => prev===item.menu_name?"All" : item.menu_name)} className="explore-menu-list-item" key={index}>
                    <img className={category === item.menu_name ? "active" : ""}  src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu