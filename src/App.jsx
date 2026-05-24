import { useReducer } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Logica per aggiungere un prodotto
      const addedProduct = addedProducts.find(p => p.name === action.payload.name);
      if (addedProduct) {
        action.payload.quantity = addedProduct.quantity + 1;
        return addedProducts;
      } else {
        return [...addedProducts, {
          ...action.payload,
          quantity: 1
        }];
      }

    case 'UPDATE_QUANTITY':
      // Logica per aggiornare la quantità

      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map(p => p.name === action.payload.name ?
        { ...p, quantity: action.payload.quantity } : p);

    case 'REMOVE_ITEM':
      // Logica per rimuovere un prodotto
      return addedProducts.filter(p => p.name !== action.payload);
    default:
      return addedProducts;


  }
}



function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);
  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <p>{p.name} ({p.price.toFixed(2)}€)</p>
            <button onClick={() =>
              dispatchCart({ type: 'ADD_ITEM', payload: p })
            }>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (<>
        <h2>Carrello</h2>
        <ul>
          {addedProducts.map((p, i) =>
            <li key={i}>
              <p>
                <input type="number" value={p.quantity} onChange={
                  e => dispatchCart({
                    type: 'UPDATE_QUANTITY', payload: { name: p.name, quantity: parseInt(e.target.value, 10) }
                  })
                } />
                <span>{p.quantity} x {p.name} ({p.price.toFixed(2)}€)</span>
              </p>
              <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>Rimuovi dal carrello</button>
            </li>
          )}
        </ul>
        <h3>Totale da pagare: {totalToPay.toFixed(2)}€</h3>
      </>)}
    </>
  )
}

export default App
