import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
  } from '@angular/core';
import { LngLat, Map, MapStyle } from '@maptiler/sdk';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements  AfterViewInit, OnDestroy {
  public map?: Map | undefined;
  public zoom: number = 10;
  public currentLngLat: LngLat = new LngLat(139.753, 35.6844)

  @ViewChild('map')
  divMap?: ElementRef<HTMLElement>;

  ngAfterViewInit() {   
    if(!this.divMap){
      throw 'El elmemento divMap no esta definido';
    }
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if(!this.map){
      throw 'El mapa no esta definido';
    }

    this.map.on('zoom', () => {
      if(!this.map){
        throw 'El mapa no esta definido';
      }
      this.zoom = this.map.getZoom();
      console.log('Nivel de zoom actual:', this.zoom);
    });

    this.map.on('zoomend', () => {
      if(this.map!.getZoom() < 18){
        return
      } else{
        this.map?.zoomTo(18);
      }
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      console.log(this.currentLngLat);
    })
  }

  onZoomChange(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }
}
