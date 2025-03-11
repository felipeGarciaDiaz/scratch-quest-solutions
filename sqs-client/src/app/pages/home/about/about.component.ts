import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../_services/cms.service';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  public about: string = '';
  constructor(public cms: CmsService) { }
  public ngOnInit(): void {
    this.cms.getContent().subscribe((content: any) => {
      this.about = content.data.About;
      console.log(content);
    });
  }
}
