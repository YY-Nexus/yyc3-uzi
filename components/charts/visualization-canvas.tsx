"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react"

interface VisualizationCanvasProps {
  title?: string
  children?: React.ReactNode
}

export function VisualizationCanvas({ title = "可视化画布", children }: VisualizationCanvasProps) {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50))

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-white/70 min-w-[3rem] text-center">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0 text-white hover:bg-white/10">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/10">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/10">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="min-h-[400px] bg-white/5 rounded-lg p-4 flex items-center justify-center"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
        >
          {children || (
            <div className="text-center text-white/50">
              <p>可视化内容将在此处显示</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
