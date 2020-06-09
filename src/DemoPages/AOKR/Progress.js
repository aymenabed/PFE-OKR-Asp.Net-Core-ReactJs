import React, { Component } from "react";
import {
	Button,
	CardBody,
	CardHeader,
	Col,
	Collapse,
	Row,
	Progress,
} from "reactstrap";
import Card from "@material-ui/core/Card";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import "./CSS/Style.scss";
import Divider from "@material-ui/core/Divider";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/objectifs";
import {
	Chart,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartTitle,
	ChartLegend,
} from "@progress/kendo-react-charts";

const categories = [2002, 2003, 2004];
const series = [
	{
		name: "India",
		data: [3.907, 7.943, 7.848],
	},
	{
		name: "Russian Federation",
		data: [4.743, 7.295, 7.175],
	},
	{
		name: "Germany",
		data: [0.21, 0.375, 1.161],
	},
	{
		name: "World",
		data: [1.988, 2.733, 3.994],
	},
];

const areaData = [
	{
		name: "World",
		data: [3.988, 3.733, 3.994],
	},
	{
		name: "Germany",
		data: [2.21, 2.375, 2.161],
	},
	{
		name: "Russian Federation",
		data: [1.743, 1.295, 1.175],
	},
	{
		name: "India",
		data: [0.907, 0.943, 0.848],
	},
];

const pieData = [
	{
		name: "India",
		share: 0.24,
	},
	{
		name: "Russian Federation",
		share: 0.26,
		explode: true,
	},
	{
		name: "Germany",
		share: 0.1,
	},
	{
		name: "World",
		share: 0.4,
	},
];

const Progres = ({ classes, ...props }) => {
	const [accordion, setaccordion] = useState([true, false, false]);

	const toggleAccordion = (tab) => {
		const prevState = accordion;
		const state = prevState.map((x, index) => (tab === index ? !x : false));
		setaccordion(state);
	};

	useEffect(() => {
		props.fetchAllobjectifs();
	}, []);

	return (
		<CSSTransitionGroup
			component="div"
			transitionName="TabsAnimation"
			transitionAppear={true}
			transitionAppearTimeout={0}
			transitionEnter={false}
			transitionLeave={false}
		>
			<Row>
				<Col md="12">
					<div id="accordion" className="accordion-wrapper mb-3">
						<Card className="cd" elevation={3}>
							<CardHeader id="headingOne">
								<Button
									block
									color="link"
									className="text-left m-0 p-0"
									onClick={() => toggleAccordion(0)}
									aria-expanded={accordion[0]}
									aria-controls="collapseOne"
								>
									<h5 className="m-0 p-0 pe-7s-graph1 btn-icon-wrapper">
										&nbsp; Progress
									</h5>
								</Button>
								<Divider orientation="vertical" flexItem /> &nbsp;
								<Button
									block
									color="link"
									className="text-left m-0 p-0"
									onClick={() => toggleAccordion(1)}
									aria-expanded={accordion[1]}
									aria-controls="collapseTwo"
								>
									<h5 className="m-0 p-0 pe-7s-graph2 btn-icon-wrapper">
										&nbsp; Dashboard
									</h5>
								</Button>
							</CardHeader>
							<Collapse
								isOpen={accordion[0]}
								data-parent="#accordion"
								id="collapseOne"
								aria-labelledby="headingOne"
							>
								<CardBody className="cd">
									<Row>
										<Col md="3">
											<div className="card mb-3 widget-content">
												<div className="widget-content-outer">
													<div className="widget-content-wrapper">
														<div className="widget-content-left">
															<div className="widget-heading">Exceeded</div>
															<div className="widget-subheading">
																Exceeded - over expected progress
															</div>
														</div>
														<div className="widget-content-right">
															<div className="widget-numbers text-success">
																{
																	props.objectifsList.filter(
																		(x) =>
																			(x.niveauid ==
																				localStorage.getItem("niveauid")) &
																			(x.progress == 100)
																	).length
																}
															</div>
														</div>
													</div>
													<div className="widget-progress-wrapper">
														<Progress
															className="progress-bar-sm"
															color="primary"
															value="100"
														/>
														<div className="progress-sub-label">
															<div className="sub-label-left">
																Exceeded - over expected progress
															</div>
															<div className="sub-label-right">100%</div>
														</div>
													</div>
												</div>
											</div>
										</Col>
										<Col md="3">
											<div className="card mb-3 widget-content">
												<div className="widget-content-outer">
													<div className="widget-content-wrapper">
														<div className="widget-content-left">
															<div className="widget-heading">On track</div>
															<div className="widget-subheading">
																On track - 66-100% of expected progress
															</div>
														</div>
														<div className="widget-content-right">
															<div className="widget-numbers text-warning">
																{
																	props.objectifsList.filter(
																		(x) =>
																			(x.niveauid ==
																				localStorage.getItem("niveauid")) &
																			(x.progress >= 66) &
																			(x.progress < 100)
																	).length
																}
															</div>
														</div>
													</div>
													<div className="widget-progress-wrapper">
														<Progress
															className="progress-bar-sm progress-bar-animated-alt"
															color="danger"
															value="70"
														/>
														<div className="progress-sub-label">
															<div className="sub-label-left">
																On track - 66-100% of expected progress
															</div>
															<div className="sub-label-right">66-100%</div>
														</div>
													</div>
												</div>
											</div>
										</Col>
										<Col md="3">
											<div className="card mb-3 widget-content">
												<div className="widget-content-outer">
													<div className="widget-content-wrapper">
														<div className="widget-content-left">
															<div className="widget-heading">At risk</div>
															<div className="widget-subheading">
																At risk - 33-66% of expected progress
															</div>
														</div>
														<div className="widget-content-right">
															<div className="widget-numbers text-danger">
																{
																	props.objectifsList.filter(
																		(x) =>
																			(x.niveauid ==
																				localStorage.getItem("niveauid")) &
																			(x.progress >= 33) &
																			(x.progress < 66)
																	).length
																}
															</div>
														</div>
													</div>
													<div className="widget-progress-wrapper">
														<Progress
															className="progress-bar-sm progress-bar-animated-alt"
															color="success"
															value="60"
														/>
														<div className="progress-sub-label">
															<div className="sub-label-left">
																At risk - 33-66% of expected progress
															</div>
															<div className="sub-label-right">33-66%</div>
														</div>
													</div>
												</div>
											</div>
										</Col>
										<Col md="3">
											<div className="card mb-3 widget-content">
												<div className="widget-content-outer">
													<div className="widget-content-wrapper">
														<div className="widget-content-left">
															<div className="widget-heading">Off track</div>
															<div className="widget-subheading">
																Off track - 0-33% of expected progress
															</div>
														</div>
														<div className="widget-content-right">
															<div className="widget-numbers text-focus">
																{
																	props.objectifsList.filter(
																		(x) =>
																			(x.niveauid ==
																				localStorage.getItem("niveauid")) &
																			(x.progress >= 0) &
																			(x.progress < 33)
																	).length
																}
															</div>
														</div>
													</div>
													<div className="widget-progress-wrapper">
														<Progress
															className="progress-bar-sm progress-bar-animated-alt"
															color="info"
															value="30"
														/>
														<div className="progress-sub-label">
															<div className="sub-label-left">
																Off track - 0-33% of expected progress
															</div>
															<div className="sub-label-right">0-33%</div>
														</div>
													</div>
												</div>
											</div>
										</Col>
									</Row>
								</CardBody>
							</Collapse>
						</Card>

						<Card className="cd">
							<Collapse
								isOpen={accordion[1]}
								data-parent="#accordion"
								id="collapseTwo"
							>
								<CardBody className="cd">
									<div className="row mb-3">
										<div className="col-6">
											<div className="k-card">
												<Chart style={{ height: 350 }}>
													<ChartTitle text="Column Chart" />
													<ChartLegend
														position="top"
														orientation="horizontal"
													/>
													<ChartCategoryAxis>
														<ChartCategoryAxisItem
															categories={categories}
															startAngle={45}
														/>
													</ChartCategoryAxis>
													<ChartSeries>
														{series.map((item, idx) => (
															<ChartSeriesItem
																key={idx}
																type="column"
																tooltip={{ visible: true }}
																data={item.data}
																name={item.name}
															/>
														))}
													</ChartSeries>
												</Chart>
											</div>
										</div>
										<div className="col-6">
											<div className="k-card">
												<Chart style={{ height: 350 }}>
													<ChartTitle text="Line Chart" />
													<ChartLegend
														position="top"
														orientation="horizontal"
													/>
													<ChartCategoryAxis>
														<ChartCategoryAxisItem
															categories={categories}
															startAngle={45}
														/>
													</ChartCategoryAxis>
													<ChartSeries>
														{series.map((item, idx) => (
															<ChartSeriesItem
																key={idx}
																type="line"
																tooltip={{ visible: true }}
																data={item.data}
																name={item.name}
															/>
														))}
													</ChartSeries>
												</Chart>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-6">
											<div className="k-card">
												<Chart style={{ height: 350 }}>
													<ChartTitle text="Area Chart" />
													<ChartLegend
														position="top"
														orientation="horizontal"
													/>
													<ChartCategoryAxis>
														<ChartCategoryAxisItem
															categories={categories}
															startAngle={45}
														/>
													</ChartCategoryAxis>
													<ChartSeries>
														{areaData.map((item, idx) => (
															<ChartSeriesItem
																key={idx}
																type="area"
																tooltip={{ visible: true }}
																data={item.data}
																name={item.name}
															/>
														))}
													</ChartSeries>
												</Chart>
											</div>
										</div>
										<div className="col-6">
											<div className="k-card">
												<Chart style={{ height: 350 }}>
													<ChartTitle text="Pie Chart" />
													<ChartLegend
														position="top"
														orientation="horizontal"
													/>
													<ChartSeries>
														<ChartSeriesItem
															type="pie"
															overlay={{
																gradient: "sharpBevel",
															}}
															tooltip={{ visible: true }}
															data={pieData}
															categoryField="name"
															field="share"
														/>
													</ChartSeries>
												</Chart>
											</div>
										</div>
									</div>
								</CardBody>
							</Collapse>
						</Card>
					</div>
				</Col>
			</Row>
		</CSSTransitionGroup>
	);
};

const mapStateToProps = (state) => ({
	objectifsList: state.objectifs.list,
});
const mapActionToProps = {
	fetchAllobjectifs: actions.fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(Progres);
