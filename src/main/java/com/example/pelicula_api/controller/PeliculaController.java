package com.example.pelicula_api.controller;

import com.example.pelicula_api.entity.Pelicula;
import com.example.pelicula_api.service.PeliculaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/peliculas")
public class PeliculaController {

    private final PeliculaService peliculaService;

    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    //LISTAR TODAS
    @GetMapping
    public List<Pelicula> listar() {
        return peliculaService.listar();
    }

    //GUARDAR (VALIDACIONES ACTIVAS)
    @PostMapping
    public Pelicula guardar(@Valid @RequestBody Pelicula pelicula) {
        return peliculaService.guardar(pelicula);
    }

    //BUSCAR POR ID
    @GetMapping("/{id}")
    public Pelicula buscarPorId(@PathVariable Long id) {
        return peliculaService.buscarPorId(id);
    }


    //ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        peliculaService.eliminar(id);
    }

}
