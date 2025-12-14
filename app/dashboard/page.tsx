"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { SidebarNavigation } from "@/components/navigation/sidebar-navigation"
import { DataCard } from "@/components/ui/data-card"
import { AIInsightPanel } from "@/components/ui/ai-insight-panel"
import { AnimatedBackground } from "@/components/ui/animated-background"
import { BarChart3, Brain, FileText, TrendingUp } from "lucide-react"
import { ChartRenderer } from "@/components/charts/chart-renderer"
import { DataProcessor } from "@/components/data/data-processor"
import { PersonalizedRecommender } from "@/components/ai/personalized-recommender"
import { VisualizationCanvas } from "@/components/charts/visualization-canvas" // Import VisualizationCanvas

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview")
  const [processedData, setProcessedData] = useState<any>(null)
  const [isRealTimeActive, setIsRealTimeActive] = useState(true)
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())

  const playInteractionSound = () => {
    if (typeof window !== "undefined") {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  useEffect(() => {
    if (isRealTimeActive) {
      const interval = setInterval(() => {
        setLastUpdateTime(new Date())
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isRealTimeActive])

  const keyMetrics = [
    { label: "数据点", value: "10", color: "text-blue-600" },
    { label: "渲染精度", value: "98%", color: "text-green-600" },
    { label: "生成时间", value: "1.2s", color: "text-blue-600" },
  ]

  const optimizationSuggestions = [
    {
      type: "warning",
      title: "数据处理量异常增长",
      description: "建议优化资源配置",
      impact: "medium",
    },
    {
      type: "success",
      title: "性能优化建议",
      description: "建议启用缓存机制，可提升图表渲染速度40%",
      impact: "high",
      metric: "高影响响应 91%",
    },
  ]

  const quickActions = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "创建图表",
      description: "快速创建新的数据可视化",
      color: "bg-blue-500",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI 分析",
      description: "启动智能数据分析",
      color: "bg-purple-500",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "生成报告",
      description: "自动生成分析报告",
      color: "bg-green-500",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "趋势预测",
      description: "基于历史数据预测趋势",
      color: "bg-orange-500",
    },
  ]

  const dashboardStats = [
    {
      title: "总用户数",
      description: "平台注册用户",
      value: "2,847",
      trend: "up",
      trendValue: "+12%",
      progress: 85,
      status: "active",
    },
    {
      title: "活跃项目",
      description: "正在进行的项目",
      value: "156",
      trend: "up",
      trendValue: "+8%",
      progress: 72,
      status: "processing",
    },
    {
      title: "生成图表",
      description: "本月生成图表数",
      value: "8,924",
      trend: "up",
      trendValue: "+23%",
      progress: 94,
      status: "completed",
    },
    {
      title: "AI 推荐",
      description: "智能推荐采纳率",
      value: "87.3%",
      trend: "stable",
      trendValue: "稳定",
      progress: 87,
      status: "active",
    },
  ]

  const recentInsights = [
    {
      id: "1",
      type: "trend",
      title: "用户增长趋势",
      description: "过去30天用户增长率达到23%，主要来源于企业用户",
      confidence: 94,
      impact: "high",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "anomaly",
      title: "异常数据检测",
      description: "检测到周末数据处理量异常增长，建议优化资源配置",
      confidence: 89,
      impact: "medium",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "recommendation",
      title: "性能优化建议",
      description: "建议启用缓存机制，可提升图表渲染速度40%",
      confidence: 91,
      impact: "high",
      timestamp: new Date(),
    },
  ]

  const handleDataProcessed = (data: any) => {
    setProcessedData(data)
    setActiveView("visualization")
    playInteractionSound()
  }

  const handleViewChange = (view: string) => {
    setActiveView(view)
    playInteractionSound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative">
      <AnimatedBackground />

      <SidebarNavigation currentPath="/dashboard" />

      {/* Main Content */}
      <div className="ml-64 relative z-10">
        <div className="p-6 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-8">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/60 rounded-lg p-4 max-w-sm">
              <div className="text-sm text-gray-600 mb-2">优化建议</div>
              {optimizationSuggestions.map((suggestion, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="flex items-center space-x-2">
                    {suggestion.type === "success" && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                    {suggestion.type === "warning" && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                    <span className="text-sm font-medium">{suggestion.title}</span>
                    {suggestion.metric && (
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.metric}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              ))}
            </div>
          </div>
          {activeView === "overview" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                  <DataCard
                    key={index}
                    title={stat.title}
                    description={stat.description}
                    value={stat.value}
                    trend={stat.trend}
                    trendValue={stat.trendValue}
                    progress={stat.progress}
                    status={stat.status}
                  />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Visualization Canvas */}
                <div className="lg:col-span-2">
                  <VisualizationCanvas />
                </div>

                {/* AI Insights */}
                <div className="lg:col-span-1">
                  <AIInsightPanel insights={recentInsights} />
                </div>
              </div>
            </>
          )}

          {activeView === "data" && (
            <div className="space-y-8">
              <DataProcessor onDataProcessed={handleDataProcessed} />
            </div>
          )}

          {activeView === "visualization" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartRenderer
                  title="销售趋势分析"
                  description="基于处理后的数据生成"
                  type="line"
                  aiRecommendation="建议使用折线图展示时间序列数据，能更好地显示趋势变化"
                />
                <ChartRenderer
                  title="用户分布统计"
                  description="用户数据可视化"
                  type="bar"
                  aiRecommendation="柱状图适合比较不同类别的数值大小"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartRenderer
                  title="转化率分析"
                  description="各月份转化率对比"
                  type="pie"
                  aiRecommendation="饼图可以清晰展示各部分占总体的比例关系"
                />
                <ChartRenderer
                  title="销售额与用户数关系"
                  description="散点图分析相关性"
                  type="scatter"
                  aiRecommendation="散点图有助于发现两个变量之间的相关性"
                />
              </div>
            </div>
          )}

          {activeView === "ai-recommendations" && (
            <div className="space-y-8">
              <PersonalizedRecommender />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
