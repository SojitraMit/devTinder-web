import React from "react";

const Premium = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Upgrade Your Membership</h1>
      <p className="text-gray-400 mb-12 text-center max-w-xl">
        Choose the plan that fits you best and unlock premium features.
      </p>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Silver Plan */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-500 hover:shadow-lg hover:shadow-gray-500/20 hover:scale-101 duration-300 transition-transform">
          <h2 className="text-2xl font-semibold mb-2">Silver</h2>
          <p className="text-gray-400 mb-6">For casual users</p>

          <p className="text-4xl font-bold mb-6">
            ₹199<span className="text-lg text-gray-400"> / month</span>
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ View more profiles</li>
            <li>✔ Limited premium filters</li>
            <li>✔ Basic support</li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-gray-600 hover:bg-gray-500 transition font-semibold">
            Choose Silver
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-gradient-to-b from-yellow-500/20 to-gray-800 rounded-2xl p-8 border border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition relative hover:scale-101 duration-300">
          {/* Badge */}
          <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>

          <h2 className="text-2xl font-semibold mb-2 text-yellow-400">Gold</h2>
          <p className="text-gray-400 mb-6">For power users</p>

          <p className="text-4xl font-bold mb-6 text-yellow-400">
            ₹399<span className="text-lg text-gray-400"> / month</span>
          </p>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Unlimited profile views</li>
            <li>✔ Advanced filters</li>
            <li>✔ Priority support</li>
            <li>✔ Boost profile visibility</li>
          </ul>

          <button className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black transition font-semibold">
            Choose Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
