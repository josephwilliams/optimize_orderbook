import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navItemsContainer}>
        {NAV_ITEMS.map(({ title, url }) => {
          const isActive = router.pathname === url
          return (
            <Link
              href={url}
              className={classnames(
                styles.link,
                isActive && styles.linkActive,
              )}
              key={title}
            >
              {title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}


export default Nav
