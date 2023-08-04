package com.parking.controller;

import com.parking.dao.CarDao;
import com.parking.models.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ControllerParking {

    @Autowired
    private CarDao carDao;

    @GetMapping(value = "/api/cars")
    public List<Car> carList(){
        return carDao.getCars();
    }

    /*
    @RequestMapping(value = "/api/car/{id}", method = RequestMethod.DELETE)
    public void deleteCar(@PathVariable long id){
        carDao.deleteCar(id);
    }

     */

    @PostMapping(value = "/api/car")
    public void insertCar(@RequestBody Car car){
        carDao.insertCar(car);
    }


    @PutMapping(value = "/api/car/{licensePlate}")
    public void updateCar(@PathVariable String licensePlate){
        carDao.updateCar(licensePlate);
    }

    @GetMapping(value = "/api/car/{licensePlate}")
    public Car getCar(@PathVariable String licensePlate){
        return carDao.getCar(licensePlate);
    }
}
