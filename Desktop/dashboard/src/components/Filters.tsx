import { Search, Filter, List, LayoutGrid } from "lucide-react";
import { useState } from "react";

const tabs = ["Active", "Paused", "Archive", "Draft (11)"];

const Filters = () => {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="bg-purple-700 text-white px-4 py-3 flex items-center gap-4 rounded-md">
        <span className="font-semibold text-sm whitespace-nowrap">Job Posting</span>
        <div className="flex-1 max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search by Job title or Job location or Job type or Job ID"
            className="w-full rounded-md px-4 py-2 pr-10 text-sm text-gray-900 bg-white border-none outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Tabs + view toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm pb-1 transition-colors ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-purple-600 font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500 cursor-pointer" />
          <List className="w-5 h-5 text-gray-500 cursor-pointer" />
          <LayoutGrid className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
