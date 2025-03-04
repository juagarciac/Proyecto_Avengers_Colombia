package com.DesarrolloWeb.AvengersColombia.service;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Aviso;
import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Importancia;
import com.DesarrolloWeb.AvengersColombia.objetos.aviso.PanelAvisos;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.DesarrolloWeb.AvengersColombia.repository.PanelAvisosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CaseService {

    @Autowired
    private PanelAvisosRepository panelAvisosRepository;

    // Permite a un usuario crear un "caso" (aviso)
    @Transactional
    public Aviso createCase(String titulo, String descripcion, String categoria, String imagenR, Importancia importancia, Usuario creador) {
        // Se asume que se ha modificado Aviso para incluir un campo 'creador'
        PanelAvisos panel = panelAvisosRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> panelAvisosRepository.save(new PanelAvisos()));
        Aviso aviso = new Aviso(titulo, descripcion, categoria, imagenR, importancia, panel);
        // Se podría asignar: aviso.setCreador(creador);
        panel.getAvisos().add(aviso);
        panelAvisosRepository.save(panel);
        return aviso;
    }

    // Devuelve la lista de "casos" abiertos (avisos disponibles) para superhéroes.
    public List<Aviso> getOpenCases() {
        PanelAvisos panel = panelAvisosRepository.findAll().stream()
                .findFirst()
                .orElse(new PanelAvisos());
        return panel.getAvisosD();
    }

    // Permite que un superhéroe acepte un caso.
    // También marca el aviso como no disponible y crea un chat
    @Transactional
    public Long acceptCase(int avisoId, SuperHeroe heroe) {
        // Se asume la obtención del aviso y luego se marca como tomado:
        Aviso aviso = panelAvisosRepository.findAll().stream()
                .flatMap(panel -> panel.getAvisos().stream())
                .filter(a -> a.getId() == avisoId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
        if (!aviso.isDisponible()) {
            throw new RuntimeException("Caso ya fue tomado");
        }
        aviso.setDisponible(false);
        panelAvisosRepository.save(aviso.getPanelAvisos());
        // Se procede a crear un chat entre el usuario (creador) y el superhéroe.
        // Se asume la existencia de ChatService (ver abajo) que crea el chat y retorna su id.
        // Por simplicidad, se retorna el id del chat creado.
        return 0L; // Aquí debe invocarse chatService.createChat(usuarios involucrados)
    }
}