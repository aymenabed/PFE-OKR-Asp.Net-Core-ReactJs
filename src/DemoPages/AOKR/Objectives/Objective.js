import React, { useState, useEffect } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Typography from "@material-ui/core/Typography";
import Progres from "../Progress";
import "../CSS/Style.scss";
import { connect } from "react-redux";
import * as actions from "../../../actions/objectifs";
import ListGroupCollapse from "./ListGroupCollapse";
import ModalsExample from "./AddObjective";

import {
  Filter,
  Operators,
  TextFilter,
  NumericFilter,
  DateFilter,
  BooleanFilter,
} from "@progress/kendo-react-data-tools";

import { filterBy } from "@progress/kendo-data-query";

const Objective = ({ classes, ...props }) => {
  const [filter, setfilter] = useState({
    logic: "and",
    filters: [{ field: "title", operator: "contains", value: "" }],
  });

  const onFilterChange = (event) => {
    setfilter(event.filter);
  };

  useEffect(() => {
    props.fetchAllobjectifs();
  }, []);
  
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="TabsAnimation"
      transitionAppear={true}
      transitionAppearTimeout={0}
      transitionEnter={false}
      transitionLeave={false}
    >
      <Typography variant="h4" gutterBottom>
        Your Progress
      </Typography>
      <Progres></Progres>
      <Typography variant="h4" gutterBottom>
        Your Objectives
      </Typography>
      <Filter
        value={filter}
        onChange={onFilterChange}
        fields={[
          {
            name: "title",
            label: "Title",
            filter: TextFilter,
            operators: Operators.text,
          },
          {
            name: "description",
            label: "Description",
            filter: TextFilter,
            operators: Operators.text,
          },
          {
            name: "progress",
            label: "Progress",
            filter: NumericFilter,
            operators: Operators.numeric,
          },
          {
            name: "startdate",
            label: "Start date",
            filter: DateFilter,
            operators: Operators.date,
          },
          {
            name: "enddate",
            label: "Due date",
            filter: DateFilter,
            operators: Operators.date,
          },
          {
            name: "Discontinued",
            label: "Discontinued",
            filter: BooleanFilter,
            operators: Operators.boolean,
          },
        ]}
      />

      {filterBy(props.objectifsList.filter(x => x.niveauid == props.id), filter).map((record, index) => (
        <div filterable-group="true">
          <ListGroupCollapse key={index} Objective={record}></ListGroupCollapse>
        </div>
      ))}
      <ModalsExample> </ModalsExample>
      <br></br>
    </CSSTransitionGroup>
  );
};

const mapStateToProps = (state) => ({
  objectifsList: state.objectifs.list,
});

const mapActionToProps = {
  fetchAllobjectifs: actions.fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(Objective);
