## INSTALACIÓN:

1. Crea un directorio, y luego:

> git clone https://github.com/pablotebb/Django_lista_super.git

> cd nombre-del-repositorio

2. Creamos y activamos un entorno virtual

```python
python -m venv entornoSuper
source entornoSuper/bin/activate # En Windows usa: entornoSuper\Scripts\activate
```

3. Instalamos Django (si no hay dependencias) y si no hacemos las dependencias (si tenemos el archivo requirements.txt)

> pip install django
> <br />
> pip install -r requirements.txt

4.  Realizamos las migraciones

```python
python manage.py makemigrations appSuper
python manage.py migrate
```

5. Lanzamos la aplicación:

> python manage.py runserver
