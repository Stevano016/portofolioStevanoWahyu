export default function DebugPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "red", fontSize: "2rem", marginBottom: "20px" }}>Debug Page - Inline Styles</h1>

      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        This uses inline styles (should always work)
      </div>

      <h2 className="text-4xl font-bold text-green-500 mb-4">Tailwind Test</h2>

      <div className="bg-purple-500 text-white p-4 mb-4 rounded-lg">This uses Tailwind classes</div>

      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-4 mb-4 rounded-lg">Gradient test</div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
        Hover Button Test
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-xl font-semibold mb-2">Card 1</h3>
          <p className="text-gray-600">This is a test card</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-xl font-semibold mb-2">Card 2</h3>
          <p className="text-gray-600">This is another test card</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-xl font-semibold mb-2">Card 3</h3>
          <p className="text-gray-600">This is the third test card</p>
        </div>
      </div>

      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "10px" }}>Debug Info:</h3>
        <p>• If you see colors and styling above, Tailwind is working</p>
        <p>• If you only see the blue box (inline styles), Tailwind is not working</p>
        <p>• Check browser console (F12) for any errors</p>
      </div>
    </div>
  )
}
