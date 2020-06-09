import React, { Fragment } from "react";
import Moment from "react-moment";

import { Nav, NavLink, NavItem, Button } from "reactstrap";

class FooterMegaMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {};

	render() {
		return (
			<Fragment>
				<Nav className="header-megamenu">
					<NavItem>
						<NavLink href="#">
							<Moment titleFormat="D MMM YYYY" withTitle />
							<div className="float-left">
								<Button size="sm" color="link">
									Contact Support
								</Button>
							</div>
						</NavLink>
					</NavItem>
				</Nav>
			</Fragment>
		);
	}
}

export default FooterMegaMenu;
