function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tab({tabs, handleTabs }) {

  function handleChange(selectedTabName) {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.name === selectedTabName,
    }));

    handleTabs(updatedTabs);
  }

  return (
    <div className="">
      {/* MOBILE */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full bg-gray-800 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(e) => handleChange(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      {/* DESKTOP */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(tab.name)}}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-yellow-500 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? "text-yellow-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
