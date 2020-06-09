import React, { Fragment } from "react";

// import Ionicon from 'react-ionicons';
import { IoIosNotificationsOutline } from "react-icons/io";

import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	Nav,
	Button,
	NavItem,
	DropdownItem,
} from "reactstrap";

import city2 from "../../../assets/utils/images/dropdown-header/city2.jpg";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";

import Flag from "react-flagkit";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";

import PerfectScrollbar from "react-perfect-scrollbar";

class HeaderDots extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	render() {
		return (
			<Fragment>
				<div className="header-dots">
					<UncontrolledDropdown>
						<DropdownToggle className="p-0 mr-2" color="link">
							<div className="icon-wrapper icon-wrapper-alt rounded-circle">
								<div className="icon-wrapper-bg bg-happy-itmeo" />
								<div className="language-icon">
									<Flag className="mr-3 opacity-8" country="FR" size="40" />
								</div>
							</div>
						</DropdownToggle>
						<DropdownMenu right className="rm-pointers">
							<div className="dropdown-menu-header">
								<div className="dropdown-menu-header-inner pt-4 pb-4 bg-malibu-beach">
									<div
										className="menu-header-image opacity-05"
										style={{
											backgroundImage: "url(" + city2 + ")",
										}}
									/>
									<div className="menu-header-content text-center text-white">
										<h4 className="menu-header-subtitle mt-0">
											Choose Language
										</h4>
									</div>
								</div>
							</div>
							<DropdownItem header>Popular Languages</DropdownItem>
							<DropdownItem>
								<Flag className="mr-3 opacity-8" country="US" />
								USA
							</DropdownItem>
							<DropdownItem>
								<Flag className="mr-3 opacity-8" country="CH" />
								Switzerland
							</DropdownItem>
							<DropdownItem active>
								<Flag className="mr-3 opacity-8" country="FR" />
								France
							</DropdownItem>
							<DropdownItem>
								<Flag className="mr-3 opacity-8" country="ES" />
								Spain
							</DropdownItem>
							<DropdownItem>
								<Flag className="mr-3 opacity-8" country="DE" />
								Germany
							</DropdownItem>
							<DropdownItem>
								<Flag className="mr-3 opacity-8" country="IT" />
								Italy
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>

					<UncontrolledDropdown>
						<DropdownToggle className="p-0 mr-2" color="link">
							<div className="icon-wrapper icon-wrapper-alt rounded-circle">
								<div className="icon-wrapper-bg bg-happy-itmeo" />
								<IoIosNotificationsOutline color="#d92550" fontSize="23px" />
								<div className="badge badge-dot badge-dot-sm badge-focus">
									Notifications
								</div>
							</div>
						</DropdownToggle>
						<DropdownMenu right className="dropdown-menu-xl rm-pointers">
							<div className="dropdown-menu-header mb-0">
								<div className="dropdown-menu-header-inner bg-malibu-beach">
									<div
										className="menu-header-image opacity-1"
										style={{
											backgroundImage: "url(" + city3 + ")",
										}}
									/>
									<div className="menu-header-content text-dark">
										<h5 className="menu-header-title">Notifications</h5>
									</div>
								</div>
							</div>
							<div className="scroll-area-sm">
								<PerfectScrollbar>
									<div className="p-3">
										<VerticalTimeline
											layout="1-column"
											className="vertical-without-time"
										>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-success">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title">All Hands Meeting</h4>
												<p>
													Lorem ipsum dolor sic amet, today at{" "}
													<a
														href="https://colorlib.com/"
														onClick={(e) => e.preventDefault()}
													>
														12:00 PM
													</a>
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-warning">
														{" "}
													</i>
												}
											>
												<p>
													Another meeting today, at{" "}
													<b className="text-danger">12:00 PM</b>
												</p>
												<p>
													Yet another one, at{" "}
													<span className="text-success">15:00 PM</span>
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-danger">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title">
													Build the production release
												</h4>
												<p>
													Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
													incididunt ut labore et dolore magna elit enim at
													minim veniam quis nostrud
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-primary">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title text-success">
													Something not important
												</h4>
												<p>
													Lorem ipsum dolor sit amit,consectetur elit enim at
													minim veniam quis nostrud
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-success">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title">All Hands Meeting</h4>
												<p>
													Lorem ipsum dolor sic amet, today at{" "}
													<a
														href="https://colorlib.com/"
														onClick={(e) => e.preventDefault()}
													>
														12:00 PM
													</a>
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-warning">
														{" "}
													</i>
												}
											>
												<p>
													Another meeting today, at{" "}
													<b className="text-danger">12:00 PM</b>
												</p>
												<p>
													Yet another one, at{" "}
													<span className="text-success">15:00 PM</span>
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-danger">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title">
													Build the production release
												</h4>
												<p>
													Lorem ipsum dolor sit amit,consectetur eiusmdd tempor
													incididunt ut labore et dolore magna elit enim at
													minim veniam quis nostrud
												</p>
											</VerticalTimelineElement>
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-primary">
														{" "}
													</i>
												}
											>
												<h4 className="timeline-title text-success">
													Something not important
												</h4>
												<p>
													Lorem ipsum dolor sit amit,consectetur elit enim at
													minim veniam quis nostrud
												</p>
											</VerticalTimelineElement>
										</VerticalTimeline>
									</div>
								</PerfectScrollbar>
							</div>
							<Nav vertical>
								<NavItem className="nav-item-divider" />
								<NavItem className="nav-item-btn text-center">
									<Button
										size="sm"
										className="btn-shadow btn-wide btn-pill"
										color="focus"
									>
										View Latest Changes
									</Button>
								</NavItem>
							</Nav>
						</DropdownMenu>
					</UncontrolledDropdown>
				</div>
			</Fragment>
		);
	}
}
export default HeaderDots;
