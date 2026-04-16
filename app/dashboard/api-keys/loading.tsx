export default function Loading() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-white/[0.06] rounded-xl" />
      ))}
    </div>
  )
}