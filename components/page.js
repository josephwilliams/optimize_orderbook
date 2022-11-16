import Head from 'next/head'
import Nav from './nav'
import styles from '../styles/shared.module.scss'

const Page = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>Accelerate Challenge</title>
        <meta name="descriptrion" content="Accelerate Challenge" />
      </Head>
      <Nav />
    </div>
  )
}

export default Page
