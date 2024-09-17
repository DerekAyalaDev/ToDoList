import { ContainerProps } from "../types/containerProps.types";
import "../styles/ContainerStyles.css";

/**
 * A reusable container component that wraps child elements.
 * Applies standard container styles and borders.
 *
 * @param {ContainerProps} children - The child components to render inside the container.
 */
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container container-border border-solid">{children}</div>
  );
};

