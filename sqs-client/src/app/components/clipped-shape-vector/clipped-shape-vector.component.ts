import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clipped-shape-vector',
  standalone: false,
  templateUrl: './clipped-shape-vector.component.html',
  styleUrl: './clipped-shape-vector.component.scss'
})
export class ClippedShapeVectorComponent {

  @Input() public vectorType: 'scratch-cards' | 'casino' | 'lottery' | 'dice' | 'poker' = 'scratch-cards';
}
