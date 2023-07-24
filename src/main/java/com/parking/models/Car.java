package com.parking.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "carros")
@Data
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "brand")
    private String brand;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "property")
    private String property;

    @Column(name = "origin")
    private String origin;

    @Column(name = "date_time")
    private java.sql.Date dateTime;

    @Column(name = "pay")
    private Float pay;

    @Column(name = "credit")
    private Float credit;
}
