'use client'

import { useState } from 'react';
import Editor from './components/Editor';
import { Screenshot } from './types';

export default function Home() {
  const [screenshot, setScreenshot] = useState<Screenshot | null>(null);

  return (
    <main className="flex h-screen bg-gray-900 text-white">
      <Editor initialScreenshot={screenshot} />
    </main>
  );
}