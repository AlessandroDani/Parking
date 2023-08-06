package com.parking.dao;

import com.parking.models.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UserServices implements UserDao{

    @PersistenceContext
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

        if(argon2.verify(passwordHashed, user.getPassword())){
            return list.get(0);
        }

        return null;

    }

    @Override
    public void signUpUser(User user) {
        entityManager.merge(user);
    }
}
