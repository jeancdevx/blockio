'use client'

import { Pie, PieChart } from 'recharts'

import { useChartData } from '@/hooks/use-chart-data'
import { useIsMobile } from '@/hooks/use-mobile'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

interface AreaData {
  areaId: string
  areaName: string
  activeOffers: number
  percentage: number
}

const JobOfferByAreaChart = ({
  data
}: {
  data: { areas: AreaData[]; total: number }
}) => {
  const { chartData, chartConfig } = useChartData({ areas: data.areas })
  const isMobile = useIsMobile()

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Ofertas Laborales Activas por Área</CardTitle>
        <CardDescription>
          Total de ofertas activas:{' '}
          <span className='font-semibold'>{data.total}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        {data.total > 0 ? (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[300px] w-full'
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />

              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                labelLine={true}
                label={({ name, percentage }) =>
                  `${isMobile ? '' : name} ${percentage}%`
                }
              />

              <ChartLegend
                content={<ChartLegendContent nameKey='name' />}
                className='flex-wrap gap-4 *:justify-center'
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className='text-muted-foreground flex h-[400px] items-center justify-center'>
            <p>No hay ofertas laborales activas en este momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default JobOfferByAreaChart
