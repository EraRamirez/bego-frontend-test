import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrdersPage from './pages/OrdersPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell-wrapper">
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<OrdersPage />} />
            <Route path="/orders/:orderNumber" element={<OrderDetailsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
