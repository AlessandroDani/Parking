package com.parking.dao;

import com.parking.models.Car;
import java.util.List;

public interface CarDao {
    void insertCar(Car car);
    void deleteCar(long id);
    List<Car> getCars(long id);
    Car getCar(String licensePlate, long id);
    void updateCar(String licensePlate);
}
