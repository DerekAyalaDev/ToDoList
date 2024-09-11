import { ContainerProps } from "../types/ContainerTypes"
import '../styles/ContainerStyles.css'
export const Container = (props: ContainerProps) => {
  return (
    <div className="container">
      {props.children}
    </div>
  )
}