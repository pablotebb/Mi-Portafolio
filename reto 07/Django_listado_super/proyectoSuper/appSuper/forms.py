from django import forms  # Importa el módulo forms de Django
from .models import Item  # Importa el modelo Item desde el mismo directorio

class ItemForm(forms.ModelForm):
    # Define un formulario para el modelo Item
    
    class Meta:
        # Define la clase Meta para configurar el formulario
        
        model = Item  # Especifica el modelo asociado al formulario (Item)
        
        # Especifica los campos del modelo que estarán presentes en el formulario
        fields = ['s_name', 'd_price', 'i_quantity']
        
        # Define los widgets para personalizar la apariencia de los campos del formulario
        widgets = {
            's_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
            'd_price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Precio'}),
            'i_quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Cantidad'}),
        }

class ItemCheckboxForm(forms.ModelForm):
    # Define un formulario para el modelo Item con un solo campo para una casilla de verificación
    
    class Meta:
        # Define la clase Meta para configurar el formulario
        
        model = Item  # Especifica el modelo asociado al formulario (Item)
        
        # Especifica los campos del modelo que estarán presentes en el formulario
        fields = ['b_checked']
        
        # Define los widgets para personalizar la apariencia del campo de casilla de verificación
        widgets = {
            'b_checked': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
