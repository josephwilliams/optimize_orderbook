import Link from 'next/link'

import styles from '../styles/nav.module.scss'

const NAV_ITEMS = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Tests',
    url: '/tests',
  },
  {
    title: 'Optimizations',
    url: '/optimization',
  },
]

const Nav = () => {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navItemsContainer}>
        {NAV_ITEMS.map(({ title, url }) => (
          <Link href={url}>{title}</Link>
        ))}
      </div>
    </div>
  )
}


export default Nav
