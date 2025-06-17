"use client"

import { useState } from "react"
import { Search, ChevronDown, BookOpen, Code, Server, Database, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DocsSidebarProps {
  activeDoc: string
  setActiveDoc: (doc: string) => void
}

export function DocsSidebar({ activeDoc, setActiveDoc }: DocsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "getting-started": true,
    "core-concepts": true,
    "advanced-topics": false,
    "api-reference": false,
    deployment: false,
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    })
  }

  const docsCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: BookOpen,
      items: [
        { id: "getting-started", name: "Introduction" },
        { id: "installation", name: "Installation" },
        { id: "project-structure", name: "Project Structure" },
      ],
    },
    {
      id: "core-concepts",
      name: "Core Concepts",
      icon: Code,
      items: [
        { id: "html-basics", name: "HTML Basics" },
        { id: "css-fundamentals", name: "CSS Fundamentals" },
        { id: "javascript-essentials", name: "JavaScript Essentials" },
        { id: "responsive-design", name: "Responsive Design" },
      ],
    },
    {
      id: "advanced-topics",
      name: "Advanced Topics",
      icon: Server,
      items: [
        { id: "javascript-frameworks", name: "JavaScript Frameworks" },
        { id: "state-management", name: "State Management" },
        { id: "performance-optimization", name: "Performance Optimization" },
        { id: "testing-strategies", name: "Testing Strategies" },
      ],
    },
    {
      id: "api-reference",
      name: "API Reference",
      icon: Database,
      items: [
        { id: "rest-apis", name: "REST APIs" },
        { id: "graphql", name: "GraphQL" },
        { id: "authentication", name: "Authentication" },
        { id: "data-fetching", name: "Data Fetching" },
      ],
    },
    {
      id: "deployment",
      name: "Deployment",
      icon: Shield,
      items: [
        { id: "deployment-options", name: "Deployment Options" },
        { id: "continuous-integration", name: "Continuous Integration" },
        { id: "monitoring", name: "Monitoring" },
        { id: "security-best-practices", name: "Security Best Practices" },
      ],
    },
  ]

  // Filter docs based on search query
  const filteredDocs = searchQuery
    ? docsCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0)
    : docsCategories

  return (
    <div className="w-64 border-r bg-white hidden md:block overflow-y-auto">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search docs..."
            className="pl-8 h-9 w-full bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="py-4">
        {filteredDocs.map((category) => (
          <div key={category.id} className="mb-2">
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                <category.icon className="h-4 w-4 mr-2 text-gray-500" />
                <span>{category.name}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expandedCategories[category.id] ? "transform rotate-180" : ""}`}
              />
            </button>

            {expandedCategories[category.id] && (
              <div className="mt-1 ml-4 pl-4 border-l border-gray-200">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    className={cn(
                      "block w-full text-left px-2 py-1.5 text-sm rounded-md",
                      activeDoc === item.id
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                    onClick={() => setActiveDoc(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
