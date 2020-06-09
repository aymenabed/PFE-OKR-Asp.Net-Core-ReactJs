import Rodal from "rodal";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Typography from "@material-ui/core/Typography";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../CSS/Style.scss";
import { MenuItem } from "@material-ui/core";
import "@progress/kendo-theme-material/dist/all.css";
import * as actions from "../../../actions/level";
import * as actionsO from "../../../actions/objectifs";
import ReplyAllOutlinedIcon from "@material-ui/icons/ReplyAllOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import {
  TabStrip,
  TabStripTab,
  PanelBar,
  PanelBarItem,
  PanelBarUtils,
  Menu,
  MenuItemModel,
  MenuItemLink,
  MenuItemArrow,
  Splitter,
  Drawer,
  DrawerNavigation,
  DrawerContent,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  Avatar,
} from "@progress/kendo-react-layout";
import "@progress/kendo-react-intl";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-inputs";
import "react-router-dom";

const CopyObjective = ({ classes, ...props }) => {
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState([]);
  const [id, setid] = useState(2);
  const { addToast } = useToasts();

  const show = () => {
    setvisible(true);
  };

  const hide = () => {
    setvisible(false);
  };

  useEffect(() => {
    props.fetchAllLevel();
    fetchRoot()
      .then((result) => {
        setdata({ result });
      })
      .then(() => {
        return fetchChildren();
      })
      .then((result) => {
        setdata({ result });
      });
  }, []);

  // Simulate root items fetch
  const fetchRoot = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = props.levelList.map((item) => {
          return {
            ...item,
            children: undefined,
            content: (
              <div className="custom-loading-template">
                <h4>LOADING</h4>
                <span className="k-icon k-i-loading"></span>
              </div>
            ),
          };
        });
        resolve(data);
      }, 1000);
    });
  };

  // Simulate child items fetch
  const fetchChildren = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(props.levelList);
      }, 5000);
    });
  };

  const onSelect = (event) => {
    setid(event.target.props.id);
  };

  const move = () => {
    let post = {
      title: props.Objective.title,
      startdate: props.Objective.startdate,
      enddate: props.Objective.enddate,
      progress: props.Objective.progress,
      niveauid: id,
      description: props.Objective.description,
    };
    const onSuccess = () => {
      addToast("Objective moved successfully", { appearance: "warning" });
    };
    props.createobjectifs(post, onSuccess);
    hide();
  };

  const components = PanelBarUtils.mapItemsToComponents(props.levelList);

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
        <MenuItem onClick={() => show(this)}>
        <FileCopyOutlinedIcon fontSize="small" />
          &nbsp;&nbsp;
          <Typography variant="inherit">Copy to</Typography>
        </MenuItem>
        <Rodal
          visible={visible}
          onClose={() => hide(this)}
          animation="flip"
          showMask={true}
          width="500"
          showCloseButton={true}
        >
          <ModalHeader className="ModalHeader">Copy Objective To</ModalHeader>
          <ModalBody>
            <PanelBar
              children={components}
              expandMode={"single"}
              onSelect={onSelect}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="link" type="reset" onClick={hide}>
              Cancel
            </Button>
            <Button
              className="btn-shadow btn-wide btn-pill"
              color="primary"
              type="submit"
              onClick={() => move()}
            >
              Copy to
            </Button>
          </ModalFooter>
        </Rodal>
      </CSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  levelList: state.level.listL,
  objectifsList: state.objectifs.list,
});

const mapActionToProps = {
  fetchAllLevel: actions.fetchL,
  createobjectifs: actionsO.create,
};

export default connect(mapStateToProps, mapActionToProps)(CopyObjective);

