import { ContainerProps } from '../types/containerProps.types'
import '../styles/ContainerStyles.css'
import React from 'react'
export const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="container container-border border-solid">
      {children}
    </div>
  )
}