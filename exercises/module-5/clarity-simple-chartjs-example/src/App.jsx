import React, { useState } from 'react'
import './App.css'
import LiferayChart from "./components/LiferayChart.jsx";

function App({ title, datasetLabel, aggregationField, aggregationType, restContextPath, color }) {

	return (
		<>
			<LiferayChart
				title={title}
				datasetLabel={datasetLabel}
				aggregationField={aggregationField}
				aggregationType={aggregationType}
				restContextPath={restContextPath}
				color={color}
			/>
		</>
	)
}

export default App
