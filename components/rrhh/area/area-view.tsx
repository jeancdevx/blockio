import { getAreas } from '@/db/queries'

import { columns } from './table/columns'
import DataTable from './table/data-table'

const AreaView = async () => {
  const areas = await getAreas()

  return <DataTable columns={columns} data={areas} />
}

export default AreaView
