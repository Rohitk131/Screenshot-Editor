import React from 'react'
import { CircleIcon, XIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, RefreshCwIcon, HomeIcon, LockIcon, SearchIcon } from 'lucide-react'

// 1. macOS Light Theme
export const MacOSNavbarLight: React.FC = () => (
  <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-t-lg">
    <CircleIcon className="w-3 h-3 text-red-500 fill-current" />
    <CircleIcon className="w-3 h-3 text-yellow-500 fill-current" />
    <CircleIcon className="w-3 h-3 text-green-500 fill-current" />
  </div>
)

// 2. macOS Dark Theme
export const MacOSNavbarDark: React.FC = () => (
  <div className="w-full h-full flex flex-col">
    <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-t-lg">
      <CircleIcon className="w-3 h-3 text-red-600 fill-current" />
      <CircleIcon className="w-3 h-3 text-yellow-600 fill-current" />
      <CircleIcon className="w-3 h-3 text-green-600 fill-current" />
    </div>
    <div className="flex-grow bg-transparent"></div>
  </div>
)
// 3. Safari Light Theme
export const SafariNavbarLight: React.FC = () => (
  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-t-lg">
    <div className="flex items-center gap-2">
      <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
    <div className="flex-grow mx-4">
      <div className="flex items-center bg-white rounded-full border border-gray-300 px-3 py-1">
        <LockIcon className="w-4 h-4 text-gray-400 mr-2" />
        <input type="text" placeholder="Search or enter website name" className="w-full bg-transparent text-sm focus:outline-none" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <PlusIcon className="w-5 h-5 text-gray-500" />
      <SearchIcon className="w-5 h-5 text-gray-500" />
    </div>
  </div>
)

// 4. Safari Dark Theme
export const SafariNavbarDark: React.FC = () => (
  <div className="flex items-center justify-between p-2 bg-gray-900 rounded-t-lg">
    <div className="flex items-center gap-2">
      <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </div>
    <div className="flex-grow mx-4">
      <div className="flex items-center bg-gray-800 rounded-full border border-gray-700 px-3 py-1">
        <LockIcon className="w-4 h-4 text-gray-500 mr-2" />
        <input type="text" placeholder="Search or enter website name" className="w-full bg-transparent text-sm text-gray-300 focus:outline-none" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <PlusIcon className="w-5 h-5 text-gray-400" />
      <SearchIcon className="w-5 h-5 text-gray-400" />
    </div>
  </div>
)

// 5. Chrome Light Theme
export const ChromeNavbarLight: React.FC = () => (
  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-t-lg">
    <div className="flex items-center gap-2">
      <XIcon className="w-4 h-4 text-gray-500" />
      <div className="w-24 h-6 bg-white rounded flex items-center justify-center text-xs text-gray-500">New Tab</div>
      <PlusIcon className="w-4 h-4 text-gray-500" />
    </div>
    <div className="flex-grow mx-4">
      <div className="flex items-center bg-white rounded-full shadow px-3 py-1">
        <LockIcon className="w-4 h-4 text-gray-400 mr-2" />
        <input type="text" placeholder="Search Google or type a URL" className="w-full bg-transparent text-sm focus:outline-none" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <RefreshCwIcon className="w-5 h-5 text-gray-500" />
      <HomeIcon className="w-5 h-5 text-gray-500" />
    </div>
  </div>
)

// 6. Chrome Dark Theme
export const ChromeNavbarDark: React.FC = () => (
  <div className="flex items-center justify-between p-2 bg-gray-900 rounded-t-lg">
    <div className="flex items-center gap-2">
      <XIcon className="w-4 h-4 text-gray-400" />
      <div className="w-24 h-6 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-300">New Tab</div>
      <PlusIcon className="w-4 h-4 text-gray-400" />
    </div>
    <div className="flex-grow mx-4">
      <div className="flex items-center bg-gray-800 rounded-full shadow px-3 py-1">
        <LockIcon className="w-4 h-4 text-gray-500 mr-2" />
        <input type="text" placeholder="Search Google or type a URL" className="w-full bg-transparent text-sm text-gray-300 focus:outline-none" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <RefreshCwIcon className="w-5 h-5 text-gray-400" />
      <HomeIcon className="w-5 h-5 text-gray-400" />
    </div>
  </div>
)

// New frame components
export const SimpleWhiteFrame: React.FC = () => (
  <div className="w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col">
    <div className="flex items-center justify-end space-x-1 p-1">
      <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
      <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
      <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
    </div>
  </div>
);

export const RedHeartFrame: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg flex flex-col">
    <div className="flex items-center justify-between px-2 py-1 bg-red-500 rounded-t-lg">
      <div className="text-white text-xl">❤</div>
      <div className="text-white text-xl">❤</div>
      <div className="text-white text-xl">❤</div>
    </div>
  </div>
);

export const PurpleRoundedFrame: React.FC = () => (
  <div className="w-full h-full bg-purple-100 rounded-3xl border-4 border-purple-500 flex flex-col">
    <div className="flex items-center justify-start space-x-1 p-2">
      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
    </div>
  </div>
);

export const PinkHeartFrame: React.FC = () => (
  <div className="w-full h-full bg-pink-100 rounded-lg border-4 border-pink-500 flex flex-col">
    <div className="flex items-center justify-end space-x-1 p-2">
      <div className="text-pink-500 text-xl">❤</div>
      <div className="text-pink-500 text-xl">❤</div>
      <div className="text-pink-500 text-xl">❤</div>
    </div>
  </div>
);