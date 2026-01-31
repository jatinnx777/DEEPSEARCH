
import React from 'react';
import { ExternalLink, Shield, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const CyberComplaintGuide: React.FC = () => {
  return (
    <div className="space-y-8 py-4">
      <div className="flex items-center gap-4 border-b-2 border-[#121212] pb-6">
        <Shield className="w-8 h-8 text-[#121212]" />
        <div>
          <h2 className="text-2xl font-black serif uppercase tracking-tight">Formal Protocol 091</h2>
          <p className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Cybercrime Escalation Guide</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-2">
            <FileText className="w-3.5 h-3.5" />
            01. Documentation
          </h3>
          <ul className="text-[11px] text-stone-600 space-y-3 leading-relaxed">
            <li className="flex gap-2">
              <span className="font-bold text-stone-900 shrink-0">I.</span>
              Preserve original media file in its unmodified state to maintain integrity of hash values.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-stone-900 shrink-0">II.</span>
              Log accurate timestamps and URLs where the synthetic media was encountered.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-stone-900 shrink-0">III.</span>
              Archive the Sentinel forensic report provided by DEEPSERCH as supplemental evidence.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
            02. Statement
          </h3>
          <div className="p-4 bg-stone-50 border border-stone-100 rounded-sm">
            <p className="text-[11px] text-stone-600 leading-relaxed italic">
              "When filing, specifically cite 'algorithmic manipulation' and 'GAN-based facial artifacts' as primary grounds for suspicion. Reference the confidence score to establish probable cause for manual review by authorities."
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-stone-900">Jurisdictional Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href="https://cybercrime.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-white border border-[#E8E6E1] hover:border-[#121212] transition-colors shadow-sm"
          >
            <div>
              <div className="text-[11px] font-black uppercase text-[#121212]">Cybercrime Portal (IN)</div>
              <div className="text-[9px] text-stone-400 font-bold tracking-wider">CYBERCRIME.GOV.IN</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-[#121212] transition-colors" />
          </a>
          <a 
            href="https://www.ic3.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-white border border-[#E8E6E1] hover:border-[#121212] transition-colors shadow-sm"
          >
            <div>
              <div className="text-[11px] font-black uppercase text-[#121212]">FBI IC3 (US)</div>
              <div className="text-[9px] text-stone-400 font-bold tracking-wider">IC3.GOV</div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-[#121212] transition-colors" />
          </a>
        </div>
      </div>

      <div className="flex gap-3 items-center p-4 border border-amber-100 bg-amber-50/30 rounded-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-[9px] text-amber-700 font-bold uppercase tracking-widest leading-relaxed">
          Warning: Submission of verified false claims to official entities constitutes a legal violation across major jurisdictions.
        </p>
      </div>
    </div>
  );
};