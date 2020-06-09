import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";
import ThemeOptions from "../../Layout/ThemeOptions/";
import ObjectivesTab from "./Objectives/ObjectivesTab";
const Okr = ({ match }) => (
	<Fragment>
		<ThemeOptions />
		<AppHeader />
		<div className="app-main">
			<AppSidebar />
			<div className="app-main__outer">
				<div className="app-main__inner">
					<Route
						path={(`${match.url}/`, localStorage.getItem("niveau"))}
						component={ObjectivesTab}
					/>
				</div>
				<div className="app-wrapper-footer">
					<AppFooter />
				</div>
			</div>
		</div>
	</Fragment>
);
export default Okr;
