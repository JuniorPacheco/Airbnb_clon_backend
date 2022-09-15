# Rutas

- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me

- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
- - GET 

- /api/v1/users/:id
- - GET  
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/users/me
- - GET
- - PUT
- - PATCH
- - DELETE

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST 
- - PATCH

# Paths de mi usuario a traves de  mi aplicacion

[✅] registrar mi usuario
[✅] loggear mi usuario

### Usuario sin sesion iniciada

1. Ver los lugares
2. puede ver la informacion de un lugar

### Guest

1. Ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Cancelar su reservacion
4. Dar un score una vez finalizada la reservacion

### Host

1. Ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Cancelar su reservacion
5. Dar un score una vez finalizada la reservacion
6. Crear lugares
7. Cancelar reservaciones en los lugares donde es host
8. Puede ver perfiles de usuario
9. Puede ver todos los lugares que le pertenecen
10. Editar el lugar
11. Eliminar el lugar

### Admin

1. Ver los lugares
2. puede ver la informacion de un lugar
3. Reservar
4. Dar un score una vez finalizada la reservacion
5. Puede ver perfiles de usuario
6. Editar el lugar
7. Eliminar el lugar
8. Modificar roles
9. Eliminar un usuarion
10. Modificar un usuario
11. Ver lugares de los hosts


### Accommodations

/api/v1/accommodations

/
- GET
- POST

/:id
- GET
- DELETE
- PUT
- PATCH

/:id/available/?arrival=value&departure=value
- GET 

/api/v1/reservations/
- GET (Admin) Obtener todas las reservaciones
- POST (Admin, host, guest) hacer una reservacion

/api/v1/reservations/:id
- GET (Admin, host y guest) El admin puede obtener cualquier reservacion y los otros dos solo pueden obtener reservacion si son los creadores de ella
- PUT (host y guest) Pueden editar el score solo si ellos hicieron la reserva
- DELETE (host y guest) Pueden eliminar la reservacion pero solo sera un cambio en isCanceled a true, igual quedara en el historial

/api/v1/reservations/me
- GET (Guest, host y admin) Obtiene todas las reservaciones de la persona logeada

# Ejemplo de documentacion 
https://petstore.swagger.io/v2/swagger.json