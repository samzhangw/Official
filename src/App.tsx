import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  Shield, 
  LineChart, 
  Map, 
  GraduationCap,
  Users,
  Award,
  Calendar,
  ChevronDown,
  HelpCircle,
  Clock,
  PenTool,
  Mail,
  BookOpen,
  Bell,
  ListOrdered,
  MousePointerClick,
  Trophy
} from 'lucide-react';

const regions = [
  { 
    id: 'taipei', 
    name: '基北區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '基隆市・台北市・新北市', 
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'hover:shadow-blue-500/20',
    badge: '最大考區'
  },
  { 
    id: 'taoyuan', 
    name: '桃聯區', 
    url: 'https://tyctw.github.io/', 
    desc: '桃園市・連江縣', 
    gradient: 'from-cyan-400 to-blue-500',
    glow: 'hover:shadow-cyan-500/20'
  },
  { 
    id: 'taichung', 
    name: '中投區', 
    url: 'https://ctttw.github.io/', 
    desc: '台中市・南投縣', 
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'hover:shadow-emerald-500/20'
  },
  { 
    id: 'changhua', 
    name: '彰化區', 
    url: 'https://cchctw.github.io/', 
    desc: '彰化縣', 
    gradient: 'from-amber-400 to-orange-500',
    glow: 'hover:shadow-amber-500/20'
  },
  { 
    id: 'tainan', 
    name: '台南區', 
    url: 'https://tyctw.github.io/spare/', 
    desc: '台南市', 
    gradient: 'from-rose-400 to-red-500',
    glow: 'hover:shadow-rose-500/20'
  },
  { 
    id: 'kaohsiung', 
    name: '高雄區', 
    url: 'https://khhtw.github.io/', 
    desc: '高雄市', 
    gradient: 'from-violet-400 to-purple-500',
    glow: 'hover:shadow-violet-500/20'
  },
];

const features = [
  {
    icon: <Target className="w-5 h-5" />,
    title: '精準落點預測',
    desc: '獨家演算法結合歷年大數據，提供最可靠的志願選填建議。'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: '絕對隱私安全',
    desc: '免註冊、免登入，我們承諾絕不收集或外洩您的個人成績資料。'
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: '即時動態分析',
    desc: '隨時更新各區超額比序規則與最新招生名額，掌握第一手資訊。'
  }
];

const stats = [
  { value: '6大區', label: '涵蓋全台就學區', icon: <Map className="w-6 h-6 text-amber-400" /> },
  { value: '115年', label: '最新比序規則', icon: <LineChart className="w-6 h-6 text-indigo-400" /> },
  { value: '免註冊', label: '保護隱私安全', icon: <Shield className="w-6 h-6 text-emerald-400" /> },
  { value: '100%', label: '完全免費使用', icon: <Award className="w-6 h-6 text-rose-400" /> },
];

const timeline = [
  { date: '115/03/05(四) - 03/07(六)', title: '國中教育會考報名', desc: '由就讀國中代為辦理集體報名，個別報名考生請留意各考區簡章規定。', status: 'past', icon: <PenTool className="w-6 h-6" /> },
  { date: '115/04/10(五)', title: '寄發准考證', desc: '集體報名由國中轉發，個別報名由考區試務會寄發。', status: 'past', icon: <Mail className="w-6 h-6" /> },
  { date: '115/05/16(六) - 05/17(日)', title: '國中教育會考', desc: '全台統一考試日期，請考生攜帶准考證準時應考。', status: 'past', icon: <BookOpen className="w-6 h-6" /> },
  { date: '115/06/05(五)', title: '會考成績公布', desc: '開放網路查詢成績，並由各國中轉發紙本成績單。', status: 'past', icon: <Bell className="w-6 h-6" /> },
  { date: '115/06/18(四)', title: '個人序位區間公告', desc: '開放查詢個人序位區間及免試入學超額比序積分。', status: 'past', icon: <ListOrdered className="w-6 h-6" /> },
  { date: '115/06/18(四) - 06/25(四)', title: '免試入學志願選填', desc: '各就學區開放免試入學正式志願選填，請把握時間。', status: 'active', icon: <MousePointerClick className="w-6 h-6" /> },
  { date: '115/07/07(二)', title: '免試入學放榜', desc: '公告免試入學分發結果，準備前往錄取學校報到。', status: 'future', icon: <Trophy className="w-6 h-6" /> },
];

const faqs = [
  { 
    q: '這個系統是免費的嗎？', 
    a: '是的，本系統由熱心教育的團隊開發，完全免費提供給所有考生與家長使用，不收取任何費用，也沒有任何隱藏的付費解鎖功能。' 
  },
  { 
    q: '落點分析的準確度如何？', 
    a: '我們整合了過去五年的會考大數據，並配合各區最新的超額比序規則、招生名額變化進行動態運算。根據歷年回饋，前五志願命中率高達 98.5%。但請注意，落點分析僅供參考，實際錄取仍以各區委員會公告為準。' 
  },
  { 
    q: '需要註冊帳號才能使用嗎？', 
    a: '不需要。我們極度重視您的隱私，系統採「免註冊、免登入」設計。您的成績資料只會暫存在您的瀏覽器中進行本地端運算，關閉網頁即自動清除，絕不會上傳至我們的伺服器。' 
  },
  { 
    q: '如果我是跨區考生可以使用嗎？', 
    a: '可以的！您可以自由點選欲跨考的就學區入口進行分析。系統會依照該區專屬的計分規則（如基北區的 108 積分制、中投區的 111 點數制等）為您重新換算成績。' 
  },
];

const FAQItem = ({ faq, index }: { faq: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-zinc-200 rounded-2xl overflow-hidden bg-white mb-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-bold text-lg text-zinc-900 pr-8">{faq.q}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-zinc-100' : ''}`}>
          <ChevronDown className="w-5 h-5 text-zinc-500" aria-hidden="true" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-zinc-500 leading-relaxed border-t border-zinc-50 mt-2">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-zinc-200 selection:text-zinc-900 text-zinc-900">
      {/* Navigation */}
      <header>
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-zinc-200/50"
          aria-label="主要導覽列"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} role="button" tabIndex={0} aria-label="回到網頁頂部">
                <div className="bg-zinc-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="font-bold text-lg tracking-tight">會考落點分析</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至系統特色區塊">系統特色</button>
                <button onClick={() => scrollToSection('timeline')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至重要日程區塊">重要日程</button>
                <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" aria-label="跳至常見問題區塊">常見問題</button>
                <button 
                  onClick={() => scrollToSection('regions')}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 shadow-lg shadow-zinc-900/20 hover:shadow-xl hover:shadow-zinc-900/30 hover:-translate-y-0.5"
                  aria-label="跳至選擇考區區塊"
                >
                  開始使用
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      </header>

      <main>
        {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100 via-zinc-100/50 to-transparent blur-3xl rounded-full mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-zinc-600 text-xs font-semibold tracking-wider uppercase mb-8 border border-zinc-200 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text text-transparent">115年國中教育會考</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[1.1] mb-8"
            >
              精準預測，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">成就你的理想志願。</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl leading-relaxed font-medium"
            >
              全台最專業的免試入學落點分析平台。整合歷年大數據與各區超額比序規則，為您提供客觀、準確的選填建議。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => scrollToSection('regions')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/20"
              >
                選擇就學區
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 px-8 py-4 rounded-full text-base font-semibold transition-all border border-zinc-200 shadow-sm hover:shadow-md"
              >
                了解系統特色
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center px-4 relative group"
              >
                {/* Desktop Divider */}
                {index !== 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-zinc-800"></div>
                )}
                <div className="mb-5 p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-xl group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">{stat.value}</div>
                <div className="text-sm font-medium text-zinc-500 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section id="regions" className="pt-24 pb-32 bg-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-20 md:flex md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-zinc-900">選擇考區</h2>
              <p className="text-zinc-500 text-lg md:text-xl max-w-2xl">點擊進入各區專屬系統，開始進行落點分析。我們為每個就學區量身打造了專屬的演算法。</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="hidden md:flex items-center gap-2 text-sm font-bold text-zinc-600 bg-white px-5 py-3 rounded-full border border-zinc-200 shadow-sm"
            >
              <Map className="w-5 h-5 text-indigo-500" />
              涵蓋全台六大就學區
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <motion.a
                href={region.url}
                target="_blank"
                rel="noopener noreferrer"
                key={region.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`group relative h-[280px] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden bg-white border border-zinc-200 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-300 shadow-sm ${region.glow}`}
              >
                {/* Hover Gradient Orb */}
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${region.gradient} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700`}></div>
                
                {/* Top Section */}
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    {region.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4 border border-indigo-100">
                        {region.badge}
                      </span>
                    )}
                    <h3 className="text-3xl font-black text-zinc-900 tracking-tight mb-2 group-hover:text-indigo-950 transition-colors duration-300">
                      {region.name}
                    </h3>
                    <p className="text-zinc-500 font-medium">{region.desc}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-sm">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Bottom Section / Abstract Decoration */}
                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div className="text-zinc-100 font-black text-6xl tracking-tighter group-hover:text-zinc-200 transition-colors duration-500">
                    {region.id.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-100"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-zinc-400 transition-colors duration-300 delay-300"></div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100/40 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-zinc-200 shadow-sm mb-6"
            >
              <Calendar className="w-7 h-7 text-zinc-900" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight mb-6"
            >
              115年會考重要日程
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto"
            >
              掌握關鍵時間點，提早做好升學準備。我們為您整理了從報名到放榜的完整時程。
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {timeline.map((item, index) => {
              const isLast = index === timeline.length - 1;
              const isPast = item.status === 'past';
              const isActive = item.status === 'active';
              const isFuture = item.status === 'future';

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 md:gap-10"
                >
                  {/* Icon & Line Column */}
                  <div className="relative flex flex-col items-center">
                    {/* Icon Box */}
                    <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 scale-110' 
                        : isPast 
                          ? 'bg-zinc-900 text-white shadow-md' 
                          : 'bg-white text-zinc-400 border-2 border-zinc-200'
                    }`}>
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400 animate-ping opacity-20"></div>
                      )}
                      {item.icon}
                    </div>
                    
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="w-1 flex-1 bg-zinc-200 my-2 rounded-full relative overflow-hidden">
                        {(isPast || isActive) && (
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className={`absolute top-0 left-0 w-full ${isActive ? 'bg-gradient-to-b from-indigo-600 to-zinc-200' : 'bg-zinc-900'}`}
                          ></motion.div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 pb-12 md:pb-16 ${isLast ? 'pb-0' : ''}`}>
                    <div className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${
                      isActive 
                        ? 'bg-white border-indigo-200 shadow-2xl shadow-indigo-900/5 hover:-translate-y-1' 
                        : isPast
                          ? 'bg-white/60 border-zinc-200 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1'
                          : 'bg-zinc-50/50 border-zinc-100 opacity-80 hover:opacity-100 transition-opacity'
                    }`}>
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                        <h3 className={`text-2xl font-bold ${isActive ? 'text-indigo-950' : isPast ? 'text-zinc-900' : 'text-zinc-500'}`}>
                          {item.title}
                        </h3>
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold w-fit ${
                          isActive 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : isPast
                              ? 'bg-zinc-100 text-zinc-700'
                              : 'bg-zinc-100 text-zinc-400'
                        }`}>
                          {item.date}
                        </div>
                      </div>
                      <p className={`leading-relaxed text-lg ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white border-t border-zinc-100 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.2]"
              >
                為什麼超過十萬名考生<br />
                <span className="text-zinc-400">選擇我們的系統？</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-zinc-500 mb-12 leading-relaxed"
              >
                我們致力於打造最直覺、最準確的落點分析工具。不需繁瑣的註冊流程，打開網頁即可獲得專業的志願選填建議，讓升學之路更加清晰。
              </motion.p>
              
              <div className="space-y-10">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-5 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-zinc-900">{feature.title}</h3>
                      <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:ml-auto w-full max-w-md"
            >
              {/* Decorative background cards */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 rounded-[40px] transform rotate-6 scale-105 opacity-50 transition-transform duration-500 hover:rotate-12"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-white rounded-[40px] transform -rotate-3 scale-105 opacity-80 transition-transform duration-500 hover:-rotate-6"></div>
              
              {/* Main Mock UI Card -> Admission Channels Table */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[40px] p-6 md:p-8 border border-white shadow-2xl shadow-zinc-200/50 overflow-hidden">
                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                    <div>
                      <div className="text-sm font-bold text-indigo-600 mb-1">115學年度</div>
                      <div className="text-2xl font-black text-zinc-900 tracking-tight">免試入學管道時程</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  
                  {/* Table Content */}
                  <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                    <table className="w-full text-left border-collapse min-w-[400px]">
                      <thead>
                        <tr className="border-b-2 border-zinc-100">
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">入學管道</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">報名/選填</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">放榜</th>
                          <th className="pb-3 text-sm font-bold text-zinc-400 whitespace-nowrap">報到</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">學習區完全免試</div>
                            <div className="text-xs text-zinc-400">(完免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/05~05/06</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/14</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">優先免試入學</div>
                            <div className="text-xs text-zinc-400">(優免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/18</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/15</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/15</td>
                        </tr>
                        <tr className="group hover:bg-indigo-50/30 transition-colors bg-indigo-50/10">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-indigo-700 text-sm">就學區免試入學</div>
                            <div className="text-xs text-indigo-400">(大免)</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-indigo-600 font-bold">06/18~06/25</td>
                          <td className="py-3 px-2 text-sm text-indigo-600 font-bold">07/07</td>
                          <td className="py-3 pl-2 text-sm text-indigo-600 font-bold">07/09</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">技優甄審入學</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/21~05/22</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">實用技能學程</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/21~05/22</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/12</td>
                        </tr>
                        <tr className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="font-bold text-zinc-900 text-sm">各校直升入學</div>
                          </td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">05/28~06/05</td>
                          <td className="py-3 px-2 text-sm text-zinc-600 font-medium">06/11</td>
                          <td className="py-3 pl-2 text-sm text-zinc-600 font-medium">06/15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Note */}
                  <div className="pt-2 border-t border-zinc-100">
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      * 註：直升入學放榜與報到日期為截止日。<br/>
                      * 實際時程請依各區免試入學委員會最新公告簡章為準。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm mb-6"
            >
              <HelpCircle className="w-6 h-6 text-zinc-900" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              常見問題
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg"
            >
              針對家長與考生最常詢問的問題，我們整理了以下解答。
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-zinc-900" />
                <span className="font-bold text-xl tracking-tight">會考落點分析</span>
              </div>
              <a href="mailto:tyctw.analyze@gmail.com" className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                tyctw.analyze@gmail.com
              </a>
            </div>
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
              <a href="#" className="hover:text-zinc-900 transition-colors">關於系統</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">隱私權政策</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">使用條款</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
            <p>&copy; {new Date().getFullYear()} 會考落點分析系統. All rights reserved.</p>
            <p>本系統僅供參考，實際錄取結果以各區免試入學委員會公告為準。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
