import Page from '../components/page'
import { CONTENT_TYPE_CODE, HOME_PAGE_CONTENT } from '../data'

export default function LandingPage() {
  return (
    <Page
      content={HOME_PAGE_CONTENT}
      title={'Accelerate Challenge'}
    />
  )
}
