export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-7 w-48 bg-white/[0.06] rounded-lg" />
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white/[0.06] rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-white/[0.06] rounded-xl" />
    </div>
  )
}