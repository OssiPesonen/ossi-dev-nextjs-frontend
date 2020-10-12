export const ImageComponent = (props: { src: string, alt: string}) => {
  return (
    <figure className="image">
      <img src={ props.src } alt={ props.alt }/>
    </figure>
  )
}

export const ParagraphComponent = (props: { children: Array<any>}): React.ReactElement => {
  const { children } = props

  if (children && children[ 0 ]
    && children.length === 1
    && children[ 0 ].props
    && children[ 0 ].props.src) { // rendering media without p wrapper

    return <>{ children }</>
  }

  return <p>{ children }</p>
}