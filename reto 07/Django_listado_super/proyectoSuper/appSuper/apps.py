from django.apps import AppConfig  # Importa la clase AppConfig de Django

class AppsuperConfig(AppConfig):
    # Define la configuración de la aplicación 'appSuper'
    
    # Especifica el campo automático predeterminado para los modelos de la base de datos
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Define el nombre de la aplicación
    name = 'appSuper'
