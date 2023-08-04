package com.parking.dao;

import com.parking.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;

import java.util.List;

public class UserServices implements UserDao{

    EntityManager entityManager;

    @Override
    public User getUser(long id) {
        User user = entityManager.find(User.class, id);
        return user;
    }

    @Override
    public User getUserByCredentials(User user) {
        String query = "FROM User WHERE email = :email";
        List<User> list = entityManager.createQuery(query).setParameter("email", user.getEmail()).getResultList();
        if(list.isEmpty()){
            return null;
        }
        String passwordHashed = list.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if(argon2.verify(user.getPassword(), passwordHashed)){
            return user;
        }
        return null;

    }

    @Override
    public void signUpUser(User user) {
        entityManager.merge(user);
    }
}
