import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx'
import "leaflet/dist/leaflet.css";

class WebComponent extends HTMLElement {

	connectedCallback() {

		this.root = createRoot(this);

		this.root.render(
			<StrictMode>
				<App promoStore={this.getAttribute('promoStore')}/>
			</StrictMode>
		);
	}

	disconnectedCallback() {
		this.root.unmount();

		delete this.root;
	}
}

const ELEMENT_ID = 'clarity-distributor-map-custom-element';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
