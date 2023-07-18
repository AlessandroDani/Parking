package com.parking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerParking {

    @GetMapping(value = "")
    public String index(){
        return  "index";
    }
}
