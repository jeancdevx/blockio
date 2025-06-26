import { useMemo } from 'react'

interface ChartDataItem {
  areaId: string
  areaName: string
  activeOffers: number
  percentage: number
}

interface UseChartDataProps {
  areas: ChartDataItem[]
}

export function useChartData({ areas }: UseChartDataProps) {
  return useMemo(() => {
    const generateColors = (count: number) => {
      const baseColors = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)'
      ]

      if (count <= baseColors.length) {
        return baseColors.slice(0, count)
      }

      const colors = [...baseColors]
      for (let i = baseColors.length; i < count; i++) {
        const hue = ((i * 360) / count) % 360
        const saturation = 65 + (i % 3) * 10
        const lightness = 55 + (i % 4) * 5
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
      }

      return colors
    }

    const colors = generateColors(areas.length)

    const chartData = areas.map((item, index) => ({
      name: item.areaName,
      value: item.activeOffers,
      fill: colors[index],
      percentage: item.percentage
    }))

    const chartConfig = areas.reduce(
      (config, item, index) => {
        config[item.areaName] = {
          label: item.areaName,
          color: colors[index]
        }
        return config
      },
      {} as Record<string, { label: string; color: string }>
    )

    return {
      chartData,
      chartConfig
    }
  }, [areas])
}
