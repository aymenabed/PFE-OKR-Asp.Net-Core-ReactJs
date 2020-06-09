import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import ListGroupCollapse from "./ListGroupCollapse";

const KeyResult = ({ classes, ...props }) => {
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="TabsAnimation"
      transitionAppear={true}
      transitionAppearTimeout={0}
      transitionEnter={false}
      transitionLeave={false}
    >
      {props.keyResults ? ( props.keyResults.map((record, index) => (
        <ListGroupCollapse key={index} krs={record}></ListGroupCollapse>
      ))) : null}
    </CSSTransitionGroup>
  );
};

export default KeyResult;
