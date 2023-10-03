package com.shop.zai.service;

import com.shop.zai.entity.Client;
import com.shop.zai.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@Service
@RequiredArgsConstructor
public class ClientsService {
    private final ClientRepository clientRepository;

    public List<Client> findAll(){
        return clientRepository.findAll();
    }

    public Client findClientById(int id){
        return clientRepository.findClientById(id);
    }

    public void saveClient(Client client){
        clientRepository.save(client);
    }

    public Long deleteClientById(int id){return clientRepository.deleteClientById(id);}
}
