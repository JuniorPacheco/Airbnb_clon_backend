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
3. reservar
4. Dar un score una vez finalizada la reservacion
5. Crear lugares
6. Cancelar reservaciones en los lugares donde es host
7. Puede ver perfiles de usuario
8. Puede ver todos los lugares que le pertenecen
9. editar el lugar
10. Eliminar el lugar

### Admin

1. Ver los lugares
2. puede ver la informacion de un lugar
3. reservar
4. Dar un score una vez finalizada la reservacion
5. Puede ver perfiles de usuario
6. editar el lugar
7. Eliminar el lugar
8. Modificar roles
9. Eliminar un usuario
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

# Ejemplo de documentacion 
https://petstore.swagger.io/v2/swagger.json