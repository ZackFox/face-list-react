import React from "react";

interface Props {
  loading: boolean;
  children: JSX.Element;
}

const WithLoading:
  | React.FunctionComponent<Props>
  | React.ComponentClass<Props> = ({ loading, ...props }) => {
  return loading ? <div>...загрузка...</div> : props.children;
};

export default WithLoading;
