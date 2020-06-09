import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MetisMenu from "react-metismenu";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import { MainNav } from "./NavItems";
import cx from "classnames";
import {
	TabStrip,
	TabStripTab,
	PanelBar,
	PanelBarItem,
	PanelBarUtils,
	Menu,
	MenuItem,
	MenuItemModel,
	MenuItemLink,
	MenuItemArrow,
	Splitter,
	Drawer,
	DrawerNavigation,
	DrawerContent,
	Card,
	CardHeader,
	CardTitle,
	CardBody,
	CardActions,
	CardImage,
	Avatar,
} from "@progress/kendo-react-layout";
import "@progress/kendo-react-intl";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-inputs";
import "react-router-dom";
import "./style.css";
import "@progress/kendo-theme-material/dist/all.css";
import * as actions from "../../actions/level";

const paths = [{ path: "/okr/1" }];

class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSearch: false,
			data: [],
		};
	}

	toggleMobileSidebar = () => {
		let { enableMobileMenu, setEnableMobileMenu } = this.props;
		setEnableMobileMenu(!enableMobileMenu);
	};

	show = () => {
		console.log("nav", this.props.location.pathname);
	};

	imageUrl(imageName) {
		let baseImageUrl =
			"https://demos.telerik.com/kendo-ui/content/web/panelbar/";
		return baseImageUrl + imageName + ".jpg";
	}

	componentDidMount = () => {
		this.props.fetchAllLevel();
		this.fetchRoot()
			.then((result) => {
				this.setState({ data: result });
			})
			.then(() => {
				return this.fetchChildren();
			})
			.then((result) => {
				this.setState({ data: result });
			});
	};

	// Simulate root items fetch
	fetchRoot = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let data = this.props.levelList.map((item) => {
					return {
						...item,
						children: undefined,
						content: (
							<div className="custom-loading-template">
								<h4>LOADING</h4>
								<span className="k-icon k-i-loading"></span>
							</div>
						),
					};
				});
				resolve(data);
			}, 1000);
		});
	};

	// Simulate child items fetch
	fetchChildren = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.props.levelList);
			}, 5000);
		});
	};

	onSelect = (event) => {
		this.props.history.push(event.target.props.route);
		localStorage.setItem("niveauid", event.target.props.id);
		localStorage.setItem("niveau", this.props.location.pathname);
	};

	setSelectedIndex = (pathName) => {
		let currentPath = paths.find((item) => item.path === pathName);
	};

	render() {
		const components = PanelBarUtils.mapItemsToComponents(this.state.data);
		let selected = this.setSelectedIndex(this.props.location.pathname);
		return (
			<Fragment>
				<br></br>
				<div
					className={cx("search-wrapper", {
						active: this.state.activeSearch,
					})}
				>
					<div className="input-holder">
						<input
							type="text"
							className="search-input"
							placeholder="Type to search"
						/>
						<button
							onClick={() =>
								this.setState({ activeSearch: !this.state.activeSearch })
							}
							className="search-icon"
						>
							<span />
						</button>
					</div>
					<button
						onClick={() =>
							this.setState({ activeSearch: !this.state.activeSearch })
						}
						className="close"
					/>
				</div>

				<br></br>
				<MetisMenu
					content={MainNav}
					onSelected={this.toggleMobileSidebar}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
				<PanelBar
					children={components}
					selected={selected}
					expandMode={"single"}
					onSelect={this.onSelect}
				/>
				<br></br>
				<div className="panelbar-wrapper">
					<PanelBar
						selected={selected}
						expandMode={"single"}
						onSelect={this.onSelect}
					>
						<PanelBarItem
							id={5}
							expanded={true}
							title="My Teammates"
							route="/okr/1"
						>
							<div>
								<div className="teamMate">
									<img src={this.imageUrl("andrew")} alt="Andrew Fuller" />
									<span className="mate-info">
										<h2>Andrew Fuller</h2>
										<p>Team Lead</p>
									</span>
								</div>
								<div className="teamMate">
									<img src={this.imageUrl("nancy")} alt="Nancy Leverling" />
									<span className="mate-info">
										<h2>Nancy Leverling</h2>
										<p>Sales Associate</p>
									</span>
								</div>
								<div className="teamMate">
									<img src={this.imageUrl("robert")} alt="Robert King" />
									<span className="mate-info">
										<h2>Robert King</h2>
										<p>Business System Analyst</p>
									</span>
								</div>
							</div>
						</PanelBarItem>
					</PanelBar>
				</div>
			</Fragment>
		);
	}

	isPathActive(path) {
		return this.props.location.pathname.startsWith(path);
	}
}
const mapStateToProps = (state) => ({
	enableMobileMenu: state.ThemeOptions.enableMobileMenu,
	levelList: state.level.listL,
});

const mapDispatchToProps = (dispatch) => ({
	setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
	fetchAllLevel: actions.fetchL,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
