import React, { use } from 'react'
import closeIcon from '../assets/Icons/close.png'
import { useCart } from '../Context/CartContext';
import { useOrder } from '../Context/OrderContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const { addOrder } = useOrder();

    const handleAddToOrder = (order) => {
        addOrder(order);
    }

  return (
    <>
    <div className='flex items-center flex-col'>
        <h1 className='menu-title flex justify-center text-3xl'>Cart</h1>
        <h1 className='flex justify-center text-4xl font-bold mb-5'>Your Journey to Flavor Begins Here!</h1>
    </div>
    <div className='flex h-[100vh]'>
        <div className='w-[55%] py-10'>
            {cartItems.length ? cartItems.map((item,index) => {
                return(
                    <div className='flex gap-8 items-center border-2 border-gray-200 mt-6 p-5 w-145 rounded-2xl hover:shadow-md ml-auto'>
                        <div>
                            <img src={item.image} className='w-50 rounded-full' alt="" />
                        </div>
                        <div className='w-full h-[10vh] flex flex-col justify-evenly'>
                            <p className='text-sm font-semibold'>{item.name}</p>
                            <span 
                                onClick={() => removeFromCart(item)}
                                className='cursor-pointer w-12 underline text-xs font-bold hover:bg-gray-200'>Remove
                            </span> 
                        </div>
                        <div className='flex gap-4 items-center justify-between'>
                            <button
                            onClick={() => handleAddToOrder(item)}
                            className='view-button text-purple-600 p-1.5 rounded-full hover:bg-gray-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">  
                                    <rect x="4" y="11" width="16" height="2" fill="black" />  
                                </svg> 
                            </button>
                            <p>1</p>
                            <button
                            onClick={() => handleAddToOrder(item)}
                            className='view-button text-purple-600 p-1.5 rounded-full hover:bg-gray-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                                </svg>
                            </button>
                            <p className='text-sm'>${item.price}</p>
                        </div>    
                    </div>
                )
            }): (
                <>
                    <h2 className='text-2xl mt-10 text-end'>No Items in Cart</h2>
                    <Link to='/menu' className='text-lg mt-2 text-end underline hover:cursor-pointer block px-9'>Go to Menu</Link>
                </>
                )
            }
        </div>
        <div className='w-[45%]'></div>
    </div>
    </>
  )
}

export default CartPage