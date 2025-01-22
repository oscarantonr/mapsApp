import {
  Component,
  ElementRef,
  Input,
  ViewChild
  } from '@angular/core';
import { Map, MapStyle, Marker } from '@maptiler/sdk';

  interface MarkerAndColor {
    marker: Marker;
    color: string;
  }
  
@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {
  public markers: MarkerAndColor[] = [];

  public map?: Map | undefined;
  public zoom: number = 15;

  @Input() 
  lngLat?: [number, number];

  @ViewChild('map')
  divMap?: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    if(!this.divMap?.nativeElement) {throw 'Element divMap not found'};
    if(!this.lngLat) {throw 'LngLat is required'};

    const map = new Map({
      container: this.divMap.nativeElement,
      style: MapStyle.STREETS,
      center: this.lngLat,
      zoom: this.zoom,
      interactive: false
    });

    new Marker()
    .setLngLat(this.lngLat)
    .addTo(map)  
  }

}
