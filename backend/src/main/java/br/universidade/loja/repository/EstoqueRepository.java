package br.universidade.loja.repository;

import br.universidade.loja.model.Estoque;
import br.universidade.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
    Optional<Estoque> findByProduto(Produto produto);
}