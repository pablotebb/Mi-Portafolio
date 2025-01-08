Si borras el proyecto de tu disco duro y luego quieres recuperarlo desde GitHub, puedes hacerlo siguiendo estos pasos:

1. **Clonar el repositorio de GitHub:**

   Primero, clona el repositorio desde GitHub a tu máquina local:

   ```sh
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```

   Reemplaza `https://github.com/tu_usuario/tu_repositorio.git` con la URL de tu repositorio.

2. **Navegar al directorio del proyecto:**

   ```sh
   cd tu_repositorio
   ```

3. **Crear y activar un entorno virtual:**

   Crea un entorno virtual en el directorio del proyecto:

   ```sh
   python -m venv env
   ```

   Activa el entorno virtual:

   - En Windows:

     ```sh
     .\env\Scripts\activate
     ```

   - En macOS/Linux:

     ```sh
     source env/bin/activate
     ```

4. **Instalar las dependencias:**

   Instala todas las dependencias listadas en `requirements.txt`:

   ```sh
   pip install -r requirements.txt
   ```

5. **Restaurar la base de datos y las migraciones:**

   Si tienes el archivo de la base de datos (`db.sqlite3` u otro) en el repositorio, debería haberse descargado al clonar el proyecto. Si no, tendrás que aplicar las migraciones para restaurar la estructura de la base de datos:

   ```sh
   python manage.py migrate
   ```

   Si tu proyecto requiere datos iniciales o de prueba, puedes cargarlos usando fixtures o un script de carga de datos si lo has configurado anteriormente:

   ```sh
   python manage.py loaddata nombre_del_fixture.json
   ```

6. **Crear un superusuario (opcional):**

   Si necesitas acceder al panel de administración de Django y no tienes un superusuario en la base de datos, crea uno:

   ```sh
   python manage.py createsuperuser
   ```

7. **Ejecutar el servidor de desarrollo:**

   Finalmente, ejecuta el servidor de desarrollo para asegurarte de que todo funcione correctamente:

   ```sh
   python manage.py runserver
   ```

### Resumen de comandos:

```sh
# Clonar el repositorio
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio

# Crear y activar un entorno virtual
python -m venv env
# En Windows
.\env\Scripts\activate
# En macOS/Linux
source env/bin/activate

# Instalar las dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py migrate

# Cargar datos iniciales (opcional)
python manage.py loaddata nombre_del_fixture.json

# Crear un superusuario (opcional)
python manage.py createsuperuser

# Ejecutar el servidor de desarrollo
python manage.py runserver
```

Siguiendo estos pasos, podrás recuperar tu proyecto de Django desde GitHub, recrear el entorno virtual, reinstalar las dependencias y restaurar la base de datos para que todo funcione como antes.
