package com.parking.dao;

import com.parking.models.Car;

public interface CarDao {
    void insertCar(Car car);
    void eliminarCar(long id);

}
