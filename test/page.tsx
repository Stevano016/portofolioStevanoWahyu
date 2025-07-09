export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Tailwind Test Page</h1>

      <div className="test-red mb-4">This should have red background (CSS test)</div>

      <div className="bg-blue-500 text-white p-4 mb-4 rounded-lg">This should have blue background (Tailwind test)</div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 mb-4 rounded-lg">
        This should have gradient background
      </div>

      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors">
        Hover me (should change color)
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border">Card 1</div>
        <div className="bg-card p-4 rounded-lg border">Card 2</div>
        <div className="bg-card p-4 rounded-lg border">Card 3</div>
      </div>
    </div>
  )
}
