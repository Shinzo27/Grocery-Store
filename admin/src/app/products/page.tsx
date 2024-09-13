import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <DefaultLayout>
      <div>Products</div>
    </DefaultLayout>
  )
  
}

export default Page