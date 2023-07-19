package com.parking.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "carros")

@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;

    @Getter @Setter @Column(name = "model")
    private String model;

    @Getter @Setter @Column(name = "brand")
    private String brand;

    @Getter @Setter @Column(name = "license_plate")
    private String licensePlate;

    @Getter @Setter @Column(name = "property")
    private String property;

    @Getter @Setter @Column(name = "origin")
    private String origin;

    @Getter @Setter @Column(name = "date_time")
    private java.sql.Date dateTime;

    @Getter @Setter @Column(name = "pay")
    private Long pay;
}
