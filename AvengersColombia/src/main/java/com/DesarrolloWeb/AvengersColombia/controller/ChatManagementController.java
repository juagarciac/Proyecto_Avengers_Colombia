package com.DesarrolloWeb.AvengersColombia.controller;

import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*")
public class ChatManagementController {

    @Autowired
    private ChatService chatService;

    // Obtener lista de chats para una cuenta (usuario o superhéroe)
    @GetMapping("/user/{cuentaId}")
    public ResponseEntity<List<Chat>> getChatsForUser(@PathVariable int cuentaId) {
        return ResponseEntity.ok(chatService.getAllChatsForUser(cuentaId));
    }

    // Enviar mensaje en un chat
    @PostMapping("/{chatId}/mensaje")
    public ResponseEntity<Mensaje> sendMessage(@PathVariable Long chatId, @RequestBody MensajeRequest request) {
        Mensaje mensaje = chatService.sendMessage(chatId, request.getAutorId(), request.getTexto());
        return ResponseEntity.ok(mensaje);
    }

    // Eliminar un chat (expulsa a los participantes)
    @DeleteMapping("/{chatId}")
    public ResponseEntity<?> deleteChat(@PathVariable Long chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.ok("Chat eliminado");
    }

    public static class MensajeRequest {
        private int autorId;
        private String texto;
        public int getAutorId() { return autorId; }
        public void setAutorId(int autorId) { this.autorId = autorId; }
        public String getTexto() { return texto; }
        public void setTexto(String texto) { this.texto = texto; }
    }
}
