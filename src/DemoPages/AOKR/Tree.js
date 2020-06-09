import React, { Component, Fragment } from "react";
import SortableTree from "react-sortable-tree";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import treeData from "./SampleData";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

class Tree extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treeData: treeData,
		};
	}

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
					<Row>
						<Col lg="12">
							<Card className="main-card mb-3">
								<CardHeader>Tree</CardHeader>
								<CardBody>
									<div style={{ height: "100vh" }}>
										<SortableTree
											treeData={this.state.treeData}
											onChange={(treeData) => this.setState({ treeData })}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</CSSTransitionGroup>
			</Fragment>
		);
	}
}
export default Tree;
