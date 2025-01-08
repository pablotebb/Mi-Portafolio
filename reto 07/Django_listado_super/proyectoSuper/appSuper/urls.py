from django.urls import path  # Importa la función path de Django para definir rutas URL
from . import views  # Importa las vistas desde el directorio actual (la aplicación)

# Lista de URL conf para la aplicación
urlpatterns = [
    # Ruta URL para la página de inicio
    path('', views.index, name='index'),
    
    # Ruta URL para editar un elemento con un ID específico
    path('edit/<int:pk>/', views.edit_item, name='edit_item'),
    # - '<int:pk>': Define un segmento de la URL que captura un entero y lo pasa como argumento llamado 'pk' a la vista
    # - 'views.edit_item': Llama a la función 'edit_item' definida en el archivo views.py
    
    # Ruta URL para eliminar un elemento con un ID específico
    path('delete/<int:pk>/', views.delete_item, name='delete_item'),
    # - '<int:pk>': Define un segmento de la URL que captura un entero y lo pasa como argumento llamado 'pk' a la vista
    # - 'views.delete_item': Llama a la función 'delete_item' definida en el archivo views.py
    
    # Ruta URL para cambiar el estado de verificación de un elemento con un ID específico
    path('toggle/<int:pk>/', views.toggle_check, name='toggle_check'),
    # - '<int:pk>': Define un segmento de la URL que captura un entero y lo pasa como argumento llamado 'pk' a la vista
    # - 'views.toggle_check': Llama a la función 'toggle_check' definida en el archivo views.py
]
