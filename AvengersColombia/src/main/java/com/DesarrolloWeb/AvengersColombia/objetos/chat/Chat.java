package com.DesarrolloWeb.AvengersColombia.objetos.chat;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mensaje> mensajes;
    @ManyToMany
    @JoinTable(
            name = "chat_participantes",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "cuenta_id")
    )
    private List<Cuenta> participantes;
    @Column
    private final LocalDateTime fechaCreacion;

    protected Chat() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Chat(List<Mensaje> mensajes, List<Cuenta> participantes) {
        this.mensajes = mensajes;
        this.participantes = participantes;
        this.fechaCreacion =  LocalDateTime.now();;
    }

    public void enviarMensaje(Mensaje mensaje) {
        mensajes.add(mensaje);
    }

    public List<Cuenta> obtenerParticipantes() {
        return participantes;
    }

    public List<Mensaje> recibirMensajes() {
        return mensajes;
    }
}
