package com.shop.zai.controller;

import com.shop.zai.entity.Client;
import com.shop.zai.entity.Role;
import com.shop.zai.service.CartService;
import com.shop.zai.service.ClientsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/other")
@RequiredArgsConstructor
public class ClientsController {
    private final ClientsService clientsService;
    private final CartService cartService;

    @GetMapping("/clients")
    List<Client> findAll(){
        return clientsService.findAll();
    }

    @PostMapping("update-by-id/{id}/{username}/{email}/{role}")
    int updateClientById(@PathVariable int id, @PathVariable String username, @PathVariable String email, @PathVariable Role role){
        Client client=clientsService.findClientById(id);
        client.setUsername(username);
        client.setEmail(email);
        client.setRole(role);
        clientsService.saveClient(client);
        return id;
    }

    @PostMapping("delete-by-id/{id}")
    Long deleteById(@PathVariable int id){
        cartService.deleteCartByClientId(id);
        return clientsService.deleteClientById(id);
    }

}
