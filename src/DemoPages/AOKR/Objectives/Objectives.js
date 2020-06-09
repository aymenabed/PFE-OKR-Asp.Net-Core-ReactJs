import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { PDFExport } from "@progress/kendo-react-pdf";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { aggregateBy, process } from "@progress/kendo-data-query";
import "../CSS/Style.scss";
import products from "../products.json";
import Objective from "./Objective";
const aggregates = [{ field: "UnitPrice", aggregate: "sum" }];
const group = [{ field: "Discontinued", aggregates: aggregates }];
const data = process(products, { group: group }).data;
const total = aggregateBy(products, aggregates);
const CustomGroupHeader = (props) => `Discontinued: ${props.value}`;
const CustomGroupFooter = (props) =>
  `SUM: \$ ${props.aggregates.UnitPrice.sum.toFixed(2)}`;
const CustomFooter = (props) =>
  `Total ${props.column.title}: \$ ${total.UnitPrice.sum}`;

class Objectives extends Component {
  _exporter;
  export = () => {
    this._exporter.save();
  };

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };

  render() {
    console.log("aymen", localStorage.getItem("niveauid"));
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <button className="k-button" onClick={this.export}>
          Export to Excel
        </button>

        <ExcelExport
          data={data}
          group={group}
          fileName="Products.xlsx"
          ref={(exporter) => {
            this._exporter = exporter;
          }}
          filterable={true}
        >
          <ExcelExportColumn
            field="ProductID"
            title="Product ID"
            locked={true}
            width={200}
          />
          <ExcelExportColumn
            field="ProductName"
            title="Product Name"
            width={350}
          />
          <ExcelExportColumnGroup
            title="Availability"
            headerCellOptions={{ textAlign: "center" }}
          >
            <ExcelExportColumn
              field="UnitPrice"
              title="Price"
              cellOptions={{ format: "$#,##0.00" }}
              width={150}
              footerCellOptions={{ wrap: true, textAlign: "center" }}
              groupFooterCellOptions={{ textAlign: "right" }}
              groupFooter={CustomGroupFooter}
              footer={CustomFooter}
            />
            <ExcelExportColumn field="UnitsOnOrder" title="Units on Order" />
            <ExcelExportColumn field="UnitsInStock" title="Units in Stock" />
          </ExcelExportColumnGroup>
          <ExcelExportColumn
            field="Discontinued"
            title="Discontinued"
            hidden={true}
            groupHeader={CustomGroupHeader}
          />
        </ExcelExport>
        <button className="k-button" onClick={this.exportPDFWithComponent}>
          Export to PDF
        </button>
        <PDFExport
          ref={(component) => (this.pdfExportComponent = component)}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <Objective id={localStorage.getItem("niveauid")}></Objective>
        </PDFExport>
      </CSSTransitionGroup>
    );
  }
}

export default Objectives;
