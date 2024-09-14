import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <DefaultLayout>
      <div>Stocks</div>
    </DefaultLayout>
  )
  
}

export default Page