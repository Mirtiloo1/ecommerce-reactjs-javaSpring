package br.universidade.loja.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Integer quantidadeDisponivel;

    public Produto(Long id, String nome, String descricao, BigDecimal preco, Integer quantidadeDisponivel) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public Produto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Integer getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }

    public void setQuantidadeDisponivel(Integer quantidadeDisponivel) {
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public void atualizarPreco(BigDecimal novoPreco) {
        this.setPreco(novoPreco);
    }

    public void adicionarEstoque(int quantidade) {
        if (quantidade > 0) {
            this.setQuantidadeDisponivel(this.getQuantidadeDisponivel() + quantidade);
        }
    }

    public void removerEstoque(int quantidade) {
        if (quantidade > 0 && this.getQuantidadeDisponivel() >= quantidade) {
            this.setQuantidadeDisponivel(this.getQuantidadeDisponivel() - quantidade);
        } else {
            throw new IllegalArgumentException("Quantidade insuficiente em estoque ou quantidade inválida para remoção.");
        }
    }

    public boolean verificarDisponibilidade(int quantidade) {
        return this.getQuantidadeDisponivel() >= quantidade;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", quantidadeDisponivel=" + quantidadeDisponivel +
                '}';
    }
}