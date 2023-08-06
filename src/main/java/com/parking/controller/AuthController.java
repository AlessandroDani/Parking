package com.parking.controller;

import com.parking.dao.UserDao;
import com.parking.models.AuthResponse;
import com.parking.models.User;
import com.parking.util.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    public UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(value = "/api/login")
    public AuthResponse login(@RequestBody User user) {
        try {
            AuthResponse auth = new AuthResponse();
            User logginUser = userDao.getUserByCredentials(user);
            String tokenJwt = jwtUtil.create(String.valueOf(logginUser.getId()), logginUser.getEmail());
            auth.setTokenJwt(tokenJwt);
            auth.setUserId(logginUser.getId());
            auth.setName(logginUser.getName());
            auth.setLastName(logginUser.getLastName());
            return auth;
        }catch(Exception e){
            return null;
        }
    }

    @PostMapping(value = "/api/user")
    public void registerUser(@RequestBody User user) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);

        userDao.signUpUser(user);
    }

}
