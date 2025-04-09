import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { CartProvider } from './contexts/CartContext'

function App() {


  return (
    <>
      <CartProvider>
          <RouterProvider router={router} />
      </CartProvider>
    </>
  )
}

export default App
