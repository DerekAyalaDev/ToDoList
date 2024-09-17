import { ContainerProps } from "../types/containerProps.types";
import "../styles/ContainerStyles.css";

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container container-border border-solid">{children}</div>
  );
};
