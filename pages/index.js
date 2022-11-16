import dynamic from 'next/dynamic'
const CodeBlock = dynamic(
  () => import('../components/code-block'),
  { ssr: false }
)
import Page from '../components/page'
import data, { CONTENT_TYPE_CODE } from '../data/home-page-content'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <Page className={styles.container}>
      <main className={styles.main}>
        {false && (
          <h1 className={styles.title}>
            {'Accelerate Challenge'}
          </h1>
        )}

        {data.map(d => (
          d.type === CONTENT_TYPE_CODE
            ? (
              <CodeBlock code={d.content} />
            ) : (
              <div className={styles.textContent}>
                {d.content}
              </div>
            )
        ))}
      </main>
    </Page>
  )
}
