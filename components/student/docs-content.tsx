"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocsContentProps {
  activeDoc: string
}

export function DocsContent({ activeDoc }: DocsContentProps) {
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  // Scroll to section when activeSection changes
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [activeSection])

  // Sample documentation content
  const docsContent = {
    "getting-started": {
      title: "Introduction",
      description: "Welcome to the EduPortal documentation. This guide will help you get started with our platform.",
      sections: [
        {
          id: "overview",
          title: "Overview",
          content: `
            <p>EduPortal is a comprehensive learning management system designed to provide an engaging and effective educational experience. Our platform offers a wide range of features to support both learners and educators.</p>
            <p>This documentation will guide you through the various aspects of the platform, from basic navigation to advanced customization options.</p>
          `,
        },
        {
          id: "key-features",
          title: "Key Features",
          content: `
            <ul>
              <li><strong>Interactive Courses</strong> - Engage with multimedia content and interactive exercises</li>
              <li><strong>Progress Tracking</strong> - Monitor your learning journey with detailed progress metrics</li>
              <li><strong>Assessments</strong> - Test your knowledge with various quiz formats</li>
              <li><strong>Certificates</strong> - Earn certificates upon course completion</li>
              <li><strong>Community</strong> - Connect with fellow learners and instructors</li>
            </ul>
          `,
        },
        {
          id: "getting-help",
          title: "Getting Help",
          content: `
            <p>If you need assistance while using EduPortal, there are several ways to get help:</p>
            <ul>
              <li>Check the documentation (you're here!)</li>
              <li>Use the search function to find specific topics</li>
              <li>Contact support through the Help Center</li>
              <li>Join our community forums to connect with other users</li>
            </ul>
          `,
        },
      ],
      codeExample: {
        language: "javascript",
        title: "Example API Usage",
        code: `// Initialize the EduPortal client
const eduportal = new EduPortal({
  apiKey: 'your-api-key',
  userId: 'current-user-id'
});

// Get user's enrolled courses
const courses = await eduportal.getCourses();

// Track course progress
await eduportal.trackProgress({
  courseId: 'course-123',
  moduleId: 'module-456',
  completed: true
});`,
      },
    },
    installation: {
      title: "Installation",
      description: "Learn how to install and set up EduPortal for your organization.",
      sections: [
        {
          id: "requirements",
          title: "System Requirements",
          content: `
            <p>Before installing EduPortal, ensure your system meets the following requirements:</p>
            <ul>
              <li>Node.js 14.x or higher</li>
              <li>MongoDB 4.4 or higher</li>
              <li>At least 2GB of RAM</li>
              <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            </ul>
          `,
        },
        {
          id: "installation-steps",
          title: "Installation Steps",
          content: `
            <p>Follow these steps to install EduPortal:</p>
            <ol>
              <li>Clone the repository from GitHub</li>
              <li>Install dependencies using npm or yarn</li>
              <li>Configure your environment variables</li>
              <li>Set up your database</li>
              <li>Start the application</li>
            </ol>
          `,
        },
      ],
      codeExample: {
        language: "bash",
        title: "Installation Commands",
        code: `# Clone the repository
git clone https://github.com/eduportal/eduportal.git

# Navigate to the project directory
cd eduportal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the application
npm run dev`,
      },
    },
    // Add more documentation content for other sections as needed
  }

  // Get content for the active doc
  const content = docsContent[activeDoc as keyof typeof docsContent] || docsContent["getting-started"]

  const handleCopyCode = () => {
    if (content.codeExample) {
      navigator.clipboard.writeText(content.codeExample.code)
      setCopied(true)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Docs</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">{content.title}</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{content.description}</p>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">On this page</h2>
        <ul className="space-y-2">
          {content.sections.map((section) => (
            <li key={section.id}>
              <button className="text-sm text-blue-600 hover:underline" onClick={() => setActiveSection(section.id)}>
                {section.title}
              </button>
            </li>
          ))}
          {content.codeExample && (
            <li>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setActiveSection("code-example")}
              >
                {content.codeExample.title}
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Content Sections */}
      <div className="prose max-w-none">
        {content.sections.map((section) => (
          <div key={section.id} id={section.id} className="mb-8 scroll-mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        ))}

        {/* Code Example */}
        {content.codeExample && (
          <div id="code-example" className="mb-8 scroll-mt-16">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{content.codeExample.title}</h2>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={handleCopyCode}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>
                <code>{content.codeExample.code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
