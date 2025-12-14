"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/ui/animated-logo"
import { NetworkBackground } from "@/components/ui/network-background"
import { Heart, Settings, HelpCircle, MessageSquare, Mic, Smile } from "lucide-react"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"welcome" | "chat">("welcome")
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [breathingActive, setBreathingActive] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<
    Array<{ id: string; type: "user" | "assistant"; content: string; timestamp: Date }>
  >([])

  useEffect(() => {
    const sequence = async () => {
      if (logoAnimationComplete) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setTitleVisible(true)
        await new Promise((resolve) => setTimeout(resolve, 400))
        setSubtitleVisible(true)
        await new Promise((resolve) => setTimeout(resolve, 600))
        setBreathingActive(true)
      }
    }
    sequence()
  }, [logoAnimationComplete])

  useEffect(() => {
    const playWelcomeSound = () => {
      console.log("🎵 Playing warm welcome sound")
    }

    if (logoAnimationComplete) {
      playWelcomeSound()
    }
  }, [logoAnimationComplete])

  const handleEnterChat = () => {
    console.log("🎵 Playing transition sound")
    setCurrentView("chat")
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: chatInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "assistant" as const,
        content:
          "我是小Z，您的智能学习助手！我可以帮您进行数据可视化、学习路径规划和智能分析。请告诉我您想要了解什么？",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  if (currentView === "chat") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <NetworkBackground />

        <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="leading-7 tracking-normal text-xl font-semibold font-mono text-teal-100">
                  YYC³ EasyVizAI{" "}
                </h1>
                <p className="text-blue-200 text-sm">{""}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="pt-20 pb-32 px-4 min-h-screen flex flex-col">
          <div className="flex-1 max-w-4xl mx-auto w-full">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  
                  
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                          : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="请输入您的学习问题或需求..."
                  className="flex-1 bg-transparent placeholder-white/50 border-none outline-none px-2 py-1 text-primary-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="h-8 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full text-xs"
                >
                  发送
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 px-2">
                <div className="flex items-center space-x-4 text-xs text-white/50">
                  <span className="font-semibold">🎯 模式</span>
                  <span className="bg-white/10 px-2 py-1 rounded font-sans font-extrabold">快速回答</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-white/50">
                  <span className="font-bold font-sans">🤖 GPT-4</span>
                  <span className="font-sans font-bold">按 Enter 发送消息</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden cursor-pointer"
      onClick={handleEnterChat}
    >
      <NetworkBackground />

      <header className="fixed top-0 right-0 z-50 p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4 border-0 py-0 my-0">
          <div className="mb-12">
            <AnimatedLogo onAnimationComplete={() => setLogoAnimationComplete(true)} />
          </div>

          <div
            className={`transition-all duration-1000 delay-300 transform ${
              titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-8">
              <p className="text-2xl md:text-3xl text-cyan-300 font-sans font-semibold border-0 my-0 py-5 px-0">
                <Heart className="inline h-6 w-6 text-pink-400 mr-3 animate-pulse" />
                YYC³ EasyVizAI
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 transform py-0 ${
              subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance">
              
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-pretty italic mb-16 font-semibold py-9 text-teal-300">
              All Realms Converge at Cloud Nexus, DeepStack Ignites a New Era
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 transform ${
              breathingActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          ></div>
        </div>
      </section>
    </div>
  )
}
