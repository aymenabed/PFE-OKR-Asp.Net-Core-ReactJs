import React, { Component } from "react";
import {
  CardBody,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import PerfectScrollbar from "react-perfect-scrollbar";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

/*material-ui*/
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import AddCommentO from "./AddCommentO";

import DeleteCommentO from "./DeleteCommentO";
import EditCommentO from "./EditCommentO";
import {
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from "draft-js";

import avatar2 from "../../../assets/utils/images/avatars/2.jpg";
import "../CSS/Style.scss";
import * as actions from "../../../actions/commentsO";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CommentO = ({ classes, ...props }) => {
  console.log("test", props.commentsOList);

  return (
    <CSSTransitionGroup
      component="div"
      transitionName="TabsAnimation"
      transitionAppear={true}
      transitionAppearTimeout={0}
      transitionEnter={false}
      transitionLeave={false}
    >
      <CardBody>
        <div className="scroll-area-xlg">
          <PerfectScrollbar>
            {props.comments
              ? props.comments.map((comment) => (
                  <div className="chat-wrapper p-1">
                    <div className="chat-box-wrapper">
                      <div>
                        <div className="avatar-icon-wrapper mr-1">
                          <div className="avatar-icon avatar-icon-lg rounded-circle">
                            <img src={avatar2} alt="" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="chat-box">
                      <Editor
                        editorState={EditorState.createWithContent(
                          convertFromRaw(
                            JSON.parse(comment.description)
                          )
                        )}
                        readOnly
                      />
                          <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                            <FadeMenu comment={comment}></FadeMenu>
                          </div>
                        </div>
                        <small className="opacity-6">
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className="mr-1"
                          />
                          {moment(comment.date).fromNow()} - {moment(comment.date).calendar()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <Divider />

            <br></br>
            <AddCommentO id={props.id}></AddCommentO>
            <br></br>
          </PerfectScrollbar>
        </div>
      </CardBody>
    </CSSTransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  commentsOList: state.commentsO.listCO,
});

const mapActionToProps = {
  fetchAllcommentsO: actions.fetchAllCO,
};

export default connect(mapStateToProps, mapActionToProps)(CommentO);

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
        <EditCommentO comment={props.comment}></EditCommentO>
        <DeleteCommentO comment={props.comment}></DeleteCommentO>
      </Menu>
    </div>
  );
}
