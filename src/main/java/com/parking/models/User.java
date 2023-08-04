package com.parking.models;

import com.parking.controller.CarTableService;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

@Entity
@EntityListeners(CarTableService.class)
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;


    public interface UserRepository extends JpaRepository<User, Long> {
        // Aquí puedes agregar consultas personalizadas si lo necesitas
    }

}
