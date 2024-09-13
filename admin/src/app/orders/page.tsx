import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <DefaultLayout>
      <div>Orders</div>
    </DefaultLayout>
  )
  
}

export default Page