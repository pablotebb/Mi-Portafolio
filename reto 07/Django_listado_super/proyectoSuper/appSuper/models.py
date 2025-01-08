from django.core.exceptions import ValidationError  # Importa la excepción de validación de Django
from django.db import models  # Importa el módulo de modelos de Django

# Función de validación personalizada que verifica que el valor esté entre 0 y 999
def validate_three_digits(value):
    if value < 0 or value > 999:
        raise ValidationError('Asegúrate de tener este valor entre 0 y 999.')

# Definición del modelo Item
class Item(models.Model):
    # Define los campos del modelo
    
    # Campo de texto para el nombre del ítem
    s_name = models.CharField(max_length=100)
    
    # Campo decimal para el precio del ítem
    d_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Campo entero para la cantidad del ítem con la validación personalizada
    i_quantity = models.IntegerField(validators=[validate_three_digits], default=0)
    
    # Campo booleano para verificar si el ítem está marcado o no
    b_checked = models.BooleanField(default=False)

    # Método que devuelve una representación legible del objeto Item
    def __str__(self):
        return self.s_name
