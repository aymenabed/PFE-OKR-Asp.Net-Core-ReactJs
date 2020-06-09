import React, { Component } from "react";
import {
  Button,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Row,
  DropdownToggle,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Progress } from "reactstrap";
import "../CSS/Style.scss";
/*material-ui*/
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";
import LaunchIcon from "@material-ui/icons/Launch";
import MessageIcon from "@material-ui/icons/Message";
import * as actions from "../../../actions/commentsKR";
/*import*/
import EditKeyResult from "./EditKeyResult";
import DeleteKeyReslt from "./DeleteKeyResult";
import AssignKR from "./AssignKR";
import CommentKR from "./CommentKR";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const ListGroupCollapse = ({ classes, ...props }) => {
  const [accordion, setaccordion] = useState([false, false]);

  const toggleAccordion = (tab) => {
    const prevState = accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    setaccordion(state);
  };

  useEffect(() => {
    props.fetchcommentsKR();
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
            <Card className="cd">
              <CardHeader id="headingOne">
                <Button
                  block
                  color="black"
                  className="text-left m-0 p-0"
                  aria-controls="collapseOne"
                  id="Tooltip-krt"
                >
                  <h5 className="m-0 p-0"> {props.krs.title}</h5>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"Tooltip-krt"}
                    placement="left"
                  >
                    Key Result Title
                  </UncontrolledTooltip>
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button
                  block
                  color="link"
                  className="text-left m-3 p-0"
                  onClick={() => toggleAccordion(0)}
                  aria-expanded={accordion[0]}
                  aria-controls="collapseThree"
                  id="Tooltip-k"
                >
                  {props.krs.progress == 100 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.krs.progress}
                      color="primary"
                      width="15px"
                    >
                      {props.krs.progress} {props.krs.type}
                    </Progress>
                  ) : props.krs.progress >= 0 &&
                    props.krs.progress <= 32 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.krs.progress}
                      color="info"
                      width="15px"
                    >
                      {props.krs.progress} {props.krs.type}
                    </Progress>
                  ) : props.krs.progress >= 33 &&
                    props.krs.progress <= 65 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.krs.progress}
                      color="success"
                      width="15px"
                    >
                      {props.krs.progress} {props.krs.type}
                    </Progress>
                  ) : props.krs.progress >= 66 &&
                    props.krs.progress <= 99 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.krs.progress}
                      color="danger"
                      width="15px"
                    >
                      {props.krs.progress} {props.krs.type}
                    </Progress>
                  ) : (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.krs.progress}
                      color="warning"
                      width="15px"
                    >
                      {props.krs.progress} {props.krs.type}
                    </Progress>
                  )}

                  <UncontrolledTooltip
                    placement="bottom"
                    target={"Tooltip-k"}
                    placement="left"
                  >
                    Key Result progress
                  </UncontrolledTooltip>
                </Button>
                <Divider orientation="vertical" flexItem />
                <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      className="btn-icon btn-icon-only"
                      color="link"
                      onClick={() => toggleAccordion(0)}
                      aria-expanded={accordion[0]}
                      id="Tooltip-krd"
                    >
                      <LaunchIcon style={{ fontSize: 25 }}></LaunchIcon>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"Tooltip-krd"}
                        placement="left"
                      >
                        Key Result Details
                      </UncontrolledTooltip>
                    </DropdownToggle>
                  </UncontrolledButtonDropdown>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      className="btn-icon btn-icon-only"
                      color="link"
                      onClick={() => toggleAccordion(1)}
                      aria-expanded={accordion[1]}
                      id="Tooltip-krc"
                    >
                      <button className="mb-0 mr-2 btn-icon btn-icon-only btn btn-link btn-sm">
                        <span className="badge badge-pill badge-primary">
                        {props.commentsKR.filter(x => x.resultsId == props.krs.id).length}
                        </span>
                        <MessageIcon style={{ fontSize: 25 }}></MessageIcon>
                      </button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"Tooltip-krc"}
                        placement="left"
                      >
                        Comments
                      </UncontrolledTooltip>
                    </DropdownToggle>
                  </UncontrolledButtonDropdown>
                </div>
                <Divider orientation="vertical" flexItem />
                <FadeMenu 
                  id={props.krs.id}
                  title={props.krs.title}
                  krs={props.krs}></FadeMenu>
              </CardHeader>
            </Card>
            <Card className="cd">
              <Collapse
                isOpen={accordion[0]}
                data-parent="#accordion"
                id="collapseTwo"
              >
                <CardBody className="cd">
                  <CardTitle>Description :</CardTitle>
                  <div className="scroll-area-sm">
                    <PerfectScrollbar>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum sodales ullamcorper vehicula. Duis placerat
                        quam porta lorem lobortis, sit amet sodales mauris
                        finibus. Donec posuere diam at volutpat viverra. Cras
                        fringilla auctor augue sed congue. Maecenas mollis quis
                        enim quis egestas. In sollicitudin mi a pretium varius.
                        Integer eleifend sodales pharetra. Nullam vitae libero
                        sem. Nulla et eros congue, tincidunt ante eu, tincidunt
                        eros. Donec nisl purus, convallis a hendrerit ut,
                        eleifend in lectus. Proin luctus dignissim lacus, in
                        laoreet arcu eleifend non. Quisque viverra ipsum a massa
                        porta convallis. Donec tincidunt imperdiet purus,
                        interdum elementum ante commodo a. Quisque pharetra arcu
                        sapien, vel ornare magna sollicitudin quis.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum sodales ullamcorper vehicula. Duis placerat
                        quam porta lorem lobortis, sit amet sodales mauris
                        finibus. Donec posuere diam at volutpat viverra. Cras
                        fringilla auctor augue sed congue. Maecenas mollis quis
                        enim quis egestas. In sollicitudin mi a pretium varius.
                        Integer eleifend sodales pharetra. Nullam vitae libero
                        sem. Nulla et eros congue, tincidunt ante eu, tincidunt
                        eros. Donec nisl purus, convallis a hendrerit ut,
                        eleifend in lectus. Proin luctus dignissim lacus, in
                        laoreet arcu eleifend non. Quisque viverra ipsum a massa
                        porta convallis. Donec tincidunt imperdiet purus,
                        interdum elementum ante commodo a. Quisque pharetra arcu
                        sapien, vel ornare magna sollicitudin quis.
                      </p>
                    </PerfectScrollbar>
                  </div>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="cd">
              <Collapse
                isOpen={accordion[1]}
                data-parent="#accordion"
                id="collapseThree"
              >
                <CommentKR  comments={props.commentsKR.filter(x => x.resultsId == props.krs.id)} id={props.krs.id}></CommentKR>
              </Collapse>
            </Card>
          </div>
        </Col>
      </Row>
    </CSSTransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  commentsKR: state.commentsKR.listCKR,
});

const mapActionToProps = {
  fetchcommentsKR: actions.fetchAllCKR,
};

export default connect(mapStateToProps, mapActionToProps)(ListGroupCollapse);

export function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="btn-actions-pane-right text-capitalize actions-icon-btn ">
      <UncontrolledDropdown>
        <MenuIcon
          style={{ fontSize: 25 }}
          className="btn-icon btn-icon-only"
          color="link"
          id="Tooltip-m"
          onClick={handleClick}
        />
        <UncontrolledTooltip
          placement="bottom"
          target={"Tooltip-m"}
          placement="left"
        >
          More
        </UncontrolledTooltip>
      </UncontrolledDropdown>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EditKeyResult krs = {props.krs}></EditKeyResult>
        <AssignKR></AssignKR>
        <DeleteKeyReslt 
         id={props.id}
         title={props.title}></DeleteKeyReslt>
      </Menu>
    </div>
  );
}
