package com.parking.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponse {
    private String tokenJwt;
    private Long userId;
    private String name;
    private String lastName;
}
