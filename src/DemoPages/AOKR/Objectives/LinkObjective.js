import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Rodal from "rodal";

import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
class LinkObjective extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  show() {
    this.setState({
      visible: true,
    });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
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
          onClick={this.show.bind(this, value)}
          style={style}
        >
          <LinkOutlinedIcon fontSize="small" />
          &nbsp;&nbsp;
          <Typography variant="inherit">Link Objectives</Typography>
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
            visible={this.state.visible}
            onClose={this.hide.bind(this)}
            animation="flip"
            showMask={false}
          >
            <ModalHeader>Link Objective</ModalHeader>
            <ModalBody>
              <h3>Please confirm you wish to delete this objective </h3>
            </ModalBody>
            <ModalFooter>
              <Button color="link" onClick={this.hide.bind(this)}>
                Cancel
              </Button>
              <Button
                color="primary"
                className="btn-shadow btn-wide btn-pill"
                onClick={this.hide.bind(this)}
              >
                Link
              </Button>
            </ModalFooter>
          </Rodal>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
export default LinkObjective;
