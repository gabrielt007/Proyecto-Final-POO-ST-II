package com.example.pelicula_api.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/peliculas")
public class PeliculaController {

    @GetMapping("/ping")
    public String ping() {
        return "pong 🏓 API viva y coleando";
    }
}