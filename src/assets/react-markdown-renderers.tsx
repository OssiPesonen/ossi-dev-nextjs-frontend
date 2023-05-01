import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const ImageComponent = ({... props }) => {
  return (
    <figure className="image">
      <img src={ props.src } alt={ props.alt } width="1100" height="600" />
    </figure>
  )
}

export const LinkComponent = (props: { href: string, children?: any }) =>
  <a href={ props.href } target="_blank" rel="noopener">{ props.children }</a>

export const ParagraphComponent = (props: { children: Array<any> }): React.ReactElement => {
  const { children } = props

  if (children && children[ 0 ]
    && children.length === 1
    && children[ 0 ].props
    && children[ 0 ].props.src) { // rendering media without p wrapper

    return <>{ children }</>
  }

  return <p>{ children }</p>
}

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}

export const HeadingComponent = (props: { children: Array<any>, level: number }): React.ReactElement => {
  const { children } = props
  var text = children.reduce(flatten, '')
  var slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, {id: slug}, props.children)
}

export const CodeComponent = (props) => {
  const { language, value } = props;
  return (
    <SyntaxHighlighter language={ language } style={ materialOceanic }>
      { value }
    </SyntaxHighlighter>
  );
}
