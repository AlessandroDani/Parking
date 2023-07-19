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
    public void deleteList(@PathVariable long id){
        carDao.deleteCar(id);
    }
}
