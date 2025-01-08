from django.shortcuts import render, redirect, get_object_or_404  # Importación de funciones necesarias
from .models import Item  # Importación del modelo Item desde el mismo directorio
from .forms import ItemForm  # Importación del formulario ItemForm desde el mismo directorio

def index(request):
    # Obtiene todos los elementos de la base de datos
    items = Item.objects.all()
    
    # Verifica si la solicitud es de tipo POST
    if request.method == 'POST':
        # Si es una solicitud POST, crea un formulario con los datos recibidos
        form = ItemForm(request.POST)
        # Verifica si el formulario es válido
        if form.is_valid():
            # Si el formulario es válido, guarda los datos en la base de datos
            form.save()
            # Redirecciona al usuario a la página de inicio ('index')
            return redirect('index')
    else:
        # Si la solicitud no es de tipo POST, crea un formulario vacío
        form = ItemForm()
    
    # Renderiza la plantilla 'index.html' con el formulario y los elementos obtenidos
    return render(request, 'appSuper/index.html', {'form': form, 'items': items})

def edit_item(request, pk):
    # Obtiene el elemento de la base de datos con el ID especificado (pk)
    item = get_object_or_404(Item, pk=pk)
    
    # Verifica si la solicitud es de tipo POST
    if request.method == 'POST':
        # Si es una solicitud POST, crea un formulario con los datos recibidos y la instancia del elemento
        form = ItemForm(request.POST, instance=item)
        # Verifica si el formulario es válido
        if form.is_valid():
            # Si el formulario es válido, guarda los datos actualizados en la base de datos
            form.save()
            # Redirecciona al usuario a la página de inicio ('index')
            return redirect('index')
    else:
        # Si la solicitud no es de tipo POST, crea un formulario con la instancia del elemento
        form = ItemForm(instance=item)
    
    # Renderiza la plantilla 'edit_item.html' con el formulario y el elemento obtenido
    return render(request, 'appSuper/edit_item.html', {'form': form})

def delete_item(request, pk):
    # Obtiene el elemento de la base de datos con el ID especificado (pk)
    item = get_object_or_404(Item, pk=pk)
    
    # Verifica si la solicitud es de tipo POST
    if request.method == 'POST':
        # Si es una solicitud POST, elimina el elemento de la base de datos
        item.delete()
        # Redirecciona al usuario a la página de inicio ('index')
        return redirect('index')
    
    # Renderiza la plantilla 'delete_item.html' con el elemento obtenido
    return render(request, 'appSuper/delete_item.html', {'item': item})

def toggle_check(request, pk):
    # Obtiene el elemento de la base de datos con el ID especificado (pk)
    item = get_object_or_404(Item, pk=pk)
    
    # Cambia el estado de la propiedad 'b_checked' del elemento
    item.b_checked = not item.b_checked
    # Guarda los cambios en la base de datos
    item.save()
    
    # Redirecciona al usuario a la página de inicio ('index')
    return redirect('index')
