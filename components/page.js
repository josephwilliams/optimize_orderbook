import Head from 'next/head'
import Nav from './nav'
import ContentRenderer from './content-renderer'
import styles from '../styles/shared.module.scss'

const Page = ({ children, content, title }) => {
  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Accelerate Challenge" />
      </Head>
      <Nav />
      {title && (
        <main className={styles.main}>
          {false && (
            <h1 className={styles.title}>
              {'Accelerate Challenge'}
            </h1>
          )}
        </main>
      )}
      <div className={styles.pageContentWrapper}>
        <ContentRenderer content={content} />
      </div>
    </div>
  )
}

export default Page
