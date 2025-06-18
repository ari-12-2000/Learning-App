export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse space-y-6">
      {/* Top metadata (title, doc tag) */}
      <div className="space-y-2">
        <div className="h-6 w-1/2 bg-gray-300 rounded" /> {/* Title */}
        <div className="h-4 w-32 bg-gray-200 rounded" /> {/* Doc badge */}
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Markdown Heading */}
        <div className="h-6 w-2/3 bg-gray-300 rounded" />

        {/* Paragraph */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        {/* Sub-heading */}
        <div className="h-5 w-1/3 bg-gray-300 rounded" />

        {/* List */}
        <div className="space-y-2 pl-4">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Code block */}
        <div className="h-48 bg-gray-800 rounded-md" />

        {/* Another section */}
        <div className="h-5 w-1/4 bg-gray-300 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
