import { Component, Input } from '@angular/core';

interface SideNavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tecno-gestion';

  isSideNavCollapsed = false;
  screenWitdh = 0;

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWitdh = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  @Input() collapsed = false;
  @Input() screenWith = 0;

  getBodyClass():string{
    let styleClass = '';
    if(this.collapsed && this.screenWith > 768){
      styleClass = 'body-trimmed'
    }else if(this.collapsed && this.screenWith <= 768 && this.screenWith > 0){
      styleClass = 'body-md-screen'
    }
    return '';
  }
}
