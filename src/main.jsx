import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProductLayout } from './Products/components/ProductLayout'
import 'bulma/css/bulma.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductLayout />
  </React.StrictMode>,
)
