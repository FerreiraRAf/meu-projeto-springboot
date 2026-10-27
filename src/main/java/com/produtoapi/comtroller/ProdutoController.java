package com.produtoapi.comtroller;

import com.produtoapi.model.Produto;
import com.produtoapi.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:63342", "http://127.0.0.1:5500"})
@RestController
@RequestMapping("/produtos") // http://localhost:8080/produtos
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    @PostMapping
    public Produto salvar(@Valid @RequestBody Produto produto){
        return produtoService.salvar(produto);
    }

//    @PostMapping("/slavarLista")
//    public List<Produto> slavarLista(@RequestBody List<Produto> produtos) { return  produtoService.slavarLista(produtos); }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @RequestBody Produto produto){
        return produtoService.atualizar(id, produto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        produtoService.deletar(id);
    }

    @GetMapping("/{id}")
    public Optional<Produto> findById(@PathVariable Long id){
        return produtoService.findById(id);
    }
}