package com.shop.zai.service;

import com.shop.zai.config.JWTService;
import com.shop.zai.controller.AuthenticationRequest;
import com.shop.zai.controller.AuthenticationResponse;
import com.shop.zai.controller.RegisterRequest;
import com.shop.zai.entity.Cart;
import com.shop.zai.entity.Client;
import com.shop.zai.entity.Role;
import com.shop.zai.repository.CartRepository;
import com.shop.zai.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final ClientRepository clientRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request){
        var client= Client.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .username(request.getUsername())
                .build();
        clientRepository.save(client);
        var jwToken=jwtService.generateToken(client);
        Cart cart=new Cart();
        cart.setClient(client);
        cartRepository.save(cart);
        return AuthenticationResponse.builder()
                .token(jwToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var client=clientRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwToken=jwtService.generateToken(client);
        var role=client.getRole();
        var id=client.getId();
        var username=client.getUsername();
        return AuthenticationResponse.builder()
                .role(role.toString())
                .username(username)
                .id(id)
                .token(jwToken)
                .build();
    }
}
