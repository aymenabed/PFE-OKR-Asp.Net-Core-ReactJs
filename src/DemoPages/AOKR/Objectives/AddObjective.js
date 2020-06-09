import React, { useState, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Button } from "reactstrap";
import Rodal from "rodal";
import "../CSS/Style.scss";
import DCandidateForm from "./DCandidateForm";

const ModalsExample = ({ classes, ...props }) => {
  const [visible, setvisible] = useState(false);

  const show = () => {
    setvisible(true);
  };

  const hide = () => {
    setvisible(false);
  };

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
        <div className="nav-item-btn text-center">
          <Button
            className="btn-shadow btn-wide btn-pill"
            color="primary"
            onClick={() => show(this)}
          >
            Add a new objective
          </Button>
        </div>
        <Rodal
          visible={visible}
          onClose={() => hide(this)}
          animation="flip"
          showMask={true}
          width="500"
          showCloseButton={true}
        >
          <DCandidateForm close={() => hide(this)}></DCandidateForm>
        </Rodal>
      </CSSTransitionGroup>
    </Fragment>
  );
};

export default ModalsExample;
