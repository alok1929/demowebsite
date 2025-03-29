import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradient } from './components/ui/background-gradient';
import { SparklesCore } from './components/ui/sparkles';
import { TextGenerateEffect } from './components/ui/text-generate-effect';
import { TracingBeam } from './components/ui/tracing-beam';
import { Brain, Cpu, Shield, Terminal, MessageSquare, FileText, Calendar, Map, Upload } from 'lucide-react';
import './App.css';

// Create a new Orb component to match your product
const ConversationOrb = ({ isListening, isSpeaking }) => {
  // Add states to animate the orb based on speaking/listening
  const pulseVariants = {
    speaking: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    },
    listening: {
      scale: [1, 1.02, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        repeat: Infinity,
        duration: 2.5
      }
    },
    idle: {
      scale: 1,
      opacity: 0.8
    }
  };

  const state = isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle';

  return (
    <div className="relative">
      <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
        variants={pulseVariants}
        animate={state}
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-purple-500/30 blur-xl" />
      <div className="absolute inset-0 rounded-full glow-effect" />
    </div>
  );
};

// Create an interactive demo component
const InteractiveDemo = () => {
  const [demoState, setDemoState] = useState('idle'); // idle, listening, speaking, mcq
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showMCQ, setShowMCQ] = useState(false);

  const startDemo = () => {
    setDemoState('listening');
    setTranscript('');
    setResponse('');
    setShowMCQ(false);

    // Simulate conversation
    setTimeout(() => {
      setTranscript('I need to schedule a meeting for next week.');
      setTimeout(() => {
        setDemoState('speaking');
        typeResponse('I can help you schedule a meeting. What day works best for you?');
      }, 1500);
    }, 1000);
  };

  const typeResponse = (text) => {
    let i = 0;
    setResponse('');
    const interval = setInterval(() => {
      setResponse(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (text.includes('day works best')) {
          setTimeout(() => {
            setShowMCQ(true);
            setDemoState('mcq');
          }, 500);
        }
      }
    }, 50);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800">
      <div className="flex flex-col md:flex-row h-[500px]">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ConversationOrb
            isListening={demoState === 'listening'}
            isSpeaking={demoState === 'speaking'}
          />
        </div>

        {/* Right panel for UI components */}
        <AnimatePresence>
          {showMCQ && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full md:w-1/3 border-l border-zinc-800 bg-black/40 backdrop-blur-sm"
            >
              <div className="p-6">
                <h3 className="text-white text-lg mb-4">When would you like to schedule?</h3>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
                  <motion.button
                    key={day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full text-left mb-2 p-3 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-white"
                  >
                    {i + 1}. {day}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full mt-4 p-3 rounded-lg bg-blue-600 text-white font-medium"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcript area */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto">
          {transcript && (
            <p className="text-zinc-400 mb-2">
              <span className="text-zinc-500">You:</span> {transcript}
            </p>
          )}
          {response && (
            <p className="text-white">
              <span className="text-blue-400">AI:</span> {response}
            </p>
          )}
          {demoState === 'idle' && (
            <button
              onClick={startDemo}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// New component to showcase the UI components
const UIComponentsShowcase = () => {
  const components = [
    { name: "Multiple Choice", icon: <MessageSquare className="w-8 h-5 bg-white p-1 rounded-lg" />, color: "from-blue-500 to-indigo-600" },
    { name: "Text Input", icon: <FileText className="w-8 h-5 bg-white rounded-lg" />, color: "from-emerald-500 to-green-600 bg-white rounded-lg" },
    { name: "Location Selector", icon: <Map className="w-8 h-5 bg-white rounded-lg" />, color: "from-orange-500 to-red-600 " },
    { name: "Document Upload", icon: <Upload className="w-8 h-5 bg-white rounded-lg" />, color: "from-purple-500 to-pink-600 bg-white rounded-lg" },
    { name: "Calendar Scheduling", icon: <Calendar className="w-8 h-5 bg-white rounded-lg" />, color: "from-cyan-500 to-blue-600 bg-white rounded-lg" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {components.map((component, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl bg-gradient-to-br ${component.color} p-[1px]`}
        >
          <div className="bg-zinc-900 rounded-xl p-4 h-full flex flex-col items-center justify-center">
            {component.icon}
            <h3 className="mt-2 text-white font-medium text-sm">{component.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Updated DeveloperSDK component
const DeveloperSDK = () => {
  return (
    <BackgroundGradient className="rounded-[22px] p-6 bg-zinc-900/90">
      <h2 className="text-2xl font-bold text-white mb-6">
        framewise_meet_client Python SDK
      </h2>

      {/* Code display component */}
      <div className="w-full overflow-hidden rounded-2xl bg-[#1e1e2e] border border-[#313244] shadow-xl">
        {/* Code editor window controls */}
        <div className="flex items-center p-3 bg-[#181825] border-b border-[#313244]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#f38ba8]"></div>
            <div className="w-3 h-3 rounded-full bg-[#fab387]"></div>
            <div className="w-3 h-3 rounded-full bg-[#a6e3a1]"></div>
          </div>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto">
          <div className="flex">
            {/* Line numbers */}
            <div className="text-right select-none text-[#6c7086] pr-2 border-r border-[#313244] flex-shrink-0">
              {[...Array(17)].map((_, i) => (
                <div key={i} className="h-6 flex items-center justify-end">{i + 1}</div>
              ))}
            </div>

            {/* Code with syntax highlighting */}
            <div className="text-[#cdd6f4] text-sm pl-4">
              <div className="h-6 flex items-center"><span className="text-[#89b4fa]"># Install the package</span></div>
              <div className="h-6 flex items-center space-x-2"><span className="text-[#f38ba8] px-2">pip install</span> framewise_meet_client</div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center"><span className="text-[#89b4fa]"># Create a simple voice agent</span></div>
              <div className="h-6 flex items-center space-x-2"><span className="text-[#f38ba8] space-x-2 mr-1">from</span> framewise_meet_client.app <span className=" flex items-center space-x-2 text-[#f38ba8]">import</span> App</div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center px-1">app = App(api_key=<span className="text-[#a6e3a1]">"your_api_key"</span>)</div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center"><span className="text-[#f38ba8]">@app.on_transcript</span>()</div>
              <div className="h-6 flex items-center"><span className="text-[#f38ba8] px-1">def</span> <span className="text-[#89b4fa]">on_transcript</span>(message):</div>
              <div className="h-6 flex items-center">&nbsp;&nbsp;&nbsp;&nbsp;transcript = message.content.text</div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center text-purple-400">app.run()</div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center"></div>
              <div className="h-6 flex items-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Description below code */}
      <div className="mt-4 text-zinc-300">
        <p className="py-2">Our Python SDK makes it easy to build and deploy voice-first AI agents with interactive UI components.</p>
        <div className="mt-6 mb-5 flex flex-wrap gap-4 py-2">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors">
            <Terminal className="w-4 h-4" />
            View Documentation
          </button>
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub Repo
          </button>
        </div>
      </div>
    </BackgroundGradient>
  );
};

function App() {
  useEffect(() => {
    document.body.style.display = 'block';
    document.body.style.placeItems = 'initial';

    return () => {
      document.body.style.display = '';
      document.body.style.placeItems = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black">
      <TracingBeam>
        <div className="flex flex-col items-center justify-center min-h-screen gap-16 p-4">
          {/* Hero Section */}
          <div className="relative h-[40rem] w-full flex flex-col items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <SparklesCore
                id="tsparticles"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={40}
                className="w-full h-full"
                particleColor="#00a2ff"
              />
            </div>

            <div className="z-10 text-center max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
              >
                Framewise.ai
              </motion.p>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-white mt-8 mb-4"
              >
                Voice-First AI with Interactive UI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-zinc-300 mb-8"
              >
                Transform how enterprises connect with customers through intelligent voice conversations enhanced with contextual UI components.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 transition-colors">
                  Book a Demo
                </button>
              </motion.div>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto px-4"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              See It In Action
            </h2>
            <InteractiveDemo />
          </motion.div>

          {/* UI Components Showcase */}
          <div className="w-full max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Interactive UI Components
              </h2>
              <p className="text-zinc-400 text-center max-w-3xl mx-auto">
                Voice-first AI enhanced with purpose-built UI components that appear exactly when needed
              </p>
            </motion.div>

            <UIComponentsShowcase />
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
            {[
              {
                title: "Agent Infrastructure",
                description: "Build, deploy, and scale AI agents with our enterprise-ready infrastructure",
                icon: <Brain className="w-8 h-8 text-emerald-400" />
              },
              {
                title: "Autonomous Systems",
                description: "Create autonomous AI systems that learn, adapt, and evolve",
                icon: <Cpu className="w-8 h-8 text-emerald-400" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="col-span-1"
              >
                <BackgroundGradient className="rounded-[22px] p-6 sm:p-10 bg-zinc-900 h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <TextGenerateEffect words={feature.title} />
                    <p className="text-neutral-300 mt-2 text-lg">{feature.description}</p>
                  </div>
                </BackgroundGradient>
              </motion.div>
            ))}
          </div>

          {/* Developer SDK Section */}
          <div className="w-full max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Developer-First Approach
              </h2>
              <p className="text-zinc-400 text-center max-w-3xl mx-auto">
                Build and integrate voice agents in minutes with our powerful Python SDK
              </p>
            </motion.div>

            <DeveloperSDK />
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto px-4 text-center mb-16"
          >
            <BackgroundGradient className="rounded-[22px] p-8 bg-zinc-900">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Customer Interactions?
              </h2>
              <p className="text-neutral-300 mb-6">
                Join leading enterprises already using Framewise.ai
              </p>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </BackgroundGradient>
          </motion.div>
        </div>
      </TracingBeam>
    </div>
  );
}

export default App;