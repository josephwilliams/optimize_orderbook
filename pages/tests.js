import Page from '../components/page'
import { CONTENT_TYPE_CODE, TEST_PAGE_CONTENT } from '../data'

export default function TestPage() {
  return (
    <Page
      content={TEST_PAGE_CONTENT}
      title={'Accelerate Challenge - tests'}
    />
  )
}
