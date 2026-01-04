import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  LayoutDashboard, 
  Calculator, 
  MessageSquare, 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  Loader2, 
  CheckCircle2, 
  Send,
  DollarSign,
  Briefcase,
  Plane,
  ShoppingCart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart as RePie,
  Pie
} from 'recharts';

// --- MOCK DATA ---
const INITIAL_DATA = [];
const PROCESSED_DATA = [
  { name: 'Jan', spend: 4000, savings: 2400 },
  { name: 'Feb', spend: 3000, savings: 1398 },
  { name: 'Mar', spend: 2000, savings: 9800 },
  { name: 'Apr', spend: 2780, savings: 3908 },
  { name: 'May', spend: 1890, savings: 4800 },
  { name: 'Jun', spend: 2390, savings: 3800 },
  { name: 'Jul', spend: 3490, savings: 4300 },
];

const CATEGORY_DATA = [
  { name: 'Travel', value: 4500, color: '#6366f1' }, // High spend triggers Visa Infinite
  { name: 'Groceries', value: 1200, color: '#10b981' },
  { name: 'Entertainment', value: 800, color: '#f43f5e' },
  { name: 'Utilities', value: 500, color: '#64748b' },
];

// --- COMPONENTS ---

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { id: 'ingestion', label: 'Upload Data', icon: Upload },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner', label: 'FIRE Planner', icon: Calculator },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-900 text-white flex flex-col h-screen flex-shrink-0 transition-all duration-300">
      <div className="p-4 flex items-center gap-3 font-bold text-xl border-b border-slate-700">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="hidden md:block">FinanceFlow</span>
      </div>
      <nav className="flex-1 py-6 space-y-2 px-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-400">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IngestionModule = ({ onProcessComplete }) => {
  const [status, setStatus] = useState('idle'); // idle, processing, complete
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Preprocessing Data', detail: 'Removing noise & formatting...' },
    { label: 'OCR Extraction', detail: 'Reading bank_statement.pdf...' },
    { label: 'ML Classification', detail: 'Mapping PVR -> Entertainment...' },
  ];

  const handleUpload = () => {
    setStatus('processing');
    let currentStep = 0;
    
    const interval = setInterval(() => {
      setStep(currentStep);
      currentStep++;
      if (currentStep > 2) {
        clearInterval(interval);
        setTimeout(() => {
          setStatus('complete');
          setTimeout(onProcessComplete, 1000); // Auto redirect
        }, 800);
      }
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Data Ingestion</h2>
          <p className="text-slate-500 mt-2">Upload your bank statements to begin</p>
        </div>

        {status === 'idle' && (
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-blue-200 rounded-xl p-10 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer flex flex-col items-center gap-4 group"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="text-blue-500 w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-blue-900">Click to Upload Statement</p>
              <p className="text-sm text-blue-400 mt-1">PDF, CSV, or Excel</p>
            </div>
          </div>
        )}

        {status === 'processing' && (
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
            </div>
            <div className="space-y-4">
              {steps.map((s, idx) => (
                <div key={idx} className={`flex items-center gap-4 transition-opacity ${idx > step ? 'opacity-30' : 'opacity-100'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    idx < step ? 'bg-green-500 border-green-500 text-white' : 
                    idx === step ? 'border-blue-500 text-blue-500 animate-pulse' : 
                    'border-slate-200 text-slate-300'
                  }`}>
                    {idx < step ? <CheckCircle2 size={16} /> : idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{s.label}</p>
                    <p className="text-xs text-slate-400">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Processing Complete!</h3>
            <p className="text-slate-500">Redirecting to Dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardModule = ({ data }) => {
  // Logic for Visa Recommendation: Find highest category
  const topCategory = [...CATEGORY_DATA].sort((a, b) => b.value - a.value)[0];
  
  return (
    <div className="p-6 md:p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Financial Overview</h1>
          <p className="text-slate-500">Welcome back, John</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
          Last Updated: Just now
        </div>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <DollarSign />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Spend</p>
              <h3 className="text-2xl font-bold text-slate-800">$7,000.00</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <PieChart />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Top Category</p>
              <h3 className="text-2xl font-bold text-slate-800">{topCategory.name}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Savings Rate</p>
              <h3 className="text-2xl font-bold text-slate-800">24%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Spending Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROCESSED_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Line type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Visa Recommendation Engine */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard size={120} />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-4">
              AI RECOMMENDATION
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Optimize your {topCategory.name}
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Our analysis shows high spending on <b>{topCategory.name}</b>. You could save approx <b>$240/mo</b> with the right card.
            </p>
            
            <div className="mt-auto bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4">
              <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold text-xs italic">
                VISA
              </div>
              <div>
                <p className="font-bold text-slate-800">Visa Infinite</p>
                <p className="text-xs text-slate-500">5% Cashback on {topCategory.name}</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6">Expense Categories</h3>
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePie data={CATEGORY_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Tooltip />
                </RePie>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
               {CATEGORY_DATA.map((cat) => (
                 <div key={cat.name} className="flex items-center gap-2 text-sm">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}}></div>
                   <span className="text-slate-600">{cat.name}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Transactions / Context List */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-4">Recent ML Classifications</h3>
           <div className="space-y-4">
             {[
               { m: 'PVR CINEMAS', cat: 'Entertainment', amt: -45.00 },
               { m: 'DMART RETAIL', cat: 'Groceries', amt: -120.50 },
               { m: 'DELTA AIRLINES', cat: 'Travel', amt: -450.00 },
               { m: 'UBER TRIP', cat: 'Travel', amt: -24.00 },
             ].map((tx, i) => (
               <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {tx.m[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{tx.m}</p>
                      <p className="text-xs text-slate-400">{tx.cat}</p>
                    </div>
                 </div>
                 <span className="font-medium text-slate-800">${Math.abs(tx.amt)}</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
};

const FirePlanner = () => {
  const [savings, setSavings] = useState(50000);
  const [goal, setGoal] = useState(1000000);
  
  const percentage = Math.min(100, Math.round((savings / goal) * 100));

  return (
    <div className="p-8 h-full bg-slate-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
             <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">FIRE Calculator</h2>
            <p className="text-slate-500">Financial Independence, Retire Early</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Savings</label>
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
               <input 
                 type="number" 
                 value={savings} 
                 onChange={(e) => setSavings(Number(e.target.value))}
                 className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
               />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Retirement Goal</label>
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
               <input 
                 type="number" 
                 value={goal} 
                 onChange={(e) => setGoal(Number(e.target.value))}
                 className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
               />
            </div>
          </div>

          <div className="pt-6">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-slate-600">Progress</span>
              <span className="text-green-600">{percentage}%</span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
             <p className="text-green-800 font-medium">
               {percentage < 50 ? "Keep going! Compounding is your friend." : "You're well on your way to freedom!"}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'Hello! I am connected to your financial data via Pathway RAG. Ask me anything about your spending.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate RAG Logic + Contextual Offer
    setTimeout(() => {
      let responseText = "I found some data on that. You spent $4,500 on Travel recently.";
      let offer = null;

      if (input.toLowerCase().includes('travel') || input.toLowerCase().includes('flight')) {
        responseText = "Based on your bank statement, you spent $4,500 on Travel this month. This is 35% of your total budget.";
        offer = {
          title: "Visa Infinite Recommendation",
          text: "Since you travel frequently, the Visa Infinite card offers complimentary lounge access and 3x points on flights."
        };
      } else if (input.toLowerCase().includes('save') || input.toLowerCase().includes('budget')) {
        responseText = "To meet your FIRE goal, try reducing 'Entertainment' costs by 15%.";
      }

      const botMsg = { id: Date.now() + 1, role: 'system', text: responseText, offer };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
       {/* Header */}
       <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-white z-10">
         <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
           <MessageSquare size={16} />
         </div>
         <div>
           <h3 className="font-bold text-slate-800">FinanceFlow Assistant</h3>
           <p className="text-xs text-slate-400 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-green-500"></span> Online • RAG Active
           </p>
         </div>
       </div>

       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
         {messages.map((msg) => (
           <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[80%] space-y-2`}>
               <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                 msg.role === 'user' 
                   ? 'bg-blue-600 text-white rounded-br-none' 
                   : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
               }`}>
                 {msg.text}
               </div>
               
               {/* Contextual Card embedded in Chat */}
               {msg.offer && (
                 <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                   <div className="flex items-start gap-3">
                     <CreditCard className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                     <div>
                       <p className="font-bold text-amber-900 text-sm">{msg.offer.title}</p>
                       <p className="text-xs text-amber-800 mt-1">{msg.offer.text}</p>
                       <button className="mt-2 text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
                         View Details
                       </button>
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         ))}
         {isTyping && (
            <div className="flex justify-start">
               <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 flex gap-1 items-center">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
               </div>
            </div>
         )}
         <div ref={endRef} />
       </div>

       {/* Input Area */}
       <div className="p-4 bg-white border-t border-slate-100">
         <div className="flex gap-2">
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Ask about spending, budgets, or card offers..."
             className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
           />
           <button 
             onClick={handleSend}
             disabled={!input.trim()}
             className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             <Send size={20} />
           </button>
         </div>
       </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ingestion');
  const [hasData, setHasData] = useState(false);

  const handleProcessComplete = () => {
    setHasData(true);
    setActiveTab('dashboard');
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-full overflow-hidden relative">
        {activeTab === 'ingestion' && <IngestionModule onProcessComplete={handleProcessComplete} />}
        
        {activeTab === 'dashboard' && (
           hasData 
             ? <DashboardModule /> 
             : <div className="h-full flex flex-col items-center justify-center text-slate-400">
                 <Upload size={48} className="mb-4 opacity-50" />
                 <p>Please upload data in the Ingestion tab first.</p>
                 <button onClick={() => setActiveTab('ingestion')} className="mt-4 text-blue-500 hover:underline">Go to Upload</button>
               </div>
        )}
        
        {activeTab === 'planner' && <FirePlanner />}
        {activeTab === 'assistant' && <AiAssistant />}
      </main>
    </div>
  );
}