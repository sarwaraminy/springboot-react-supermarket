package com.shops.supermarket.service;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    private static final String SECRET_KEY = "Love + Give + Serve + Enjoy this is First Rate Values";

    public String extractEmailFromToken(String token) {
        String tokenWithoutStarter = token.replace("FRPBearer ", "");

        // Parse the token to extract claims
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(tokenWithoutStarter)
                .getBody();

        return claims.getSubject(); // Assuming the subject contains the email
    }
}

