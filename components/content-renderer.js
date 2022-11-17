import dynamic from 'next/dynamic'
const CodeBlock = dynamic(
  () => import('../components/code-block'),
  { ssr: false }
)
import { CONTENT_TYPE_CODE } from '../data/utils'
import styles from '../styles/shared.module.scss'

const ContentRenderer = ({ content }) => (
  <>
    {content.map(d => (
      d.type === CONTENT_TYPE_CODE
        ? (
          <>
            <CodeBlock code={d.content} />
            {d.endWithLineBreak && <div className={styles.lineBreak} />}
          </>
        ) : (
          <div className={styles.textContent}>
            <div className={styles.textTitle}>
              {d.title}
            </div>
            {d.content}
            {d.endWithLineBreak && <div className={styles.lineBreak} />}
          </div>
        )
    ))}
  </>
)

export default ContentRenderer
