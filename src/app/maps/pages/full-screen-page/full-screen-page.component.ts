import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
  } from '@angular/core';
  import { Map, MapStyle, config } from '@maptiler/sdk';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements  AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  divMap?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
    
    if(!this.divMap){
      throw 'El elmemento divMap no esta definido';
    }
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

}
