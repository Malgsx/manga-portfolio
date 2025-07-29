"use client"

import type React from "react"

import { useState } from "react"
import MangaPanelLayout from "./manga-panel-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, ExternalLink, Code, Palette, Upload, Pencil } from "lucide-react"

export default function MangaShowcase() {
  const [showcaseImage, setShowcaseImage] = useState("/placeholder.svg?height=200&width=300")
  const [featuredTitle, setFeaturedTitle] = useState("FEATURED PROJECT")
  const [featuredDescription, setFeaturedDescription] = useState(
    "An immersive manga reading experience with advanced features and beautiful design",
  )
  const [isEditingCaption, setIsEditingCaption] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setShowcaseImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveCaption = () => {
    setIsEditingCaption(false)
  }

  const topPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center relative group">
      <div className="absolute inset-0 action-lines opacity-20"></div>
      <div className="relative z-10 max-w-4xl">
        <div className="flex items-start gap-2 mb-3">
          <h2 className="text-3xl md:text-4xl font-bold font-comic text-white">{featuredTitle}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-200 text-black mt-1"
            onClick={() => setIsEditingCaption(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-lg md:text-xl font-comic mb-6 text-white leading-relaxed">{featuredDescription}</p>
        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/Malgsx/manga-portfolio" target="_blank" rel="noopener noreferrer">
            <Button className="font-comic bg-white text-black hover:bg-gray-200 border-2 border-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Button>
          </a>
          <a href="https://github.com/Malgsx/manga-portfolio" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="font-comic bg-black text-white border-2 border-white hover:bg-white hover:text-black"
            >
              <Github className="mr-2 h-4 w-4" />
              SOURCE CODE
            </Button>
          </a>
        </div>
      </div>
    </div>
  )

  const leftPanelContent = (
    <div className="p-6 h-full flex flex-col group">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-comic mb-4 uppercase tracking-wider text-white">PROJECT DETAILS</h3>
        <div className="relative">
          <img
            src={showcaseImage || "/placeholder.svg"}
            alt="Manga Reader App"
            className="w-full h-48 object-cover border-4 border-white mb-4"
          />
          <div className="absolute inset-0 halftone-bg"></div>

          {/* Edit Image Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="absolute bottom-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-gray-200"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-comic">Update Showcase Image</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="showcase-image" className="font-comic">
                    Upload new image
                  </Label>
                  <Input id="showcase-image" type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {showcaseImage && (
                  <div className="grid gap-2">
                    <Label className="font-comic">Preview</Label>
                    <img
                      src={showcaseImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover border-2 border-gray-300 rounded"
                    />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <h4 className="font-bold font-comic mb-3 uppercase tracking-wide text-sm text-white">TECHNOLOGIES USED:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="font-comic font-bold tech-nextjs border-2">NEXT.JS</Badge>
            <Badge className="font-comic font-bold tech-typescript border-2">TYPESCRIPT</Badge>
            <Badge className="font-comic font-bold tech-tailwind border-2">TAILWIND CSS</Badge>
            <Badge className="font-comic font-bold tech-framer border-2">FRAMER MOTION</Badge>
          </div>
        </div>

        <div>
          <h4 className="font-bold font-comic mb-3 uppercase tracking-wide text-sm text-white">KEY FEATURES:</h4>
          <ul className="font-comic space-y-2 text-sm font-bold text-white">
            <li>• RESPONSIVE MANGA READER INTERFACE</li>
            <li>• BOOKMARK AND PROGRESS TRACKING</li>
            <li>• DARK/LIGHT MODE SUPPORT</li>
            <li>• OFFLINE READING CAPABILITIES</li>
            <li>• SOCIAL SHARING FEATURES</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const topRightPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
      <div className="absolute inset-0 halftone-bg"></div>
      <div className="relative z-10">
        <Code className="h-16 w-16 mb-4 stroke-[3px] text-white" />
        <h4 className="text-lg font-bold font-comic mb-2 uppercase tracking-wider text-white">CLEAN CODE</h4>
        <p className="font-comic text-sm font-semibold text-white">BUILT WITH MODERN BEST PRACTICES</p>
      </div>
    </div>
  )

  const bottomRightPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
      <div className="absolute inset-0 halftone-bg"></div>
      <div className="relative z-10">
        <Palette className="h-16 w-16 mb-4 stroke-[3px] text-white" />
        <h4 className="text-lg font-bold font-comic mb-2 uppercase tracking-wider text-white">BEAUTIFUL DESIGN</h4>
        <p className="font-comic text-sm font-semibold text-white">CRAFTED WITH ATTENTION TO DETAIL</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black p-8 rounded-3xl">
        <MangaPanelLayout
          topPanel={topPanelContent}
          leftPanel={leftPanelContent}
          topRightPanel={topRightPanelContent}
          bottomRightPanel={bottomRightPanelContent}
        />

        {/* Edit Caption Dialog */}
        <Dialog open={isEditingCaption} onOpenChange={setIsEditingCaption}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-comic">Edit Featured Project Caption</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-comic">
                  Title
                </Label>
                <Input
                  id="title"
                  value={featuredTitle}
                  onChange={(e) => setFeaturedTitle(e.target.value)}
                  className="font-comic"
                  placeholder="Enter project title..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="font-comic">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={featuredDescription}
                  onChange={(e) => setFeaturedDescription(e.target.value)}
                  className="min-h-[100px] font-comic"
                  placeholder="Enter project description..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingCaption(false)} className="font-comic">
                Cancel
              </Button>
              <Button onClick={handleSaveCaption} className="font-comic">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
