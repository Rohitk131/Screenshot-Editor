import React from 'react'
import { CircleIcon, XIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, RefreshCwIcon, HomeIcon, LockIcon, SearchIcon, HeartIcon, MenuIcon, BellIcon, UserIcon, SettingsIcon, ChevronDownIcon, MoonIcon, SunIcon } from 'lucide-react'

// 1. macOS Light Theme
// 1. macOS Light Theme
export const MacOSNavbarLight: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
    <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-t-lg">
      <CircleIcon className="w-3 h-3 text-red-500 fill-current" />
      <CircleIcon className="w-3 h-3 text-yellow-500 fill-current" />
      <CircleIcon className="w-3 h-3 text-green-500 fill-current" />
    </div>
    <div className="flex-grow bg-white overflow-hidden">
      {children}
    </div>
  </div>
)

// 2. macOS Dark Theme
export const MacOSNavbarDark: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
    <div className="flex items-center gap-2 p-2 bg-gray-800 rounded-t-lg">
      <CircleIcon className="w-3 h-3 text-red-600 fill-current" />
      <CircleIcon className="w-3 h-3 text-yellow-600 fill-current" />
      <CircleIcon className="w-3 h-3 text-green-600 fill-current" />
    </div>
    <div className="flex-grow bg-gray-900 overflow-hidden">
      {children}
    </div>
  </div>
)

// 3. Safari Light Theme
export const SafariNavbarLight: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
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
    <div className="flex-grow bg-white overflow-hidden">
      {children}
    </div>
  </div>
)

// 4. Safari Dark Theme
export const SafariNavbarDark: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
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
    <div className="flex-grow bg-gray-800 overflow-hidden">
      {children}
    </div>
  </div>
)

// 5. Chrome Light Theme
export const ChromeNavbarLight: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
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
    <div className="flex-grow bg-white overflow-hidden">
      {children}
    </div>
  </div>
)

// 6. Chrome Dark Theme
export const ChromeNavbarDark: React.FC<{ children?: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div className="w-full h-full flex flex-col" style={style}>
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
    <div className="flex-grow bg-gray-800 overflow-hidden">
      {children}
    </div>
  </div>
)


// New frame components
export const SimpleWhiteFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-white border-2 border-gray-300 rounded-lg flex flex-col shadow-md">
    <div className="flex items-center justify-end space-x-1 p-2 bg-gray-100">
      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
    </div>
    <div className="flex-grow overflow-hidden px-2">
      {children}
    </div>
  </div>
);

export const RedHeartFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex flex-col shadow-lg ">
    <div className="flex items-center justify-between px-4 py-2 bg-red-600 rounded-t-lg">
      <HeartIcon className="w-5 h-5 text-white" />
      <HeartIcon className="w-5 h-5 text-white" />
      <HeartIcon className="w-5 h-5 text-white" />
    </div>
    <div className="flex-grow overflow-hidden px-2">
      {children}
    </div>
  </div>
);

export const PurpleRoundedFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-purple-100 rounded-3xl border-4 border-purple-500 flex flex-col shadow-xl">
    <div className="flex items-center justify-start space-x-2 p-3 bg-purple-200 rounded-t-2xl">
      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
      <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
      <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
    </div>
    <div className="flex-grow overflow-hidden px-2">
      {children}
    </div>
  </div>
);

export const PinkHeartFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-pink-100 rounded-lg border-4 border-pink-500 flex flex-col shadow-md">
    <div className="flex items-center justify-end space-x-2 p-2 bg-pink-200">
      <HeartIcon className="w-5 h-5 text-pink-500" />
      <HeartIcon className="w-5 h-5 text-pink-500" />
      <HeartIcon className="w-5 h-5 text-pink-500" />
    </div>
    <div className="flex-grow overflow-hidden px-1">
      {children}
    </div>
  </div>
);

export const BlueRoundedFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-blue-500 rounded-2xl flex flex-col overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 bg-blue-600">
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div className="flex-grow mx-4">
        <div className="w-full h-6 bg-blue-400 rounded-full"></div>
      </div>
    </div>
    <div className="flex-grow bg-white m-1 rounded-xl overflow-hidden">
      {children}
    </div>
  </div>
);

export const GraySquareFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-gray-100 flex flex-col overflow-hidden shadow-lg">
    <div className="bg-white border-b border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MenuIcon className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-gray-700">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <BellIcon className="w-5 h-5 text-gray-500" />
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex-grow p-4 overflow-hidden">
      {children}
    </div>
  </div>
);

export const PinkHeartTopFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex flex-col overflow-hidden rounded-lg shadow-lg">
    <div className="p-4">
      <div className="bg-white bg-opacity-20 rounded-full p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-pink-500" />
            </div>
            <span className="font-bold text-white">LovelyApp</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-white" />
            </div>
            <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <BellIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-grow bg-white rounded-t-3xl p-4 overflow-hidden">
      {children}
    </div>
  </div>
);

export const ModernDashboardFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col overflow-hidden rounded-lg shadow-2xl">
    <div className="bg-white bg-opacity-10 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MenuIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="font-bold text-white text-xl">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <SearchIcon className="w-5 h-5 text-white" />
          <BellIcon className="w-5 h-5 text-white" />
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex-grow bg-white m-4 rounded-lg p-4 overflow-hidden">
      {children}
    </div>
  </div>
);

export const ElegantCardFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-cyan-400 p-1 rounded-lg shadow-xl">
    <div className="bg-white rounded-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SunIcon className="w-6 h-6 text-yellow-500" />
            <MoonIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Theme</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-hidden">
        {children}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Settings</span>
          <SettingsIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
);