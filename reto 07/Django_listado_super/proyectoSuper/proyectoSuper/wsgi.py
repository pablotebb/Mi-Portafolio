"""
WSGI config for proyectoSuper project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# Establece la configuración del módulo Django.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proyectoSuper.settings')

# Obtiene la aplicación WSGI para desplegar.
application = get_wsgi_application()
