import newsDetailData from "../data/newsdetailData.json";

function NewsDetailPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-green-800 mb-2">
        {newsDetailData.headline}
      </h2>
      <div className="text-xs text-green-600 mb-2">{newsDetailData.context}</div>
      {newsDetailData.coverImage && (
        <img
          src={``}
          alt={newsDetailData.coverImage.caption}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <div className="text-sm text-gray-700 mb-4">{newsDetailData.intro}</div>
      <div className="text-base text-gray-800 space-y-2">
        {newsDetailData.content
          ?.filter(item => item.content)
          .map((item, idx) => (
            <p key={idx}>{item.content.contentValue}</p>
          ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Source: {newsDetailData.source}
      </div>
    </div>
  );
}

export default NewsDetailPage;