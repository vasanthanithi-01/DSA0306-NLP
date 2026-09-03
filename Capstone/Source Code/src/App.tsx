/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Workspace from "./components/Workspace";

export default function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);

  if (showWorkspace) {
    return <Workspace onBack={() => setShowWorkspace(false)} />;
  }

  return (
    <main id="app-root" className="min-h-screen bg-black text-white selection:bg-[#3054ff] selection:text-white">
      <Navbar onGetStarted={() => setShowWorkspace(true)} />
      <Hero onExplore={() => setShowWorkspace(true)} />
    </main>
  );
}
