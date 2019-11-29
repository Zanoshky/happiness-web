import React, { ComponentProps } from "react";
import "./BlockData.css";

interface IProps extends ComponentProps<any> {
  name?: string;
  value?: number;
}

const BlockData = (props: IProps) => {
  return (
    <div className={"bD"}>
      <div className={"bDTop"}>{props.name || ""}</div>
      <div className="bDData">{props.value || ""}</div>
    </div>
  );
};

export default BlockData;
