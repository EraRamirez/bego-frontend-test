import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrdersPage from './pages/OrdersPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto min-h-screen w-full max-w-[390px] bg-black">
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/orders/:orderNumber" element={<OrderDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
