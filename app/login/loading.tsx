export default function Loading() {
  return (
    <div className="min-h-screen flex animate-pulse">

      {/* LEFT SIDE (branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-10 flex-col justify-center space-y-6">
        <div className="h-8 w-40 bg-white/30 rounded" />
        <div className="h-6 w-64 bg-white/20 rounded" />
        <div className="space-y-3 mt-6">
          <div className="h-4 w-48 bg-white/20 rounded" />
          <div className="h-4 w-56 bg-white/20 rounded" />
          <div className="h-4 w-40 bg-white/20 rounded" />
        </div>
      </div>

      {/* RIGHT SIDE (form) */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6">

          {/* Heading */}
          <div className="space-y-2 text-center">
            <div className="h-6 w-32 mx-auto bg-gray-300 rounded" />
            <div className="h-4 w-48 mx-auto bg-gray-200 rounded" />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 justify-center">
            <div className="h-8 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-20 bg-gray-200 rounded" />
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-300 rounded" />

          {/* OR Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-[1px] bg-gray-200" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* Google Button Skeleton */}
          <div className="h-10 w-full bg-gray-200 rounded flex items-center justify-center gap-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>

          {/* Footer */}
          <div className="h-4 w-32 mx-auto bg-gray-200 rounded" />
        </div>
      </div>

    </div>
  )
}