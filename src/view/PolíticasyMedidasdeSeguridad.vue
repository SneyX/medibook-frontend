<template>
   <div class="poli">
      <h2>Políticas y Medidas de Seguridad para Médicos</h2>
      <pre>
         1. Reservas de Consultorios 
            - Realizar reservas con antelación para garantizar disponibilidad. Notificar cualquier cambio en la programación de consultas.
            - Confirmar manualmente todas las citas programadas. Responder a los recordatorios automáticos de confirmación. No realizar reservas innecesarias.

         2. Cancelaciones y Reprogramaciones
            - Cancelar con al menos 24 horas de antelación cuando sea necesario. Reprogramar con al menos 48 horas de antelación, sujeto a disponibilidad.

         3. Confirmacion Automatica
            - Responder a los recordatorios automáticos para confirmar las citas.

         4. Acceso Seguro al Sistema
            - Proteger la información de acceso al sistema. Cerrar sesión en dispositivos compartidos.

         5. Comportamiento Ético
            - Mantener un comportamiento respetuoso y cortés en todas las interacciones.

         6. Uso Responsable del Sistema
            - Utilizar el sistema de manera ética y responsable.

         7. Actualización de Información
            - Mantener la información médica actualizada en el sistema. Actualizar regularmente los datos de contacto.

         8. Soporte Técnico
            - Contactar al soporte técnico en caso de problemas o dudas.

         9. Protección de Datos del Paciente
            - Cumplir con las regulaciones de privacidad y protección de datos. No compartir información confidencial con terceros.

         10. Acceso Controlado a la Información
            - Acceder solo a la información necesaria para realizar consultas. Reportar cualquier actividad sospechosa o acceso no autorizado.

         11. Cuidados de Salud e Higiene en las Salas
            - Seguir estrictamente las prácticas de higiene y desinfección en las salas. Utilizar equipo de protección personal (EPP) adecuado. Desinfectar superficies y equipos después de cada consulta.
      </pre>
   </div>
</template>

<script>
export default {
   name: "PolíticasyMedidasdeSeguridad",
   computed: {
   theme() {
      return this.$store.getters.getTheme
      },
   },
   data() {},
   created() {},
   methods: {},
};
</script>

<style scoped>
   .poli {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 50px;
   }
   .poli pre {
      text-align: left;
      margin-top: 2vw;
   }
</style>
