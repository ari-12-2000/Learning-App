export default function Loading() {
  return (
    <div className="flex min-h-screen bg-gray-50 animate-pulse">

      {/* Sidebar (ONLY xl like real UI) */}
      <aside className="hidden xl:block w-[220px] bg-white border-r">
        <div className="p-6 space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Price */}
          <div className="space-y-3">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-2 w-full bg-gray-200 rounded" />
            <div className="flex justify-between">
              <div className="h-3 w-10 bg-gray-200 rounded" />
              <div className="h-3 w-10 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Levels */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-3 w-28 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Ratings */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-7xl px-4 py-8 space-y-8">

          {/* Top right button */}
          <div className="flex justify-end">
            <div className="h-8 w-24 bg-gray-200 rounded" />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="h-8 w-56 bg-gray-200 rounded" />
            <div className="h-12 w-full max-w-2xl bg-gray-200 rounded-lg" />
          </div>

          {/* Count */}
          <div className="h-4 w-40 bg-gray-200 rounded" />

          {/* Grid */}
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-6 
            w-full
          ">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border rounded-xl p-4 space-y-4">

                {/* badges */}
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                {/* title */}
                <div className="h-6 w-3/4 bg-gray-200 rounded" />

                {/* description */}
                <div className="h-4 w-full bg-gray-200 rounded" />

                {/* instructor */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>

                {/* stats */}
                <div className="flex justify-between">
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>

                {/* progress */}
                <div className="space-y-2">
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                  <div className="h-2 w-full bg-gray-200 rounded-full" />
                </div>

                {/* button */}
                <div className="h-8 w-28 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}