import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Dashboard from './pages/Dashboard'
import { ProductRating } from './components/ProductRating'
import './index.css'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Start />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="review" element={<ProductRating />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = createRoot(rootElement)
    root.render(<App />)
}
