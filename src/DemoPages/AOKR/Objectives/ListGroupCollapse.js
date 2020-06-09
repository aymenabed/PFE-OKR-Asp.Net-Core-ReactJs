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
  Progress,
} from "reactstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import PerfectScrollbar from "react-perfect-scrollbar";

/*material-ui*/
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";
import MessageIcon from "@material-ui/icons/Message";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";

import KeyResult from "../KeyResults/KeyResult";
import AddKeyResult from "../KeyResults/AddKeyResult";
import EditObjective from "./EditObjective";
import DeleteObjective from "./DeleteObjective";
import CpoyObjective from "./CopyObjective";
import MoveObjective from "./MoveObjective";
import LinkObjective from "./LinkObjective";
import CommentO from "./CommentO";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import "../CSS/Style.scss";
import Moment from 'moment';

import {
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from "draft-js";

/********************** */
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions/keyResults";
import * as action from "../../../actions/commentsO";


const ListGroupCollapse = ({ classes, ...props }) => {
  const [accordion, setaccordion] = useState([false, false, false]);

  const toggleAccordion = (tab) => {
    const prevState = accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    setaccordion(state);
  };

  useEffect(() => {
    props.fetchkeyResults();
    props.fetchcommentsO();
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
      <Row hover>
        <Col md="12">
          <div id="accordion" className="accordion-wrapper mb-3">
            <Card className="cd" elevation={3}>
              <CardHeader id="headingOne">
                <Button
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => toggleAccordion(0) }
                  aria-expanded={accordion[0]}
                  aria-controls="collapseOne"
                  id="Tooltip-t"
                >
                  <h5 className="m-0 p-0" field="title">
                    {props.Objective.title}
                    <span className="badge badge-pill badge-primary">
                       {props.keyResults.filter(x => x.objectifId == props.Objective.id).length}
                        </span>
                  </h5>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={"Tooltip-t"}
                    placement="left"
                  >
                    Objective Title
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
                  id="Tooltip-p"
                  field="progress"
                >
                  {props.Objective.progress == 100 ? (
                    <Progress field="progress"
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.Objective.progress}
                      color="primary"
                      width="15px"
                    >
                      {props.Objective.progress} %
                    </Progress>
                  ) : props.Objective.progress >= 0 &&
                    props.Objective.progress <= 32 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.Objective.progress}
                      color="info"
                      width="15px"
                      field="progress"
                    >
                      {props.Objective.progress} %
                    </Progress>
                  ) : props.Objective.progress >= 33 &&
                    props.Objective.progress <= 65 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.Objective.progress}
                      color="success"
                      width="15px"
                      field="progress"
                    >
                      {props.Objective.progress} %
                    </Progress>
                  ) : props.Objective.progress >= 66 &&
                    props.Objective.progress <= 99 ? (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.Objective.progress}
                      color="danger"
                      width="15px"
                      field="progress"
                    >
                      {props.Objective.progress} %
                    </Progress>
                  ) : (
                    <Progress
                      className="progress-bar-rounded progress-bar-animated-alt mb-6"
                      value={props.Objective.progress}
                      color="warning"
                      width="15px"
                      field="progress"
                    >
                      {props.Objective.progress} %
                    </Progress>
                  )}

                  <UncontrolledTooltip
                    placement="bottom"
                    target={"Tooltip-p"}
                    placement="left"
                  >
                    Change Objective progress by its Key Results
                  </UncontrolledTooltip>
                </Button>

                <Divider orientation="vertical" flexItem />

                <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      className="btn-icon btn-icon-only"
                      color="link"
                      onClick={() => toggleAccordion(1)}
                      aria-expanded={accordion[1]}
                      id="Tooltip-d"
                    >
                      <LaunchIcon style={{ fontSize: 26 }}></LaunchIcon>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"Tooltip-d"}
                        placement="left"
                      >
                        Objective Details
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
                      onClick={() => toggleAccordion(2)}
                      aria-expanded={accordion[2]}
                      id="Tooltip-c"
                    >
                      <button className="mb-0 mr-2 btn-icon btn-icon-only btn btn-link btn-sm">
                        <span className="badge badge-pill badge-primary">
                       {props.commentsO.filter(x => x.objectifId == props.Objective.id).length}
                        </span>
                        <MessageIcon style={{ fontSize: 27 }}></MessageIcon>
                      </button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target={"Tooltip-c"}
                        placement="left"
                      >
                        Comments
                      </UncontrolledTooltip>
                    </DropdownToggle>
                  </UncontrolledButtonDropdown>
                </div>

                <Divider orientation="vertical" flexItem />

                <FadeMenu
                  id={props.Objective.id}
                  title={props.Objective.title}
                  Objective={props.Objective}
                ></FadeMenu>
              </CardHeader>
              <Collapse
                isOpen={accordion[0]}
                data-parent="#accordion"
                id="collapseOne"
                aria-labelledby="headingOne"
              >
                <CardBody>
                  <KeyResult
                    keyResults={props.keyResults.filter(x => x.objectifId == props.Objective.id)}
                  ></KeyResult>
                    <AddKeyResult id={props.Objective.id}> </AddKeyResult>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="cd">
              <Collapse
                isOpen={accordion[1]}
                data-parent="#accordion"
                id="collapseTwo"
              >
                <Row className="no-gutters">
                  <Col md="6" xl="4">
                    <div className="widget-content">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                          <h4>Start date : &nbsp;</h4>
                        </div>
                        <div className="widget-content-right ml-0 mr-3">
                          <h4 field="startdate"> {Moment(props.Objective.startdate).format('dddd-DD-MMMM-YYYY, HH:mm:ss A')}</h4>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6" xl="4">
                    <div className="widget-content">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                          <h4>Due date :&nbsp;</h4>
                        </div>
                        <div className="widget-content-right ml-0 mr-3">
                          <h4 field="enddate">{Moment(props.Objective.enddate).format('dddd-DD-MMMM-YYYY, HH:mm:ss A')}</h4>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6" xl="4">
                    <div className="widget-content">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                          <h4>Status : &nbsp;</h4>
                        </div>
                        <div className="widget-content-right ml-0 mr-3">
                          {props.Objective.progress == 100 ? (
                            <h4>Exceeded</h4>
                          ) : props.Objective.progress >= 0 &&
                            props.Objective.progress <= 32 ? (
                            <h4>Off track</h4>
                          ) : props.Objective.progress >= 33 &&
                            props.Objective.progress <= 65 ? (
                            <h4>At risk</h4>
                          ) : props.Objective.progress >= 66 &&
                            props.Objective.progress <= 99 ? (
                            <h4>On track</h4>
                          ) : (
                            <h4>Exceeded</h4>
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <CardBody>
                  <CardTitle>Description :</CardTitle>
                  <div className="scroll-area-sm">
                    <PerfectScrollbar>
                      <Editor
                        editorState={EditorState.createWithContent(
                          convertFromRaw(
                            JSON.parse(props.Objective.description)
                          )
                        )}
                        readOnly
                      />
                    </PerfectScrollbar>
                  </div>
                </CardBody>
              </Collapse>
            </Card>
            <Card className="cd">
              <Collapse
                isOpen={accordion[2]}
                data-parent="#accordion"
                id="collapseThree"
              >
                <CommentO comments={props.commentsO.filter(x => x.objectifId == props.Objective.id)} id={props.Objective.id}></CommentO>
              </Collapse>
            </Card>
          </div>
        </Col>
      </Row>
    </CSSTransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  keyResults: state.keyResults.listKR,
  commentsO: state.commentsO.listCO,
});

const mapActionToProps = {
  fetchkeyResults: actions.fetchKR,
  fetchcommentsO: action.fetchAllCO,
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
          style={{ fontSize: 27 }}
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
        <MenuItem>
          <LaunchIcon fontSize="small"></LaunchIcon> &nbsp;&nbsp;
          <Typography variant="inherit">Details</Typography>
        </MenuItem>
        <EditObjective Objective={props.Objective} onClick={handleClose} Close={handleClose}></EditObjective>
        <MenuItem>
          <VisibilityOutlinedIcon fontSize="small"></VisibilityOutlinedIcon>{" "}
          &nbsp;&nbsp;
          <Typography variant="inherit">Make Private</Typography>
        </MenuItem>
        <MenuItem>
          <ArchiveOutlinedIcon fontSize="small"></ArchiveOutlinedIcon>{" "}
          &nbsp;&nbsp;
          <Typography variant="inherit">Archive</Typography>
        </MenuItem>
        <LinkObjective></LinkObjective>
        <CpoyObjective Objective={props.Objective}></CpoyObjective>
        <MoveObjective Objective={props.Objective}></MoveObjective>
        <DeleteObjective
          id={props.id}
          title={props.title}
          Close={() => handleClose}
        ></DeleteObjective>
      </Menu>
    </div>
  );
}
