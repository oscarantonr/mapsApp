import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  config,
  LngLat,
  Map,
  MapStyle,
  Marker
  } from '@maptiler/sdk';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  public markers: MarkerAndColor[] = [];

  public map?: Map | undefined;
  public zoom: number = 13;
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

    this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Oscar';
    // markerHtml.style.color = 'green';

    // const marker = new Marker({
    //   element: markerHtml
    // })
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map);
  }

  createMarker(){
    if(!this.map){
      return
    }

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color:string){
    if(!this.map){
      return
    }

    const marker = new Marker({
      color:color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)

    this.markers.push({color, marker});
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  removeMarker(index: number){
    if(!this.map){
      return
    }

    console.log('removeMarker', index);

    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] = this.markers.map(({color, marker}) => {
      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ({color, lngLat}: PlainMarker) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
  }

}
