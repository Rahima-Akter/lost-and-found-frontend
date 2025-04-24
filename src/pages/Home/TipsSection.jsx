import React from 'react';

const TipsSection = () => {
  const tips = [
    {
      title: "✅ Safe Meetups",
      description:
        "Always meet in a public, well-lit area like a police station or café. Bring a friend if possible and inform someone where you're going.",
    },
    {
      title: "🚫 Avoid Sharing Sensitive Info",
      description:
        "Never share personal addresses, ID numbers, or banking info on public posts. Communicate through the platform if possible.",
    },
    {
      title: "💡 Post Effectively",
      description:
        "Include clear photos, detailed item descriptions, date and location lost/found, and any unique identifiers. This increases chances of a match!",
    },
  ];

  return (
    <section className="pb-16" id="safety-tips">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="md:text-4xl text-3xl font-bold text-gray-800 dark:text-white mb-4 flex justify-center md:flex-row flex-col">
          <span>🧠</span> Tips & Safety Guidelines
        </h2>
        <p className="text-gray-600 mb-12 dark:text-gray-200 text-lg">
          Stay safe and boost your chances of reuniting with your lost items.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
