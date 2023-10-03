package com.shop.zai.repository;

import com.shop.zai.entity.Client;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client>findByEmail(String email);

    List<Client> findAll();

    Client findClientById(int id);

    @Transactional
    Long deleteClientById(int id);
}
