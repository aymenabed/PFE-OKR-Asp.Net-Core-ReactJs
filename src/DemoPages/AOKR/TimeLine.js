import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Row, Col, Card, CardBody, Container, CardHeader } from "reactstrap";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";

class TimeLine extends React.Component {
	render() {
		return (
			<Fragment>
				<CSSTransitionGroup
					component="div"
					transitionName="TabsAnimation"
					transitionAppear={true}
					transitionAppearTimeout={0}
					transitionEnter={false}
					transitionLeave={false}
				>
					<Container fluid>
						<Row>
							<Col md="12">
								<Card className="main-card mb-3">
									<CardHeader>TimeLine</CardHeader>
									<CardBody>
										<VerticalTimeline layout="1-column">
											<VerticalTimelineElement
												className="vertical-timeline-item"
												icon={
													<i className="badge badge-dot badge-dot-xl badge-success">
														{" "}
													</i>
												}
												date="10:30 PM"
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
												date="12:25 PM"
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
												date="15:00 PM"
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
												date="15:00 PM"
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
												date="10:30 PM"
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
												date="12:25 PM"
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
												date="15:00 PM"
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
												date="15:00 PM"
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
												date="10:30 PM"
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
												date="12:25 PM"
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
												date="15:00 PM"
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
												date="15:00 PM"
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
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}

export default TimeLine;
