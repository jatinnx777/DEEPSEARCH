
export interface AnomalyLocation {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  width: number;
  height: number;
  description: string;
}

export interface AnalysisResult {
  overallConfidence: number;
  label: 'REAL' | 'FAKE' | 'SUSPICIOUS';
  layers: {
    mlDetection: LayerScore;
    faceConsistency: LayerScore;
    metadataForensics: LayerScore;
    watermarkSource: LayerScore;
  };
  reasoning: string;
  sourceInference?: string;
  anomalies: string[];
  locations?: AnomalyLocation[]; // For heatmaps
}

export interface LayerScore {
  score: number;
  status: 'Pass' | 'Fail' | 'Suspicious';
  details: string;
}

export interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export interface MetadataInfo {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  dimensions?: string;
  exifData?: Record<string, any>;
}