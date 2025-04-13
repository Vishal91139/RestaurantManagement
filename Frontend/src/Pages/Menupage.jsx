import React, { useEffect, useState } from 'react';
import './Menupage.css';
import MenuItem from '../Components/Menu/MenuItem';
import axios from 'axios';

const Menupage = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await axios.get('http://localhost:5000/menu');
        console.log('response: ', items.data);
        setMenuData(items.data); 
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <h1 className="menu-title flex justify-center text-3xl">Menu</h1>
      <h1 className="flex justify-center text-4xl font-bold">Discover Our Flavorful Symphony!</h1>
      {menuData.length ? (
        Object.entries(
          menuData.reduce((acc, cur) => {
            const category = cur.category || 'Uncategorized';
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(cur);
            return acc;
          }, {})
        ).map(([category, items], index) => (
          <div key={index} className="mt-10 mb-10">
            <h2 className="text-2xl px-40 py-4">{category}</h2>
            <div className="menu-container flex justify-center items-center gap-40">
              {items.map((item, idx) => (
                <MenuItem key={idx} items={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <h2>No Menu Available</h2>
      )}
    </>
  );
};

export default Menupage;