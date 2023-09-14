import React from 'react'
import ReactDOM from 'react-dom/client'
import Hero from './Hero.jsx'
import Contact from './Contact.jsx'

ReactDOM.createRoot(document.getElementById('hero-canvas')).render(<Hero />)
ReactDOM.createRoot(document.getElementById('contact-canvas')).render(<Contact />)
