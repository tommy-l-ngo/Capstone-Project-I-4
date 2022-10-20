import React, {useState} from 'react';
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import $ from 'jquery';
//window.$ = $;

$(document).ready(function(){

    let i = 0;

    var bannerStorageRef = ref();

    const fullPath = window.location.href;
    const projectPath = fullPath.substring(fullPath.lastIndexOf('/') + 1)
    bannerStorageRef.child(`projects/${projectPath}/`).listAll().then(function(result){

        result.items.forEach(function(imageRef){
            console.log(imageRef.toString())
            imageRef.getDownloadURL().then(function(downloadURL){
                i++;
                var active = i==1? "active" : "";
                $('<div class="item '+active+'"><img src="'+ downloadURL+'"></div>')
                .appendTo('.carousel-inner');
                $('<li data-target="#myCarousel" data-slide-to="'+i+'" ></li>').
                appendTo('.carousel-indicators');
            })
            $('#myCarousel').carousel();
        })
    })
})