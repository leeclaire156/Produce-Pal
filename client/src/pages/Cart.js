// import React, { useState } from 'react';


// function App() {
//     // place holders for now until handleAddToCart gets hooked up
//     const [items, setItems] = useState([
//         { id: 1, name: 'Item 1', price: 10 },
//         { id: 2, name: 'Item 2', price: 20 },
//         { id: 3, name: 'Item 3', price: 30 },
//     ]);

//     const total = items.reduce((acc, item) => acc + item.price, 0);
//     const handleDelete = (itemId) => {
//         const newItems = items.filter((item) => item.id !== itemId);
//         setItems(newItems);
//     };

//     const handleAddToCart = (itemId) => {
//         // Logic for adding item to cart (this is just template for now)

//         const itemToAdd = items.find(item => item.id === itemId);
//         setItems([...items, itemToAdd]);
//         alert('Added item to cart!');
//     }

//     const handleCheckout = () => {
//         // Logic for checkout (needs to be built out with stripe)
//         alert('Checkout successful!');
//       };




//     return (
//         <div style={{ textAlign: "center" }}>
//             <h1>My Cart</h1>

            
//             <ul>
//                 {items.map((item) => (
//                     <li key={item.id}>
//                         {item.name} - ${item.price}
//                         <button onClick={() => handleDelete(item.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>

//             <h2>Total: ${total}</h2>
//             <button onClick={handleCheckout}>Checkout</button>
//             <button onClick={() => handleAddToCart(4)}>Add to Cart</button> {/* Example for adding a new item */}

//         </div>
//     );
// }

// export default App;
