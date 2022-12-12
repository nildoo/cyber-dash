import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { SyntaxHighlightProps } from '../@types/cyber'

export const SyntaxHighlight: React.FC<SyntaxHighlightProps> = ({ children, ...others }) => {
  return (
    <SyntaxHighlighter
      language="javacript"
      showLineNumbers
      style={a11yDark}
      {...others}
    >
      {children}
    </SyntaxHighlighter>
  )
}
