package br.com.tutum.catalogo_api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // No need to declare findAll() - it's inherited from JpaRepository
}

