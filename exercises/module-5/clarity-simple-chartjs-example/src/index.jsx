import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx'
import './index.css'

class WebComponent extends HTMLElement {

	connectedCallback() {
		this.root = createRoot(this);

		this.root.render(
			<StrictMode>
				<App
				    title={this.getAttribute("title")}
      				datasetLabel={this.getAttribute("dataset-label")}
      				aggregationField={this.getAttribute("aggregation-field")}
      				aggregationType={this.getAttribute("aggregation-type")}
					restContextPath={this.getAttribute("rest-context-path")} 
					color={this.getAttribute("color")}
				/>
			</StrictMode>
		);
	}

	disconnectedCallback() {
		this.root.unmount();

		delete this.root;
	}
}

const ELEMENT_ID = 'liferay-chartjs';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
