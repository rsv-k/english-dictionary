export interface Word {
   id?: string;
   english: string;
   russian: string[];
   text?: string;
   pic_url?: string;
   createdAt?: number;
   setId?: string[];
   sound_url?: string;
   transcription?: string;
   learn: {
      wordTranslation?: boolean;
      translationWord?: boolean;
      savannah?: boolean;
      wordConstructor?: boolean;
      listening?: boolean;
      wordCards?: boolean;
   };
   isChecked?: boolean;
   ownerId: string;
}
