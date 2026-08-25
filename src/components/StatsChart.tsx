import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataPoint { year: string; publications: number; projects: number }

const data: DataPoint[] = [
  { year: '2019', publications: 0, projects: 0 },
  { year: '2020', publications: 0, projects: 0 },
  { year: '2021', publications: 0, projects: 0 },
  { year: '2022', publications: 0, projects: 0 },
  { year: '2023', publications: 0, projects: 1 },
  { year: '2024', publications: 0, projects: 1 },
  { year: '2025', publications: 0, projects: 2 },
  { year: '2026', publications: 0, projects: 2 },
]

export default function StatsChart({ title = 'Producción Científica' }: { title?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const margin = { top: 20, right: 20, bottom: 40, left: 44 }
    const width  = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    svg.selectAll('*').remove()
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand().domain(data.map((d) => d.year)).range([0, width]).padding(0.4)
    const y = d3.scaleLinear().domain([0, 65]).range([height, 0])

    g.append('g').call(
      d3.axisLeft(y).tickSize(-width).tickFormat(() => '').ticks(5)
    )
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick line').attr('stroke', 'rgba(14,154,147,0.1)').attr('stroke-dasharray', '4,4'))

    g.selectAll('.bar-pub').data(data).join('rect')
      .attr('x', (d) => x(d.year)!).attr('width', x.bandwidth() / 2)
      .attr('y', height).attr('height', 0).attr('fill', '#0e9a93').attr('opacity', 0.8).attr('rx', 2)
      .transition().duration(900).delay((_, i) => i * 80)
      .attr('y', (d) => y(d.publications)).attr('height', (d) => height - y(d.publications))

    g.selectAll('.bar-proj').data(data).join('rect')
      .attr('x', (d) => x(d.year)! + x.bandwidth() / 2).attr('width', x.bandwidth() / 2)
      .attr('y', height).attr('height', 0).attr('fill', '#2878b0').attr('opacity', 0.7).attr('rx', 2)
      .transition().duration(900).delay((_, i) => i * 80 + 80)
      .attr('y', (d) => y(d.projects)).attr('height', (d) => height - y(d.projects))

    const line = d3.line<DataPoint>()
      .x((d) => x(d.year)! + x.bandwidth() / 4).y((d) => y(d.publications)).curve(d3.curveMonotoneX)
    const path = g.append('path').datum(data)
      .attr('fill', 'none').attr('stroke', '#d6780a').attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,3').attr('d', line)
    const len = (path.node() as SVGPathElement).getTotalLength()
    path.attr('stroke-dashoffset', len).attr('stroke-dasharray', len)
      .transition().duration(1400).attr('stroke-dashoffset', 0)

    g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickSize(0))
      .call((g) => g.select('.domain').attr('stroke', 'var(--surface-2)'))
      .call((g) => g.selectAll('text').attr('fill', 'var(--fg-muted)').attr('font-family', 'JetBrains Mono, monospace').attr('font-size', '10').attr('dy', '1.2em'))

    g.append('g').call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('text').attr('fill', 'var(--fg-muted)').attr('font-family', 'JetBrains Mono, monospace').attr('font-size', '10'))
      .call((g) => g.selectAll('.tick line').remove())
  }, [])

  return (
    <div className="rounded-xl p-4 h-64 relative" style={{ background: 'var(--surface)', border: '1px solid var(--surface-2)' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-display text-xs tracking-widest" style={{ color: 'var(--fg-muted)' }}>
          {title.toUpperCase()}
        </p>
        <div className="flex gap-4">
          {[{ label: 'Publicaciones', color: '#0e9a93' }, { label: 'Proyectos', color: '#2878b0' }, { label: 'Tendencia', color: '#d6780a' }].map((l) => (
            <span key={l.label} className="flex items-center gap-1 text-xs font-display" style={{ color: 'var(--fg-muted)' }}>
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: 'calc(100% - 2rem)' }} />
    </div>
  )
}
