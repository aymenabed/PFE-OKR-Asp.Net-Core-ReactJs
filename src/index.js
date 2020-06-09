import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<ToastProvider autoDismiss={true}>
				<HashRouter>
					<Component />
				</HashRouter>
			</ToastProvider>
		</Provider>,
		rootElement
	);
};

renderApp(Main);

if (module.hot) {
	module.hot.accept("./DemoPages/Main", () => {
		const NextApp = require("./DemoPages/Main").default;
		renderApp(NextApp);
	});
}
serviceWorker.unregister();
