package com.parking.controller;

import com.parking.dao.CarDao;
import com.parking.models.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ParkingController {

    @Autowired
    private CarDao carDao;

    @GetMapping(value = "/api/cars/{id}")
    public List<Car> carList(@PathVariable long id){
        return carDao.getCars(id);
    }

    /*
    @RequestMapping(value = "/api/car/{id}", method = RequestMethod.DELETE)
    public void deleteCar(@PathVariable long id){
        carDao.deleteCar(id);
    }

     */

    @PostMapping(value = "/api/car/{id}")
    public void insertCar(@RequestBody Car car, @PathVariable long id){
        car.setId_user(id);
        carDao.insertCar(car);
    }


    @PutMapping(value = "/api/car/{licensePlate}")
    public void updateCar(@PathVariable String licensePlate){
        carDao.updateCar(licensePlate);
    }

    @GetMapping(value = "/api/car/{id}/{licensePlate}")
    public Car getCar(@PathVariable long id, @PathVariable String licensePlate){
        return carDao.getCar(licensePlate, id);
    }
}
