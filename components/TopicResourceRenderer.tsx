"use client"
import Loading from "@/app/courses/[programId]/[moduleId]/[topicId]/loading"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"


export default function TopicResourceRenderer({ resource }: { resource: any }) {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)

  useEffect(() => {
    if (resource.resourceType === "document") {
      fetch(resource.url)
        .then((res) => res.text())
        .then((text) => setMarkdownContent(text))
        .catch((err) => {
          console.error("Failed to fetch markdown:", err);
          throw new Error();
        })
    }
  }, [resource])

  if (resource.resourceType === "document") {
    return (
      <div className="prose max-w-none">
        {markdownContent ? (
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        ) : (
          <Loading />
        )}
      </div>
    )
  }

  if (resource.resourceType === "video") {
    return (
      <div className="w-full">
        <video controls className="w-full max-h-[80vh] rounded shadow" src={resource.url}>
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  if (resource.resourceType === "image") {
    return (
      <div className="w-full flex justify-center">
        <img src={resource.url} alt="Resource" className="max-w-full max-h-[80vh] rounded shadow" />
      </div>
    )
  }

  return (
    <div className="text-muted-foreground">
      Unsupported resource type: {resource.resourceType}
    </div>
  )
}
