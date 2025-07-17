export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-black animate-pulse">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header skeleton */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Content skeleton */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6 space-y-4">
              <div className="aspect-video bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="h-4 w-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
