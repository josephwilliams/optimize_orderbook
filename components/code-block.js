import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({ code }) {
  return (
    <SyntaxHighlighter
      language={'javascript'}
      style={tomorrow}
      showLineNumbers={false}
    >
      {code}
    </SyntaxHighlighter>
  )
}
