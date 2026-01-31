
import React, { useState, useCallback, useRef } from 'react';
import { analyzeMedia } from './services/geminiService';
import { AnalysisResult, MediaFile, MetadataInfo } from './types';
import { Button } from './components/Button';
import { ForensicChart } from './components/ForensicChart';
import { HeatmapOverlay } from './components/HeatmapOverlay';
import { CyberComplaintGuide } from './components/CyberComplaintGuide';
import { 
  Upload, 
  FileSearch, 
  AlertCircle, 
  ChevronRight, 
  Info, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Fingerprint,
  Search,
  BookOpen,
  X
} from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-[#121212] flex items-center justify-center text-white font-black text-2xl shadow-[4px_4px_0px_#E8E6E1]">
      D
    </div>
    <div className="flex flex-col">
      <h1 className="text-2xl font-black tracking-tighter text-[#121212] serif uppercase leading-none">
        DEEPSERCH
      </h1>
      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400 mt-1">Forensic Intelligence</span>
    </div>
  </div>
);

export default function App() {
  const [file, setFile] = useState<MediaFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MetadataInfo | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size limit exceeded (Max 20MB).");
      return;
    }

    const type = selectedFile.type.startsWith('video') ? 'video' : 'image';
    const preview = URL.createObjectURL(selectedFile);

    setFile({ file: selectedFile, preview, type: type as any });
    setMetadata({
      name: selectedFile.name,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB",
      type: selectedFile.type,
      lastModified: new Date(selectedFile.lastModified).toLocaleDateString()
    });
    setResults(null);
    setError(null);
  };

  const processAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        try {
          const result = await analyzeMedia(base64, file.file.type, file.type === 'video');
          setResults(result);
        } catch (err: any) {
          setError("Detection engine failure. Please check connectivity.");
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file.file);
    } catch (err) {
      setError("Forensic extraction failed.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 pb-32">
      {/* Paper Header */}
      <header className="flex flex-col md:flex-row items-end md:items-center justify-between mb-20 gap-8">
        <Logo />
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setShowGuide(true)}>
            Protocol Guide
          </Button>
          <div className="w-px h-8 bg-stone-200 hidden md:block"></div>
          <Button variant="secondary" onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}>
            Portal Access
          </Button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Forensic Input */}
        <div className="lg:col-span-5 space-y-10">
          <div 
            className={`paper-panel paper-stack p-10 transition-all flex flex-col items-center justify-center min-h-[500px] cursor-pointer
              ${file ? 'border-stone-400' : 'hover:bg-stone-50/50 border-dashed border-2 bg-stone-50/20'}`}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*,video/*" 
              onChange={handleFileChange}
            />
            
            {!file ? (
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-white border-2 border-dashed border-stone-200 group-hover:border-stone-400 transition-colors">
                  <Upload className="w-7 h-7 text-stone-300 group-hover:text-stone-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black serif uppercase tracking-tight mb-3">Submission 01</h3>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] mx-auto leading-loose">
                  Upload visual evidence for deep neural reconstruction. 20MB limit.
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div className="relative rounded-sm overflow-hidden flex-1 bg-stone-100 border border-stone-200 group min-h-[350px] shadow-inner">
                  {file.type === 'image' ? (
                    <img src={file.preview} alt="Evidence" className="w-full h-full object-contain" />
                  ) : (
                    <video src={file.preview} controls className="w-full h-full object-contain" />
                  )}
                  {results?.locations && <HeatmapOverlay locations={results.locations} />}
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); setResults(null); }}
                    className="absolute top-6 right-6 bg-[#121212] p-2 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110 active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-10 space-y-8">
                  <div className="grid grid-cols-2 gap-8 border-y border-stone-100 py-6">
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">Subject ID</span>
                      <span className="text-[#121212] text-xs font-bold truncate block tracking-tight">{metadata?.name}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">Data Load</span>
                      <span className="text-[#121212] text-xs font-bold block tracking-tight">{metadata?.size}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full py-5 shadow-[0px_20px_30px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform" 
                    isLoading={isAnalyzing}
                    onClick={processAnalysis}
                  >
                    Initiate Reconstruction
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-l-2 border-stone-200 bg-stone-50/30">
            <div className="flex gap-5 items-start">
              <Info className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Notice: All signals processed via the <span className="text-stone-600">DeepSerch</span> core are subject to algorithmic margins of error. Verification remains essential.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Forensic Intelligence */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="paper-panel p-20 flex flex-col items-center justify-center min-h-[600px] text-center bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
              <div className="w-24 h-24 border-2 border-[#121212] flex items-center justify-center mb-10 relative">
                <div className="absolute -inset-4 border border-stone-100 animate-[ping_2s_infinite]"></div>
                <Search className="w-10 h-10 text-[#121212] animate-pulse" />
              </div>
              <h3 className="text-2xl font-black serif uppercase mb-6 tracking-tight">Signal Acquisition</h3>
              <div className="w-full max-w-sm space-y-6">
                <div className="h-[2px] bg-stone-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#121212] w-1/4 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-stone-300">
                  <span className="text-left animate-pulse">Frequency Check...</span>
                  <span className="text-right opacity-50">Raster Mapping...</span>
                </div>
              </div>
            </div>
          ) : results ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Verdict Header */}
              <div className="border-b-4 border-[#121212] pb-10 flex flex-col md:flex-row items-baseline justify-between gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 block mb-4">Official Classification</span>
                  <h2 className={`text-6xl font-black serif uppercase leading-none ${
                    results.label === 'FAKE' ? 'text-red-700' : 
                    results.label === 'REAL' ? 'text-stone-900' : 'text-amber-700'
                  }`}>
                    {results.label === 'FAKE' ? 'Synthetic' : results.label}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 block mb-2">Confidence Score</span>
                  <span className="text-5xl font-black tabular-nums tracking-tighter">{results.overallConfidence}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="paper-panel p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-8 flex items-center gap-3">
                    <Fingerprint className="w-4 h-4 text-[#121212]" /> Forensic Radar
                  </h3>
                  <ForensicChart result={results} />
                </div>

                <div className="paper-panel p-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-8 flex items-center gap-3">
                    <FileSearch className="w-4 h-4 text-[#121212]" /> Analysis Vectors
                  </h3>
                  <div className="space-y-8">
                    {Object.entries(results.layers).map(([key, layer]) => (
                      <div key={key} className="group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className={`text-[9px] font-black px-2 py-1 uppercase tracking-widest ${
                            layer.status === 'Pass' ? 'bg-stone-50 text-stone-400' :
                            layer.status === 'Fail' ? 'bg-red-700 text-white' :
                            'bg-amber-100 text-amber-800'
                          }`}>{layer.status}</span>
                        </div>
                        <div className="h-0.5 bg-stone-50 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-[1.5s] ease-out ${
                              layer.status === 'Fail' ? 'bg-red-700' : 'bg-[#121212]'
                            }`} 
                            style={{ width: `${layer.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="paper-panel p-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-[#121212]" /> Summary of Findings
                </h3>
                <p className="serif text-2xl leading-[1.6] text-stone-800 italic font-medium">
                  "{results.reasoning}"
                </p>
                {results.sourceInference && (
                  <div className="mt-12 pt-8 border-t border-stone-100 flex items-center gap-6">
                    <div className="p-3 bg-stone-50 border border-stone-100">
                      <Zap className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-1">Source Inference</span>
                      <p className="text-sm font-black text-[#121212] uppercase tracking-tighter">{results.sourceInference}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <Button variant="primary" className="py-6 shadow-2xl" onClick={() => setShowGuide(true)}>
                    Protocol Guide
                 </Button>
                 <Button variant="secondary" className="py-6" onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}>
                    Portal Access
                 </Button>
              </div>
            </div>
          ) : (
            <div className="paper-panel p-20 flex flex-col items-center justify-center min-h-[600px] text-center border-dashed border-2 bg-stone-50/10">
              <div className="w-20 h-20 bg-white shadow-sm flex items-center justify-center mb-10 border border-stone-100">
                <FileSearch className="w-8 h-8 text-stone-200" />
              </div>
              <h3 className="text-2xl font-black serif uppercase mb-4 tracking-tight">System Ready</h3>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] max-w-xs mx-auto leading-loose">
                Awaiting input data. Submission required for neural verification and forensic scoring.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Editorial Footer */}
      <footer className="mt-40 border-t-2 border-[#121212] pt-16 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="max-w-md">
          <Logo />
          <p className="mt-8 text-[11px] text-stone-400 font-bold uppercase tracking-[0.2em] leading-[2.2]">
            DeepSerch is a forensic asset identification platform utilizing multi-modal vision models. Intelligence provided is for professional validation and awareness. Built for the modern integrity landscape.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-24 text-[10px] font-black uppercase tracking-[0.4em]">
          <div className="space-y-6">
            <h5 className="text-[#121212]">Resources</h5>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#" className="hover:text-[#121212] transition-colors">Methology</a></li>
              <li><a href="#" className="hover:text-[#121212] transition-colors">Forensic API</a></li>
              <li><a href="#" className="hover:text-[#121212] transition-colors">Benchmarks</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-[#121212]">Protocol</h5>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#" className="hover:text-[#121212] transition-colors">Compliance</a></li>
              <li><a href="#" className="hover:text-[#121212] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[#121212] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Guide Modal Overlay */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm">
          <div className="bg-[#FDFCFB] paper-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto p-12 relative shadow-[0px_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <button 
              onClick={() => setShowGuide(false)}
              className="absolute top-8 right-8 p-2 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CyberComplaintGuide />
            <div className="mt-12 flex justify-end">
              <Button onClick={() => setShowGuide(false)}>Dismiss</Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}
