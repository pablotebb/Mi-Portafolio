Para instalar Django y crear una aplicación usando un entorno virtual, sigue estos pasos:

1. **Instalar Python y pip**:
   Asegúrate de tener Python y pip instalados en tu sistema. Puedes verificarlo ejecutando:

   ```sh
   python --version
   pip --version
   ```

   Si no están instalados, puedes descargarlos e instalarlos desde [python.org](https://www.python.org/downloads/).

2. **Crear un entorno virtual**:
   Un entorno virtual te permite tener un espacio aislado para tus proyectos, evitando conflictos con otras bibliotecas y proyectos. Para crear un entorno virtual, usa `venv`:

   ```sh
   python -m venv nombre_del_entorno
   ```

   Por ejemplo:

   ```sh
   python -m venv mi_entorno
   ```

3. **Activar el entorno virtual**:
   Activa el entorno virtual para comenzar a trabajar en él. La forma de hacerlo depende del sistema operativo:

   - En Windows:

     ```sh
     .\mi_entorno\Scripts\activate
     ```

   - En macOS y Linux ( **Ojo** si estás en Bash es linux):

     ```sh
     source mi_entorno/[Scripts o bin]/activate
     ```

   Al activarse correctamente, deberías ver el nombre del entorno al principio de tu línea de comandos.

4. **Instalar Django**:
   Con el entorno virtual activado, instala Django usando pip:

   ```sh
   pip install django
   ```

5. **Crear un proyecto Django**:
   Una vez instalado Django, puedes crear un nuevo proyecto ejecutando:

   ```sh
   django-admin startproject nombre_del_proyecto
   ```

   Por ejemplo:

   ```sh
   django-admin startproject mi_proyecto
   ```

6. **Navegar al directorio del proyecto**:
   Cambia al directorio del proyecto recién creado:

   ```sh
   cd mi_proyecto
   ```

7. **Crear una aplicación dentro del proyecto**:
   Dentro del directorio del proyecto, crea una nueva aplicación. Las aplicaciones son componentes individuales de un proyecto Django que realizan tareas específicas:

   ```sh
   python manage.py startapp nombre_de_la_aplicacion
   ```

   Por ejemplo:

   ```sh
   python manage.py startapp mi_aplicacion
   ```

8. **Configurar la aplicación en el proyecto**:
   Para que Django reconozca la nueva aplicación, debes añadirla a la lista de `INSTALLED_APPS` en el archivo `settings.py` del proyecto. Abre `mi_proyecto/settings.py` y agrega `'mi_aplicacion',` en la sección `INSTALLED_APPS`:

   ```python
   INSTALLED_APPS = [
       ...
       'mi_aplicacion',
   ]
   ```

9. **Migraciones iniciales**:
   Ejecuta las migraciones iniciales para configurar la base de datos:

   ```sh
   python manage.py migrate
   ```

10. **Ejecutar el servidor de desarrollo**:
    Para verificar que todo está configurado correctamente, inicia el servidor de desarrollo de Django:

    ```sh
    python manage.py runserver
    ```

    Abre tu navegador y ve a `http://127.0.0.1:8000/`. Deberías ver la página de bienvenida de Django.

Con estos pasos, habrás instalado Django, creado un proyecto, y añadido una aplicación dentro de ese proyecto. Ahora puedes empezar a desarrollar tu aplicación Django.
