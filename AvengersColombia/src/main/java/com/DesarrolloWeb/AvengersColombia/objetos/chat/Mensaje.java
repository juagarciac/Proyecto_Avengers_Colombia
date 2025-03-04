package com.DesarrolloWeb.AvengersColombia.objetos.chat;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "mensajes")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Cuenta Autor;
    @Column
    private String texto;
    @Column
    private final LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    public Mensaje(Cuenta Autor, String texto) {
        this.Autor = Autor;
        this.texto = texto;
        this.fechaCreacion =  LocalDateTime.now();;
    }

    public Mensaje() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cuenta getAutor() {
        return Autor;
    }

    public String getTexto() {
        return texto;
    }
}



