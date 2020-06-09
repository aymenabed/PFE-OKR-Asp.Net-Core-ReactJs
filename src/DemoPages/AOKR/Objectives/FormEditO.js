import React, { Fragment } from "react";
import { TextField, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../../actions/objectifs";
import { useToasts } from "react-toast-notifications";
import DateFnsUtils from "@date-io/date-fns";

import Slider from "@material-ui/core/Slider";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";

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

import { EditorState } from "draft-js";
import RichEditor from "./RichEditor";
import { convertFromRaw, convertToRaw } from "draft-js";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const PrettoSlider = withStyles({
  root: {
    color: "#white",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const FormEditO = ({ classes, ...props }) => {
  const { addToast } = useToasts();

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
        <ModalHeader className="ModalHeader">Edit the Objective</ModalHeader>

        <Formik
          initialValues={{
            startdate: props.Objective.startdate,
            enddate: props.Objective.enddate,
            title: props.Objective.title,
            progress: props.Objective.progress,
            editor: new EditorState.createWithContent(
              convertFromRaw(JSON.parse(props.Objective.description))
            ),
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(10, "Min 10")
              .max(150, "Max 150")
              .required("Title is resquired"),
            startdate: Yup.date()
              .typeError("Date is required")
              .required("Date is required"),
            enddate: Yup.date()
              .typeError("Date is required")
              .required("Date is required"),
          })}
          onSubmit={(fields, { resetForm }) => {
            let post = {
              title: fields.title,
              startdate: fields.startdate,
              enddate: fields.enddate,
              progress: fields.progress,
              niveauid : localStorage.getItem("niveauid"),
              description: JSON.stringify(
                convertToRaw(fields.editor.getCurrentContent())
              ),
            };

            const onSuccess = () => {
              resetForm({ values: props.initialValues });
              addToast("Objective updated successfully", { appearance: "success" });
            };
            props.updateobjectifs(props.Objective.id, post, onSuccess);
            props.close();
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
                <Row>
                  <Col md="6">
                    <Typography id="range-slider" gutterBottom>
                      Title
                    </Typography>

                    <TextField
                      className="form-control"
                      id="outlined-multiline-static"
                      placeholder="try writing some lines"
                      multiline
                      rows="3"
                      defaultValue="Default Value"
                      variant="outlined"
                      name="title"
                      value={values.title}
                      error={(errors.title && touched.title) || false}
                      helperText={
                        errors.title && touched.title ? errors.title : null
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>

                  <Col md="6">
                    <Typography id="range-slider" gutterBottom>
                      Start Date
                    </Typography>
                    <Field
                      name="startdate"
                      value={values.startdate}
                      validate={(value) => {
                        if (new Date(value) > new Date(values.startdate)) {
                          return "Invalid Start Date";
                        }
                      }}
                      component={DatePickerField}
                    />
                    <Typography id="range-slider" gutterBottom>
                      Due Date
                    </Typography>
                    <Field
                      minDate={new Date(values.startdate)}
                      value={values.enddate}
                      name="enddate"
                      validate={(value) => {
                        if (new Date(value) < new Date(values.startdate)) {
                          return "Invalid Due Date";
                        }
                      }}
                      component={DatePickerField}
                    />
                  </Col>
                </Row>
                <br></br>
                <Typography id="range-slider" gutterBottom>
                      Key Result Progress
                    </Typography>
                    <PrettoSlider
                      valueLabelDisplay="auto"
                      aria-label="pretto slider"
                      name="progress"
                      id="progress"
                      min={0}
                      max={100}
                      defaultValue={16}
                      valueLabelDisplay="auto"
                      value={values.progress}
                      onChange={(event, value) =>
                        setFieldValue("progress", value)
                      }
                      onBlur={setFieldTouched}
                    />
                <Typography id="range-slider" gutterBottom>
                  Description
                </Typography>

                <RichEditor
                  id="editor"
                  editorState={values.editor}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="link" type="reset" onClick={props.close}>
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
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        />
      </CSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  objectifsList: state.objectifs.list,
});

const mapActionToProps = {
  updateobjectifs: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(FormEditO));

export function DatePickerField({ field, form, ...other }) {
  const [date, setDate] = React.useState(new Date());
  const [dateString, setDateString] = React.useState("");
  const currentError = form.errors[field.name];
  const currentTouched = form.touched[field.name];

  if (!isNaN(Date.parse(field.value))) {
    if (date !== field.value) {
      setDate(field.value);
      setDateString(null);
    }
  } else {
    if (dateString !== field.value) {
      setDateString(field.value);
    }
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        autoOk
        InputAdornmentProps={{ position: "end" }}
        name={field.name}
        value={date}
        minDate={new Date()}
        inputValue={dateString}
        clearable
        showTodayButton
        format="yyyy/MM/dd hh:mm a"
        error={(currentError && currentTouched) || false}
        helperText={currentError && currentTouched ? currentError : null}
        onChange={(date, value) => {
          const saveDate = !isNaN(date);
          form.setFieldTouched(field.name, true, false);
          form.setFieldValue(field.name, saveDate ? date : value, true);
        }}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
}
