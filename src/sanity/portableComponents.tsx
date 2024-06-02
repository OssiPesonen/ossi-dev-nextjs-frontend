import { CodeComponent, HeadingComponent, ImageComponent, LinkComponent, ParagraphComponent } from "@/assets/react-markdown-renderers";
import { PortableTextReactComponents } from "@portabletext/react";

export const myPortableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ImageComponent,
      break: () => <hr />,
    },
    block: {
      h1: ({value, children}) => <HeadingComponent level={value.level}>{children}</HeadingComponent>,
      normal: ({children}) => <ParagraphComponent>{children}</ParagraphComponent>
    },
    marks: {
      link: ({ value, children }) => <LinkComponent href={value.href}>{children} </LinkComponent>,
      code: ({children}) => <CodeComponent>{children}</CodeComponent>,
    }
  };
  