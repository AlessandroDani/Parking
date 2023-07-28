package com.parking.dao;

import com.parking.models.Car;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository //Acceder al repositorio de la base de datos
@Transactional // como va a ejecutar las consultas de SQL
public class CarServices implements CarDao{

    @PersistenceContext
    EntityManager entityManager;


    @Override
    public void insertCar(Car car) {
        entityManager.merge(car);
    }

    @Override
    public void deleteCar(long id) {
        Car car = entityManager.find(Car.class, id);
        entityManager.remove(car);
    }

    @Override
    @Transactional
    public List<Car> getCars() {
        String query = "FROM Car WHERE active  = true";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Car getCar(String licensePlate) {
        return entityManager.find(Car.class, licensePlate);
    }

    @Override
    public void updateCar(String licensePlate) {
        Car carExist = entityManager.find(Car.class, licensePlate);
        carExist.setActive(false);
    }
}
