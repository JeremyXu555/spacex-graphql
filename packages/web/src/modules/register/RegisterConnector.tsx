import * as React from "react";
// import RegisterView from "./ui/RegisterView";
import { RouteComponentProps } from "react-router-dom";
import { RegisterController } from "@jxu/controller";

export interface IRegisterConnectorProps {
}

export class RegisterConnector extends React.PureComponent<
  RouteComponentProps<{}>
  > {

  public render() {
    return (
      <div>
        <RegisterController />
      </div>
    );
  }
}
