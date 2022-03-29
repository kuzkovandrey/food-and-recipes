import { Step } from './step.model';

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}
