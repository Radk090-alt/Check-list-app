import {Photo} from './Photo';

export interface Checklist {
  steps: Step[];
  checklist_id: string;
  machine: string;
  lastCheck: any;
}

export interface Step {
  id: string;
  title: string;
  required: boolean;
  photos: Photo[];
  answer: string;
  comment: string;
  has_comment: boolean;
  comment_required: boolean;
  info_text: string;
  options?: string[];
  type: string | null;
  category_id: string;
  category_name: string;

  minPhotos: number;
  assignedPhotos: number;
  maxPhotos: number;
}
