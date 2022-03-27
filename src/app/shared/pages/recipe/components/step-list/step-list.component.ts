import { Component, Input } from '@angular/core';
import { AnalyzedInstruction } from '@core/models/analyzed-instruction.model';

@Component({
  selector: 'step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss'],
})
export class StepListComponent {
  @Input() instructions: AnalyzedInstruction[];

}
