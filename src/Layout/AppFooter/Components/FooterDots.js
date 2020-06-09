import React, { Fragment } from "react";
import { Popover, Nav, NavItem, NavLink } from "reactstrap";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import { IoIosMail, IoIosCall, IoIosPin } from "react-icons/io";

class FooterDots extends React.Component {
	constructor(props) {
		super(props);
		this.toggle1 = this.toggle1.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.state = {
			popoverOpen1: false,
			popoverOpen2: false,
		};
	}

	toggle1(event) {
		event.preventDefault();
		this.setState({
			popoverOpen1: !this.state.popoverOpen1,
		});
	}

	toggle2(event) {
		event.preventDefault();
		this.setState({
			popoverOpen2: !this.state.popoverOpen2,
		});
	}

	render() {
		const settings = {
			className: "",
			centerMode: false,
			infinite: true,
			slidesToShow: 1,
			speed: 500,
			dots: true,
			arrows: false,
		};
		return (
			<Fragment>
				<div className="footer-dots">
					<a
						href="https://colorlib.com/"
						onClick={this.toggle1}
						className="dot-btn-wrapper"
						id="PopoverFooter-1"
					>
						<i className="dot-btn-icon lnr-apartment icon-gradient bg-happy-itmeo" />
					</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div className="dots-separator" />
					<h6>OKR Version 1.0</h6>
					<div className="dots-separator" />
					<Popover
						className="popover-custom popover-custom-xl"
						container=".app-container"
						hideArrow
						fade={false}
						trigger="legacy"
						placement="top-start"
						isOpen={this.state.popoverOpen1}
						target="PopoverFooter-1"
						toggle={this.toggle1}
					>
						<div className="dropdown-menu-header">
							<div className="dropdown-menu-header-inner pt-4 pb-4 bg-malibu-beach">
								<div
									className="menu-header-image opacity-1"
									style={{
										backgroundImage: "url(" + city3 + ")",
									}}
								/>
								<div className="menu-header-content text-center text-white">
									<h3 className="menu-header-subtitle mt-0">Contact</h3>
								</div>
							</div>
						</div>

						<div className="dropdown-menu-rounded">
							<Nav vertical>
								<NavItem>
									<NavLink href="#">
										<IoIosMail
											fontSize="25px"
											className=" mr-3 opacity-8 dot-btn-icon icon-gradient bg-happy-itmeo"
											color="#347eff"
										/>
										E-mail : info@groupe-telnet.net
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#">
										<IoIosPin
											fontSize="55px"
											className=" mr-3 opacity-8 dot-btn-icon icon-gradient bg-happy-itmeo"
											color="#347eff"
										/>
										Address : TELNET TECHNOCENTRE, Rue du Lac Léman 1053 Les
										berges du Lac - Tunis - Tunisie
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#">
										<IoIosCall
											fontSize="25px"
											className=" mr-3 opacity-8 dot-btn-icon icon-gradient bg-happy-itmeo"
											color="#347eff"
										/>
										Téléphone : +216 71 860 233
									</NavLink>
								</NavItem>
							</Nav>
						</div>
					</Popover>
				</div>
			</Fragment>
		);
	}
}
export default FooterDots;
