import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CommonRepository {
    baseUrl = "http://localhost:1854/v1/api/knmi/images/";

    imgChris: HTMLImageElement;
    imgGretel: HTMLImageElement;
    imgKnmi: HTMLImageElement;
    urlChris: string = 'http://localhost:1854/blurk.jpg';
    urlGretel: string = 'http://localhost:1854/flurk.jpg';
    urlKnmi: string = 'http://localhost:1854/knmi.png';
    currentParam: string;
    @Output() imgNotifier = new EventEmitter();

    constructor(private httpClient: HttpClient) {
        this.onInit();
    }
    
    onInit() {
        this.getImage('knmi-logo');
        this.getImage('Chris');
        this.getImage('Gretel');
    }
    
    getImage(imageName: string) {
        var imageUrl = this.baseUrl + imageName + ".png";
        console.log("Retrieving image from " + imageUrl);
        var headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'image/png');
        headers = headers.append('Accept', 'image/png');
        this.httpClient.get(imageUrl, {
            headers: headers,
            observe: "body",
            responseType: "blob"
        }).subscribe(
            (anImage: Blob) => {
                 if (anImage !== null) {
                     console.log('Image set with a size of ' + anImage.size + ' bytes');
                     var img = new Image();
                     var objUrl = window.URL.createObjectURL(anImage);
                     img.src = objUrl;
//                     let elem = document.getElementById("portrait");
//                     elem.innerHTML = '<img src="' + objUrl + '">';
                     console.log(objUrl);
                     if (imageName == 'Chris') {
                         this.imgChris = img;
                         this.urlChris = objUrl;
                         this.imgChris.innerHTML = '<img src="' + objUrl + '">';
                         console.log('Image of Chris Buys Ballot retrieved');
                     } else if (imageName == 'Gretel') {
                         this.imgGretel = img;
                         this.urlGretel = objUrl;
                         this.imgGretel.innerHTML = '<img src="' + objUrl + '">';
                         console.log('Image of Gretel Thunberg retrieved');
                     } else {
                         this.imgKnmi = img;
                         this.urlKnmi = objUrl;
                         this.imgKnmi.innerHTML = '<img src="' + objUrl + '">';
                         console.log('Image of KNMI-logo retrieved');
                         this.imgNotifier.emit();
                     }
//                     elem = img; 
                 } else {
                     console.log('Sorry, could not set this f**king image...');                     return null;
                 }
            });
    }
}