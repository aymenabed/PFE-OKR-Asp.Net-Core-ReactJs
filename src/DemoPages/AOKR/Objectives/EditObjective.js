import React, { useState, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Rodal from "rodal";
import FormEditO from "./FormEditO";
import "date-fns";
import "../CSS/Style.scss";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

const EditObjective = ({ classes, ...props }) => {
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
        <MenuItem onClick={() => {show(this)}}>
          <EditIcon fontSize="small" />
          &nbsp;&nbsp;
          <Typography variant="inherit">Edit Objective</Typography>
        </MenuItem>
        <Rodal
          visible={visible}
          onClose={() => hide(this)}
          animation="flip"
          showMask={true}
          width="500"
          showCloseButton={true}
        >
          <FormEditO
            Objective={props.Objective}
            close={() => hide(this)}
          ></FormEditO>
        </Rodal>
      </CSSTransitionGroup>
    </Fragment>
  );
};

export default EditObjective;
