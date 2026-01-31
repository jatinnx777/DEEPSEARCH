
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../types';

export const ForensicChart: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const data = [
    { subject: 'ML Detection', A: result.layers.mlDetection.score, full: 100 },
    { subject: 'Face Consistency', A: result.layers.faceConsistency.score, full: 100 },
    { subject: 'Metadata', A: result.layers.metadataForensics.score, full: 100 },
    { subject: 'Watermark', A: result.layers.watermarkSource.score, full: 100 },
    { subject: 'Overall', A: result.overallConfidence, full: 100 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E5E0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 10, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Forensics"
            dataKey="A"
            stroke="#1A1A1A"
            fill="#1A1A1A"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};