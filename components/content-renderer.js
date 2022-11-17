import dynamic from 'next/dynamic'
const CodeBlock = dynamic(
  () => import('../components/code-block'),
  { ssr: false }
)
import {
  CONTENT_TYPE_CODE,
  CONTENT_TYPE_TITLE,
} from '../data/utils'
import styles from '../styles/shared.module.scss'

const ContentRenderer = ({ content }) => (
  <>
    {content.map((d, i) => (
      d.type === CONTENT_TYPE_CODE
        ? (
          <div key={i}>
            <CodeBlock code={d.content} />
            {d.endWithLineBreak && <div className={styles.lineBreak} />}
          </div>
        ) :
        d.type === CONTENT_TYPE_TITLE
          ? (
            <div className={styles.title} key={i}>{d.content}</div>
          ) : (
          <div className={styles.textContent} key={i}>
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
