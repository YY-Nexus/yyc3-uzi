"use client"
import { PageTransition } from "@/components/ui/page-transition"
import LearningPathGenerator from "@/components/learning/learning-path-generator"
import IntentRecognition from "@/components/learning/intent-recognition"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, MessageSquare, TrendingUp, BookOpen, Network } from "lucide-react"
import ProgressTracker from "@/components/learning/progress-tracker"
import KnowledgeBase from "@/components/learning/knowledge-base"
import ReasoningEngine from "@/components/learning/reasoning-engine"
import { EmotionAudioPlayer } from "@/components/audio/emotion-audio-player"
import KnowledgeGraph3D from "@/components/learning/knowledge-graph-3d"
import { useState } from "react"

export default function LearningPage() {
  const [currentEmotion, setCurrentEmotion] = useState<"happy" | "calm" | "sad" | "encouraging" | "default">(
    "encouraging",
  )

  const handleEmotionChange = (emotion: "happy" | "calm" | "sad" | "encouraging" | "default") => {
    setCurrentEmotion(emotion)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              智能学习中心
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于AI驱动的个性化学习体验，提升您的数据可视化技能
            </p>
            {/* Emotion Audio Player */}
            <div className="flex justify-center mt-4">
              <EmotionAudioPlayer emotion={currentEmotion} autoPlay={true} className="learning-ambient-sound" />
            </div>
          </div>

          {/* Learning Modules */}
          <Tabs defaultValue="knowledge-graph" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="knowledge-graph" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                知识图谱
              </TabsTrigger>
              <TabsTrigger value="learning-path" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                学习路径
              </TabsTrigger>
              <TabsTrigger value="intent-recognition" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                意图识别
              </TabsTrigger>
              <TabsTrigger value="reasoning-engine" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                推理引擎
              </TabsTrigger>
              <TabsTrigger value="progress-tracking" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                进度跟踪
              </TabsTrigger>
              <TabsTrigger value="knowledge-base" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                知识库
              </TabsTrigger>
            </TabsList>

            <TabsContent value="knowledge-graph">
              <KnowledgeGraph3D />
            </TabsContent>

            <TabsContent value="learning-path">
              <LearningPathGenerator />
            </TabsContent>

            <TabsContent value="intent-recognition">
              <IntentRecognition />
            </TabsContent>

            <TabsContent value="reasoning-engine">
              <ReasoningEngine />
            </TabsContent>

            <TabsContent value="progress-tracking">
              <ProgressTracker />
            </TabsContent>

            <TabsContent value="knowledge-base">
              <KnowledgeBase />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
