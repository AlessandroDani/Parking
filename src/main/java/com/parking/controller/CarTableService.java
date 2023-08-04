package com.parking.controller;

import com.parking.models.User;
import jakarta.persistence.PostPersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CarTableService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostPersist
    public void createCarTable(User user) {
        // Obtener el id del usuario recién registrado
        Long userId = user.getId();

        // Crear la tabla de carros para el usuario utilizando el id como parte del nombre de la tabla
        String createTableQuery = "CREATE TABLE cars_user_" + userId + " ("
                + "license_plate VARCHAR(15) PRIMARY KEY,"
                + "model VARCHAR(50),"
                + "brand VARCHAR(50),"
                + "property VARCHAR(40),"
                + "origin VARCHAR(50),"
                + "date_time date,"
                + "pay FLOAT,"
                + "credit FLOAT,"
                + "active INT(1),"
                + "room INT(6)"
                + ")";
        jdbcTemplate.execute(createTableQuery);
    }
}
