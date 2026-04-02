import React, { useState } from 'react'
import './App.css'
import Map from "./components/Map.jsx";

function App({ items }) {

	return (
		<>
			<Map items={items} />
		</>
	)
}

export default App
