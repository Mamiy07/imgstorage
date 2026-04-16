export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-2 animate-pulse">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="aspect-square bg-white/[0.06] rounded-lg" />
      ))}
    </div>
  )
}