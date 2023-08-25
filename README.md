<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## Endpoints API

### Usuarios

- **Crear Usuario**
  - Método: POST
  - Ruta: `/api/usuarios`
  - Cuerpo(Ejemplo):
    ```
    {
      "nombre": "Juan",
      "correo": "juan@example.com"
    }

    ```
  
- **Obtener todos los Usuarios**
  - Método: GET
  - Ruta: `/api/usuarios`
  - Ejemplo de lo que viene:
    ```
    [
      {
          "id": 1,
          "nombre": "El Francis",
          "correo": "francisoc@gmail.com",
          "insignias": [
              {
                  "id": 14,
                  "fechaCompletado": "2023-08-25T12:50:57.000Z"
              },
              {
                  "id": 10,
                  "fechaCompletado": "2023-08-25T14:31:47.000Z"
              }
          ],
          "registroActividad": [
              {
                  "id": 1,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 2,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 3,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 4,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 5,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 21,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              }
          ]
      },
      {
          "id": 2,
          "nombre": "Xavi",
          "correo": "xavi@gmail.com",
          "insignias": [],
          "registroActividad": [
              {
                  "id": 6,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 7,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 8,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 9,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 10,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 22,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              }
          ]
      },
      {
          "id": 3,
          "nombre": "Edgar",
          "correo": "edgar@gmail.com",
          "insignias": [
              {
                  "id": 11,
                  "fechaCompletado": "2023-08-25T09:35:04.000Z"
              }
          ],
          "registroActividad": [
              {
                  "id": 11,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 12,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 13,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 14,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 15,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 23,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              }
          ]
      },
      {
          "id": 4,
          "nombre": "samuel",
          "correo": "samuel@gmail.com",
          "insignias": [],
          "registroActividad": [
              {
                  "id": 16,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 17,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 18,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 19,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 20,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              },
              {
                  "id": 24,
                  "estado": false,
                  "progreso": 0,
                  "fechaCompletado": null
              }
          ]
      }
    ]
    ```
  
- **Obtener Usuario por ID**
  - Método: GET
  - Ruta: `/api/usuarios/:id`
  - Ejemplo de lo que viene:
  ```
  {
    "id": 1,
    "nombre": "El Francis",
    "correo": "francisoc@gmail.com"
  }
  ```
  
- **Actualizar Usuario**
  - Método: PATCH
  - Ruta: `/api/usuarios/:id`
  - Cuerpo (Ejemplo):
  ```
  {
    "nombre": "Xavier"
  }
  ```

  
- **Eliminar Usuario**
  - Método: DELETE
  - Ruta: `/api/usuarios/:id`

- **Obtener Todo por ID de Usuario**
  - Método: GET
  - Ruta: `/api/usuarios/todo/:id`
  - Ejemplo de lo que viene: 
  ```
  {
    "id": 1,
    "nombre": "El Francis",
    "correo": "francisoc@gmail.com",
    "insignias": [
        {
            "id": 1,
            "titulo": "Taxi",
            "descripcion": "Has completado 20 viajes en Taxis",
            "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387523/b0jplmahxxv8scq4whc5.png",
            "tipo": "fidelización"
        },
        {
            "id": 2,
            "titulo": "Forma de pago",
            "descripcion": "Usaste una forma diferente de pago",
            "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387567/jnfbva2uszmm10sn2oh4.png",
            "tipo": "fidelización"
        }
    ],
    "cupones": []
  }
  ```
  
- **Obtener Actividad por ID de Usuario**
  - Método: GET
  - Ruta: `/api/usuarios/actividad/:id`
  - Ejemplo de lo que viene:
  ```
  {
    "id": 1,
    "nombre": "El Francis",
    "correo": "francisoc@gmail.com",
    "registroActividad": [
        {
            "id": 1,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 1,
                "nombre": "Pedido de taxis",
                "descripcion": "Completar 20 viajes en taxis",
                "total": 20,
                "insignias": [
                    {
                        "id": 1,
                        "titulo": "Taxi",
                        "descripcion": "Has completado 20 viajes en Taxis",
                        "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387523/b0jplmahxxv8scq4whc5.png",
                        "tipo": "fidelización"
                    }
                ]
            }
        },
        {
            "id": 2,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 2,
                "nombre": "Forma de pago",
                "descripcion": "Usar diferentes formas de pago",
                "total": 5,
                "insignias": [
                    {
                        "id": 2,
                        "titulo": "Forma de pago",
                        "descripcion": "Usaste una forma diferente de pago",
                        "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387567/jnfbva2uszmm10sn2oh4.png",
                        "tipo": "fidelización"
                    }
                ]
            }
        },
        {
            "id": 3,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 3,
                "nombre": "Kilometraje",
                "descripcion": "Alcanzar Kilometraje recorridos",
                "total": 9,
                "insignias": [
                    {
                        "id": 3,
                        "titulo": "Recorrido",
                        "descripcion": "Llegaste a 30 Km recorridos",
                        "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387611/agbsik5jjve730tmpszp.png",
                        "tipo": "fidelización"
                    }
                ]
            }
        },
        {
            "id": 4,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 4,
                "nombre": "Registar numero de telefono",
                "descripcion": "Hacer el registro del numero del telefono",
                "total": 1,
                "insignias": [
                    {
                        "id": 4,
                        "titulo": "Telefono",
                        "descripcion": "Validar número celular",
                        "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387779/ysk2ghr6b2wzzszynh0z.png",
                        "tipo": "usabilidad"
                    }
                ]
            }
        },
        {
            "id": 5,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 5,
                "nombre": "Tarjeta",
                "descripcion": "Agregar tarjeta crédito/debito",
                "total": 1,
                "insignias": [
                    {
                        "id": 5,
                        "titulo": "Tarjeta",
                        "descripcion": "Felicidades agregaste tu tarjeta ",
                        "imagenUrl": "https://res.cloudinary.com/dfw3pshah/image/upload/v1692387835/w4jyooqjkvc9ftgyzokz.png",
                        "tipo": "usabilidad"
                    }
                ]
            }
        },
        {
            "id": 21,
            "estado": false,
            "progreso": 0,
            "fechaCompletado": null,
            "actividad": {
                "id": 6,
                "nombre": "Pedido de delivery",
                "descripcion": "Hacer el pedido de almenos un delivery",
                "total": 20,
                "insignias": []
            }
        }
    ]
  }
  ```

### Actividades

- **Crear Actividad**
  - Método: POST
  - Ruta: `/api/actividades`
  
- **Obtener todas las Actividades**
  - Método: GET
  - Ruta: `/api/actividades`
  
- **Obtener Actividad por ID**
  - Método: GET
  - Ruta: `/api/actividades/:id`
  
- **Actualizar Actividad**
  - Método: PATCH
  - Ruta: `/api/actividades/:id`
  
- **Eliminar Actividad**
  - Método: DELETE
  - Ruta: `/api/actividades/:id`

### Publicidad

- **Crear Publicidad**
  - Método: POST
  - Ruta: `/api/publicidad`
  
- **Obtener toda la Publicidad**
  - Método: GET
  - Ruta: `/api/publicidad`
  
- **Obtener Publicidad por ID**
  - Método: GET
  - Ruta: `/api/publicidad/:id`
  
- **Actualizar Publicidad**
  - Método: PATCH
  - Ruta: `/api/publicidad/:id`
  
- **Eliminar Publicidad**
  - Método: DELETE
  - Ruta: `/api/publicidad/:id`

### Insignias

- **Crear Insignia**
  - Método: POST
  - Ruta: `/api/insignias`
  
- **Obtener todas las Insignias**
  - Método: GET
  - Ruta: `/api/insignias`
  
- **Obtener Insignia por ID**
  - Método: GET
  - Ruta: `/api/insignias/:id`
  
- **Actualizar Insignia**
  - Método: PATCH
  - Ruta: `/api/insignias/:id`
  
- **Eliminar Insignia**
  - Método: DELETE
  - Ruta: `/api/insignias/:id`

- **Obtener Insignias por ID de Usuario**
  - Método: GET
  - Ruta: `/api/insignias/usuario/:userId`

### Beneficios

- **Crear Beneficio**
  - Método: POST
  - Ruta: `/api/beneficios`
  
- **Obtener todos los Beneficios**
  - Método: GET
  - Ruta: `/api/beneficios`
  
- **Obtener Beneficio por ID**
  - Método: GET
  - Ruta: `/api/beneficios/:id`
  
- **Actualizar Beneficio**
  - Método: PATCH
  - Ruta: `/api/beneficios/:id`
  
- **Eliminar Beneficio**
  - Método: DELETE
  - Ruta: `/api/beneficios/:id`

### Registro de Actividad

- **Crear Registro de Actividad**
  - Método: POST
  - Ruta: `/api/registro-actividad`
  
- **Completar Registro de Actividad**
  - Método: PATCH
  - Ruta: `/api/registro-actividad/:id/completar`
  
- **Actualizar Registro de Actividad por ID de Usuario y Actividad**
  - Método: PATCH
  - Ruta: `/api/registro-actividad/:userId/actividad/:actividadId`

### Registro de Insignia

- **Crear Registro de Insignia**
  - Método: POST
  - Ruta: `/api/registro-insignia`

### Registro de Beneficio

- **Crear Registro de Beneficio**
  - Método: POST
  - Ruta: `/api/registro-beneficio`
