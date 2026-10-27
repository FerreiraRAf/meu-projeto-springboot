package com.produtoapi.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;

@Entity
@JsonPropertyOrder({"id_produto", "nome_produto", "quantidade", "preco","status"})
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_produto;

    @NotEmpty(message = "Informe um nome.")
    private String nome_produto;
    private int quantidade;
    private double preco;
    private String status;

    public Produto (String nome, int quantidade, double preco, String status) {
        nome_produto = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.status = status;
    }

    public Produto() {
        // Construtor vazio
    }

    public long getId_produto() {
        return id_produto;
    }

    public void setId_produto(long id_produto) {
        this.id_produto = id_produto;
    }

    public String getNome_produto() {
        return nome_produto;
    }

    public void setNome_produto(String nome_produto) {
        this.nome_produto = nome_produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPreco() { return preco; }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}