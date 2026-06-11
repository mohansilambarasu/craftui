export interface ComponentHistory {
  id: string;
  prompt: string;
  code: string;
  timestamp: Date;
}

export type PreviewMode = 'preview' | 'code';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface PromptTemplate {
  label: string;
  prompt: string;
  icon: string;
}