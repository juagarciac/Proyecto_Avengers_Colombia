package com.DesarrolloWeb.AvengersColombia.service;

import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import com.DesarrolloWeb.AvengersColombia.repository.ChatRepository;
import com.DesarrolloWeb.AvengersColombia.repository.CuentaRepository;
import com.DesarrolloWeb.AvengersColombia.repository.PanelAvisosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private CuentaRepository cuentaRepository;

    public List<Chat> getAllChatsForUser(int cuentaId) {
        return chatRepository.findByParticipantesId(cuentaId);
    }

    @Transactional
    public Chat createChat(List<Integer> participantesIds) {
        // Se obtiene la lista de cuentas a partir de sus IDs
        List<Cuenta> participantes = new ArrayList<>();
        for (Integer id : participantesIds) {
            Cuenta cuenta = cuentaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Cuenta con id " + id + " no encontrada"));
            participantes.add(cuenta);
        }
        // Crear un nuevo Chat con la lista de participantes y lista vacía de mensajes
        Chat chat = new Chat(new ArrayList<>(), participantes);
        return chatRepository.save(chat);
    }

    @Transactional
    public Mensaje sendMessage(Long chatId, int autorId, String texto) {
        // Lógica para enviar un mensaje en el chat
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
        Mensaje mensaje = new Mensaje(); // Asignar autor, texto y chat
        chat.enviarMensaje(mensaje);
        return mensaje;
    }

    @Transactional
    public void deleteChat(Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
        // Se elimina el chat y, al tener cascade, se expulsan a los participantes
        chatRepository.delete(chat);
    }
}