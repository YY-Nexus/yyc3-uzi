"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NavigationBar } from "@/components/navigation/navigation-bar"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { BarChart3, PieChart, LineChart, TrendingUp, ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import { IntelligentInsights } from "@/components/ai/intelligent-insights"

export default function AnalyticsPage() {
  const [selectedChart, setSelectedChart] = useState("bar")
  const [timeRange, setTimeRange] = useState("7d")

  const chartTypes = [
    {
      id: "bar",
      name: "柱状图",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "适合比较不同类别的数据",
    },
    {
      id: "pie",
      name: "饼图",
      icon: <PieChart className="h-5 w-5" />,
      description: "展示数据的组成比例",
    },
    {
      id: "line",
      name: "折线图",
      icon: <LineChart className="h-5 w-5" />,
      description: "显示数据随时间的变化趋势",
    },
    {
      id: "trend",
      name: "趋势图",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "预测和分析数据趋势",
    },
  ]

  const timeRanges = [
    { id: "1d", label: "今天" },
    { id: "7d", label: "7天" },
    { id: "30d", label: "30天" },
    { id: "90d", label: "90天" },
  ]

  const handleInsightAction = (insight: any) => {
    if (insight.type === "recommendation" && insight.data?.chartType) {
      setSelectedChart(insight.data.chartType)
    }
    if (insight.type === "trend" && insight.data?.trend === "upward") {
      setTimeRange("30d") // Expand time range for better trend analysis
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted relative">
      <AnimatedBackground />

      <NavigationBar />

      <div className="lg:ml-64 relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回首页
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">数据分析</h1>
                  <p className="text-sm text-muted-foreground">智能图表生成与数据洞察</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Analytics Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Chart Type Selection */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground mb-3">图表类型</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {chartTypes.map((chart) => (
                  <Button
                    key={chart.id}
                    variant={selectedChart === chart.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart(chart.id)}
                    className="justify-start"
                  >
                    {chart.icon}
                    <span className="ml-2">{chart.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Range Selection */}
            <div className="flex-shrink-0">
              <h3 className="text-sm font-medium text-foreground mb-3">时间范围</h3>
              <div className="flex gap-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={timeRange === range.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range.id)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Preview */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">图表预览</h2>
              <Badge variant="secondary">
                {chartTypes.find((c) => c.id === selectedChart)?.name} -{" "}
                {timeRanges.find((r) => r.id === timeRange)?.label}
              </Badge>
            </div>

            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                {chartTypes.find((c) => c.id === selectedChart)?.icon}
                <p className="text-muted-foreground mt-2">
                  {chartTypes.find((c) => c.id === selectedChart)?.description}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  时间范围: {timeRanges.find((r) => r.id === timeRange)?.label}
                </p>
              </div>
            </div>
          </div>

          {/* Intelligent Insights */}
          <div className="mb-8">
            <IntelligentInsights
              selectedChart={selectedChart}
              timeRange={timeRange}
              onInsightAction={handleInsightAction}
            />
          </div>

          {/* AI Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">AI 推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InteractiveCard
                title="优化建议"
                description="建议使用折线图展示时间序列数据，可更好地显示趋势变化"
                icon={<TrendingUp className="h-6 w-6" />}
                hoverEffect="glow"
                onClick={() => setSelectedChart("line")}
              >
                <Badge variant="outline" className="text-xs mt-2">
                  置信度: 92%
                </Badge>
              </InteractiveCard>

              <InteractiveCard
                title="数据洞察"
                description="检测到周期性模式，建议扩展时间范围至30天以获得更准确的分析"
                icon={<Calendar className="h-6 w-6" />}
                hoverEffect="glow"
                onClick={() => setTimeRange("30d")}
              >
                <Badge variant="outline" className="text-xs mt-2">
                  置信度: 87%
                </Badge>
              </InteractiveCard>

              <InteractiveCard
                title="性能提示"
                description="当前数据量适合实时渲染，预计加载时间 < 2秒"
                icon={<BarChart3 className="h-6 w-6" />}
                hoverEffect="glow"
              >
                <Badge variant="outline" className="text-xs mt-2">
                  性能评分: A+
                </Badge>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
