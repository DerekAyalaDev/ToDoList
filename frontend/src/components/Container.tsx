import { ContainerProps } from '../types/containerProps.types'
import '../styles/ContainerStyles.css'
export const Container = (props: ContainerProps) => {
  return (
    <div className="container container-border border-solid">
      {props.children}
    </div>
  )
}