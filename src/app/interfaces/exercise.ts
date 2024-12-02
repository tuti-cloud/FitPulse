export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  series?: number; // Nuevo campo para series
  reps?: number;   // Nuevo campo para repeticiones
  completed?:boolean
}

  