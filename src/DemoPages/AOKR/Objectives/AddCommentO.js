import Rodal from "rodal";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Upload } from "@progress/kendo-react-upload";
import "@progress/kendo-theme-material/dist/all.css";
import * as actions from "../../../actions/commentsO";
import { useToasts } from "react-toast-notifications";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "date-fns";
import "../CSS/Style.scss";

import RichEditor from "./RichEditor";
import { convertToRaw, EditorState, RichUtils } from "draft-js";

const AddCommentO = ({ classes, ...props }) => {
  const [visible, setvisible] = useState(false);
  const { addToast } = useToasts();

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
            Write your comment for Objective
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
          <ModalHeader className="ModalHeader">
            Write your comment for Objective
          </ModalHeader>

          <Formik
            initialValues={{
              editor: new EditorState.createEmpty(),
            }}
            validationSchema={Yup.object().shape({})}
            onSubmit={(fields, { resetForm }) => {
              let post = {
                objectifId: props.id,
                date: moment().format('LLLL'),
                description: JSON.stringify(
                  convertToRaw(fields.editor.getCurrentContent())
                ),
              };

              const onSuccess = () => {
                resetForm({ values: props.initialValues });
                addToast("Submitted successfully", { appearance: "success" });
              };

              props.createCommentsO(post, onSuccess);
              hide();
            }}
            render={({
              values,
              touched,
              dirty,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
            }) => (
              <Form>
                <ModalBody>
                  <Typography id="range-slider" gutterBottom>
                    Description
                  </Typography>

                  <RichEditor
                    id="editor"
                    editorState={values.editor}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />

                  <Upload
                    batch={false}
                    autoUpload={false}
                    multiple={true}
                    defaultFiles={[]}
                    withCredentials={false}
                    saveUrl={
                      "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                    }
                    removeUrl={
                      "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="link" type="reset" onClick={hide}>
                    Cancel
                  </Button>
                  <Button type="reset" color="link">
                    Reset
                  </Button>
                  <Button
                    className="btn-shadow btn-wide btn-pill"
                    color="primary"
                    type="submit"
                  >
                    Add
                  </Button>
                </ModalFooter>
              </Form>
            )}
          />
        </Rodal>
      </CSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  commentsO: state.commentsO.listCO,
});

const mapActionToProps = {
  createCommentsO: actions.createCO,
};

export default connect(mapStateToProps, mapActionToProps)(AddCommentO);
