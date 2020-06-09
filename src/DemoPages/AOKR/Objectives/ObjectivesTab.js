import React, { Component, Fragment } from "react";
import Tabs from "react-responsive-tabs";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Objectives from "./Objectives";
import TimeLine from "../TimeLine";
import Tree from "../Tree";
import "../CSS/Style.scss";
const tabsContent = [
  {
    title: "Dashboard",
    content: <Objectives />,
  },
  {
    title: "TimeLine",
    content: <TimeLine />,
  },

  {
    title: "Tree",
    content: <Tree />,
  },
];

function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}
class ObjectivesTab extends Component {
  
  render() {
   
    return (
      <Fragment>
        <div className="app-inner-layout">
          <div className="app-inner-layout__header-boxed p-0">
            <PageTitle
              heading="Sales Dashboard"
              subheading="Example of a Dashboard page built with ArchitectUI."
              icon="pe-7s-umbrella icon-gradient bg-sunny-morning"
            />
          </div>
          <Tabs
            tabsWrapperClass="btn-pill bt"
            transform={false}
            showInkBar={true}
            items={getTabs()}
          />
        </div>
      </Fragment>
    );
  }
}

export default ObjectivesTab;
