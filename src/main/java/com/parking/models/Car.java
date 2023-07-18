package com.parking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Car {

    @Id
    @Getter @Setter
    private Long id;
    @Getter @Setter
    private String model;
    @Getter @Setter
    private String brand;
    @Getter @Setter
    private String licensePlate;
    @Getter @Setter
    private String property;
    @Getter @Setter
    private String origin;
    @Getter @Setter
    private Date dateTime;
    @Getter @Setter
    private Long pay;
}
