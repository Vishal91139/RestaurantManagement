import React, { useState } from 'react'
import './Menu.css'
import { useCart } from '../../Context/CartContext';
import axios from 'axios';

const MenuItem = ({items}) => {
  const [rating, setRating] = useState(4);
  const { addToCart , updateQuantity } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', items);
      console.log('Response:', response.data);
      addToCart(items);
      alert(`Added ${items.name} to cart!`);
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response) {
        alert(error.response.data?.message || "Failed to add to cart.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const imagePath = `/images/${items.image}`;

  return (
    <>
    <form className='menuItem'>
      <div className='flex justify-center'>
        <img className='w-38' src={imagePath} alt={items.name} />
      </div>
      <h3 className='font-semibold mt-2 text-lg'>{items.name}</h3>
      <div className="rating">
        <input 
          value="5" 
          name={`rate-${items.name}`} 
          id={`star5-${items.name}`} 
          type="radio"
          checked={rating === 5}
          onChange={() => setRating(5)}
        />
        <label htmlFor={`star5-${items.name}`}></label>
        <input 
          value="4" 
          name={`rate-${items.name}`} 
          id={`star4-${items.name}`} 
          type="radio"
          checked={rating === 4}
          onChange={() => setRating(4)}
        />
        <label htmlFor={`star4-${items.name}`}></label>
        <input 
          value="3" 
          name={`rate-${items.name}`} 
          id={`star3-${items.name}`} 
          type="radio"
          checked={rating === 3}
          onChange={() => setRating(3)}
        />
        <label htmlFor={`star3-${items.name}`}></label>
        <input 
          value="2" 
          name={`rate-${items.name}`} 
          id={`star2-${items.name}`} 
          type="radio"
          checked={rating === 2}
          onChange={() => setRating(2)}
        />
        <label htmlFor={`star2-${items.name}`}></label>
        <input 
          value="1" 
          name={`rate-${items.name}`} 
          id={`star1-${items.name}`} 
          type="radio"
          checked={rating === 1}
          onChange={() => setRating(1)}
        />
        <label htmlFor={`star1-${items.name}`}></label>
      </div>
      <p className='text-sm text-gray-500'>{items.description}</p>
      <p className='card-price absolute top-0 right-0 text-white font-bold p-3 text-sm'>${items.price}</p>
      <div className='flex items-center justify-between'>
        <button
          type='submit'
          onClick={handleAddToCart}
          className='cart_button'>Add to cart
        </button>
        <div className='flex bg-amber-400'>
          <span
              onClick={() => updateQuantity(items.name, -1)}
              className='view-button text-purple-600 p-1.5 rounded-full hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">  
                  <rect x="4" y="11" width="16" height="2" fill="black" />  
              </svg> 
          </span>
          <p className='text-black'>{items.quantity}</p>
          <span
              onClick={() => updateQuantity(items.name, 1)}
              className='view-button text-purple-600 p-1.5 rounded-full hover:bg-gray-200'
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/>
              </svg>
          </span>
        </div>
      </div>
    </form>
    </>
  )
}

export default MenuItem