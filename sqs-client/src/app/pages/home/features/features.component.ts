import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../_services/cms.service';

@Component({
  selector: 'app-features',
  standalone: false,
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements OnInit {
  public features: IFeatureCMS[] = [];
  constructor(public cms: CmsService) { }
  public ngOnInit(): void {
    this.cms.getMultiContent().subscribe((content: any) => {
      this.features = content.data;
      console.log(content);
    });
  }
}

export interface IFeatureCMS {
  features_title?: string;
  features_icon?: string;
  features_desc?: string;
} 
