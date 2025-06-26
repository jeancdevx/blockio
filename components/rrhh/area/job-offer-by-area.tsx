import { getActiveJobOffersByArea } from '@/db/queries'

import JobOfferByAreaChart from './chart/job-offer-by-area-chart'

const JobOfferByArea = async () => {
  const data = await getActiveJobOffersByArea()

  return <JobOfferByAreaChart data={data} />
}

export default JobOfferByArea
