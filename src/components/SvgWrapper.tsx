import React, { ReactNode, ReactElement } from 'react'

interface Props {
  children: ReactNode;
}

/**
 * SvgWrapper Component
 *
 * A component for wrapping SVG elements and applying additional props.
 * Similar to https://react-svgr.com/playground/?typescript=true
 *
 * @param {Object} props - The component's props.
 * @param {ReactNode} props.children - The child element(s) to be wrapped.
 * @returns {ReactElement} - A new React element with merged props.
 */
const SvgWrapper: React.FC<Props> = ({ children, ...props }) => {
  // Create a new SVG element with the merged props
  const newSvg = React.cloneElement(
    React.Children.only(children) as ReactElement,
    props
  )
  return newSvg
}

export default SvgWrapper
