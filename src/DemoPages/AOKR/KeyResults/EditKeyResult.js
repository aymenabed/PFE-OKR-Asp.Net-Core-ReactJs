import Rodal from "rodal";
import React, { Fragment, useState } from "react";
import { TextField, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../actions/keyResults";
import { useToasts } from "react-toast-notifications";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import EditIcon from "@material-ui/icons/Edit";
import { convertFromRaw } from "draft-js";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

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

import RichEditor from "./RichEditor";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const filter = createFilterOptions();

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 11px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

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

const ranges = [
  {
    title: "%",
  },
  {
    title: "$",
  },
  {
    title: "£",
  },
  {
    title: "USD",
  },
  {
    title: "EUR",
  },
  {
    title: "GBP",
  },
  {
    title: "Dollars",
  },
  {
    title: "Euros",
  },
  {
    title: "Pounds",
  },
  {
    title: "Answers",
  },
  {
    title: "Articles",
  },
  {
    title: "Clients",
  },
  {
    title: "Items",
  },
  {
    title: "Meetings",
  },
  {
    title: "NPS",
  },
  {
    title: "People",
  },
  {
    title: "Persons",
  },
  {
    title: "Posts",
  },
  {
    title: "Projects",
  },
  {
    title: "Signups",
  },
  {
    title: "Trials",
  },
  {
    title: "Visitors",
  },
];

const EditKeyResult = ({ classes, ...props }) => {
  const [visible, setvisible] = useState(false);
  const { addToast } = useToasts();

  const show = () => {
    setvisible(true);
  };

  const hide = () => {
    setvisible(false);
  };

  const [value, setValue] = React.useState("%");
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
    });
    handleClose();
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
        <MenuItem onClick={() => show(this)}>
          <EditIcon fontSize="small" />
          &nbsp;&nbsp;
          <Typography variant="inherit">Edit Key Result</Typography>
        </MenuItem>
        <Rodal
          visible={visible}
          onClose={() => hide(this)}
          animation="flip"
          showMask={true}
          width="500"
          showCloseButton={true}
        >
          <ModalHeader className="ModalHeader">
          Edit the Key Result
          </ModalHeader>

          <Formik
            initialValues={{
              title: props.krs.title,
              Startvalue: props.krs.Startvalue,
              Targetvalue: props.krs.Targetvalue,
              type: props.krs.type,
              progress:props.krs.progress,
              editor: new EditorState.createWithContent(
                convertFromRaw(JSON.parse(props.krs.description))
              ),
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .min(10, "Min 10")
                .max(150, "Max 150")
                .required("Title is resquired"),
              type: Yup.string().required("type is resquired"),
            })}
            onSubmit={(fields, { resetForm }) => {
              let post = {
                title: fields.title,
                progress: fields.progress,
                Startvalue: fields.Startvalue,
                Targetvalue: fields.Targetvalue,
                objectifId: props.krs.objectifId,
                type: fields.type,
                description: JSON.stringify(
                  convertToRaw(fields.editor.getCurrentContent())
                ),
              };

              const onSuccess = () => {
                resetForm({ values: props.initialValues });
                addToast("Submitted successfully", { appearance: "success" });
              };

              props.updateKR(props.krs.id, post, onSuccess);
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
                        Type
                      </Typography>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            setTimeout(() => {
                              toggleOpen(true);
                              setDialogValue({
                                title: newValue,
                              });
                            });
                          } else if (newValue && newValue.inputValue) {
                            toggleOpen(true);
                            setDialogValue({
                              title: newValue.inputValue,
                            });
                            setFieldValue("type", newValue.inputValue);
                          } else {
                            setValue(newValue);
                            setFieldValue("type", newValue.title);
                          }
                        }}
                        onBlur={setFieldTouched}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);

                          if (params.inputValue !== "") {
                            filtered.push({
                              inputValue: params.inputValue,
                              title: `Add "${params.inputValue}"`,
                            });
                          }

                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={ranges}
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option.inputValue) {
                            return option.inputValue;
                          }
                          return option.title;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderOption={(option) => option.title}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            value={value}
                            {...params}
                            className="form-control"
                            id="type"
                            placeholder="type"
                            variant="standard"
                            name="type"
                          />
                        )}
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <form onSubmit={onSubmit}>
                          <DialogTitle id="form-dialog-title">
                            Add a new type
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Did you miss any type in our list? Please, add it!
                            </DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              value={dialogValue.title}
                              onChange={(event) =>
                                setDialogValue({
                                  ...dialogValue,
                                  title: event.target.value,
                                })
                              }
                              label="Type"
                              type="text"
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={onSubmit} color="primary">
                              Add
                            </Button>
                          </DialogActions>
                        </form>
                      </Dialog>

                      <Typography id="range-slider" gutterBottom>
                        Key Result Progress
                      </Typography>

                      <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        name="progress"
                        id="progress"
                        min={values.Startvalue}
                        max={values.Targetvalue}
                        defaultValue={16}
                        valueLabelDisplay="auto"
                        value={values.progress}
                        onChange={(event, value) =>
                          setFieldValue("progress", value)
                        }
                        onBlur={setFieldTouched}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Typography id="range-slider" gutterBottom>
                        Start value
                      </Typography>

                      <TextField
                        className="form-control"
                        id="outlined-multiline-static"
                        placeholder="Start value"
                        defaultValue="Default Value"
                        variant="standard"
                        name="Startvalue"
                        type="number"
                        value={values.Startvalue}
                        error={
                          (errors.Startvalue && touched.Startvalue) || false
                        }
                        helperText={
                          errors.Startvalue && touched.Startvalue
                            ? errors.Startvalue
                            : null
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>

                    <Col md="6">
                      <Typography id="range-slider" gutterBottom>
                        Target value
                      </Typography>

                      <TextField
                        className="form-control"
                        id="outlined-multiline-static"
                        placeholder="Target value"
                        defaultValue="Default Value"
                        variant="standard"
                        name="Targetvalue"
                        type="number"
                        value={values.Targetvalue}
                        error={
                          (errors.Targetvalue && touched.Targetvalue) || false
                        }
                        helperText={
                          errors.Targetvalue && touched.Targetvalue
                            ? errors.Targetvalue
                            : null
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
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
                    Save
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
  keyResults: state.keyResults.listKR,
});

const mapActionToProps = {
  updateKR: action.updateKR,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditKeyResult));

