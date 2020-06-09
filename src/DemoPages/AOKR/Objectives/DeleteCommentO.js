import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Rodal from "rodal";

import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";

/************* */
import { connect } from "react-redux";
import * as actions from "../../../actions/commentsO";
import { useToasts } from "react-toast-notifications";
const DeleteCommentO = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const onDelete = (id) => {
    props.deletecommentsO(id, () =>
      addToast("Deleted successfully", { appearance: "info" })
    );
    setvisible(false);
  };

  console.log("test",props.commentsOList)
  const [visible, setvisible] = useState(false);

  const show = () => {
    setvisible(true);
  };

  const hide = () => {
    setvisible(false);
  };
  let types = ["flip"];
  let buttons = types.map((value, index) => {
    let style = {
      animationDelay: index * 100 + "ms",
      WebkitAnimationDelay: index * 100 + "ms",
    };
    return (
      <MenuItem
        key={index}
        className="mb-2 mr-2"
        color="primary"
        onClick={() => {
          show(value);
        }}
        style={style}
      >
        <DeleteOutlineRoundedIcon fontSize="small" />
        &nbsp;&nbsp;
        <Typography variant="inherit">Delete Comment</Typography>
      </MenuItem>
    );
  });
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
        {buttons}

        <Rodal
          visible={visible}
          onClose={hide.bind(this)}
          animation="flip"
          showMask={true}
          showCloseButton={true}
        >
          <ModalHeader className="ModalHeader">Confirm Delete</ModalHeader>
          <ModalBody>
            <h3>
            Please confirm you wish to delete this Comment
            </h3>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={hide.bind(this)}>
              Cancel
            </Button>
            <Button
              color="danger"
              className="btn-shadow btn-wide btn-pill"
              onClick={() => onDelete(props.comment.id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </Rodal>
      </CSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  commentsOList: state.commentsO.listCO,
});

const mapActionToProps = {
  deletecommentsO: actions.DeleteCO,
};

export default connect(mapStateToProps, mapActionToProps)(DeleteCommentO);

