package com.parking.controller;

import com.parking.dao.CarDao;
import com.parking.models.Car;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ControllerParking {

    @Autowired
    CarDao carDao;

    @GetMapping(value = "/api/cars")
    public List<Car> carList(){
        return carDao.getCars();
    }

    @RequestMapping(value = "/api/car/{id}", method = RequestMethod.DELETE)
    public void deleteCar(@PathVariable long id){
        carDao.deleteCar(id);
    }

    @RequestMapping(value = "/api/car", method = RequestMethod.POST)
    public void insertCar(@RequestBody Car car){
        carDao.insertCar(car);
    }

    @RequestMapping(value = "/api/car/{id}", method = RequestMethod.PUT)
    public void updateCar(@PathVariable Long id){
        carDao.updateCar(id);
    }


    @RequestMapping(value = "/api/car/{id}" , method = RequestMethod.GET)
    public Car getCar(@PathVariable long id){
        return carDao.getCar(id);
    }
}
