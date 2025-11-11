package br.com.tutum.catalogo_api;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {
    
    private final ProdutoRepository repositorio;

    public ProdutoController(ProdutoRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return repositorio.findAll();
    }

    @PostMapping
    public Produto criarProduto(@RequestBody Produto produto) {
        return repositorio.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoDetalhes) {

        Optional<Produto> optionalProduto = repositorio.findById(id);
        if (optionalProduto.isPresent()) {
            Produto produtoExistente = optionalProduto.get();
            produtoExistente.setNome(produtoDetalhes.getNome());
            produtoExistente.setPreco(produtoDetalhes.getPreco());
            final Produto produtoAtualizado = repositorio.save(produtoExistente);
            return ResponseEntity.ok(produtoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        repositorio.deleteById(id);
        return ResponseEntity.ok().build();
    }

    

}
