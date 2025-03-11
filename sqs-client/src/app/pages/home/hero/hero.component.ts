import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../_services/cms.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  public colored_title: string = '';
  public title: string = '';
  public subtitle: string = '';
  constructor(public cms: CmsService) { }
  public ngOnInit(): void {
    this.cms.getContent().subscribe((content: any) => {
      this.colored_title = content.data.colored_title;
      this.title = content.data.title;
      this.subtitle = content.data.subtitle_html[0].children[0].text;
      console.log(content);
    });
  }
}
