import { Injectable } from '@angular/core';
import { WindowRef } from 'app/services/windowRef/window-ref';


@Injectable()
export class ConfigService {

  private screenSizes = {
    maxSmallScreenWidth: 850,
    maxMediumScreenWidth: 1200
  }

  constructor(private winRef: WindowRef){}
  
  getscreenSizes(){
    return this.screenSizes;
  }

  getCerrentScreenWidth() {
    return this.winRef.nativeWindow.innerWidth;
  }

  shouldScrollPage(){
    if(this.getCerrentScreenWidth() > this.screenSizes.maxMediumScreenWidth){
      return false;
    }
    return true;
  }

}