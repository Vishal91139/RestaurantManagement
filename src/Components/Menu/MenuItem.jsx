import React, { useState } from 'react'
import './Menu.css'
import CartPage from '../../Pages/CartPage';

const MenuItem = ({items}) => {
  const [rating, setRating] = useState(4);

  return (
    <>
    <div className='menuItem'>
      <div className='flex justify-center'>
        <img className='w-38' src={items.image} alt={items.name} />
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
      <button
       onClick={() => {
        <CartPage item={items.name} />
        alert(`Added ${items.name} to cart!`)}}
       className='cart_button'>Add to cart</button>
    </div>
    </>
  )
}

export default MenuItem