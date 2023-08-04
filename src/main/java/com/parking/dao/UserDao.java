package com.parking.dao;

import com.parking.models.User;

public interface UserDao {

    User getUser(long id);

    User getUserByCredentials(User user);

    void signUpUser(User user);
}
