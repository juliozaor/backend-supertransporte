export class Estados {
  public obtenerEstado(termino: string): number[] {
    const ids: number[] = [];
    const estadosL = [
      { id: 3, estado: "Validado" },
      { id: 4, estado: "Pendiente por reevaluacion" },
      { id: 6, estado: "Validado Cumple" },
      { id: 7, estado: "Validado No cumple" },
      { id: 1, estado: "Pendiente validación" },
      { id: 2, estado: "En proceso Validación" },
      { id: 8, estado: "Validado no obligado" },
      { id: 9, estado: "Aprobado]" },
      { id: 1001, estado: "Inactivo" },
      { id: 1002, estado: "Inicio" },
      { id: 1003, estado: "En proceso" },
      { id: 1004, estado: "Finalizado" },
      { id: 1005, estado: "En proceso" },
      { id: 1010, estado: "Inicio sesión exitoso" },
      { id: 1011, estado: "Inicio de sesión fallido" },
    ];

    //const estados = estadosL.find((e) => e.estado.includes(termino));
    //const estados = estadosL.find(e => e.estado.toLowerCase().includes(termino.toLowerCase()));
    const estados = estadosL.filter(e => e.estado.toLowerCase().includes(termino.toLowerCase()));
    estados.forEach((e) => {
      ids.push(e.id);
    });


    return ids;
  }
}
