export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-white">

      {/* HERO CAROUSEL */}
      <div className="w-full h-[70vh] sm:h-[80vh] md:h-screen max-h-[700px] bg-black/10" />

      {/* CATEGORIES */}
      <div className="py-16 px-4 space-y-8">
        <div className="h-8 w-64 bg-black/10 rounded mx-auto" />
        <div className="h-4 w-96 bg-black/10 rounded mx-auto" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-black/10 rounded-xl" />
          ))}
        </div>
      </div>

      {/* COURSES */}
      <div className="py-16 px-4 bg-slate-100 space-y-8">
        <div className="h-8 w-64 bg-black/10 rounded" />
        <div className="h-4 w-96 bg-black/10 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl space-y-3">
              <div className="h-4 w-20 bg-black/10 rounded" />
              <div className="h-5 w-3/4 bg-black/10 rounded" />
              <div className="h-3 w-full bg-black/10 rounded" />
              <div className="h-3 w-1/2 bg-black/10 rounded" />
              <div className="h-6 w-24 bg-black/10 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}