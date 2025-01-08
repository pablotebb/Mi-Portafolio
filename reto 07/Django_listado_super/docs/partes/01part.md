## PASOS:

1. Tenemos instalado Django?

   > py -m django --version

   (Mirar FAQs, si quieres instalar Django desde una virtualización)

   [FAQs](../Faq.md)

2. Modificamos proyectoSuper/settings.py

   ```python
   INSTALLED_APPS = [
    'appSuper.apps.AppsuperConfig',
   ...
   ]
   ```

3. Creamos appSuper/models.py

   ```python
   from django.core.exceptions import ValidationError
   from django.db import models

   def validate_three_digits(value):
      if value < 0 or value > 999:
        raise ValidationError('Asegurate de que el valor esté entre 0 y 999.')

   class Item(models.Model):
      s_name = models.CharField(max_length=100)
      d_price = models.DecimalField(max_digits=10, decimal_places=2)
      i_quantity = models.IntegerField(validators=[validate_three_digits], default=0)
      b_checked = models.BooleanField(default=False)

      def __str__(self):
        return self.s_name
   ```

4. Creamos el formulario appSuper/forms.py

```python
from django import forms
from .models import Item

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['s_name', 'd_price', 'i_quantity']
        widgets = {
            's_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
            'd_price': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Precio'}),
            'i_quantity': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Cantidad'}),
        }

class ItemCheckboxForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['b_checked']
        widgets = {
            'b_checked': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

```

5. Creamos la vista appSuper/views.py

   ```python
   from django.shortcuts import render, redirect, get_object_or_404
   from .models import Item
   from .forms import ItemForm

   def index(request):
       items = Item.objects.all()
       if request.method == 'POST':
           form = ItemForm(request.POST)
           if form.is_valid():
               form.save()
               return redirect('index')
       else:
           form = ItemForm()
       return render(request, 'appSuper/index.html', {'form': form, 'items': items})

   def edit_item(request, pk):
       item = get_object_or_404(Item, pk=pk)
       if request.method == 'POST':
           form = ItemForm(request.POST, instance=item)
           if form.is_valid():
               form.save()
               return redirect('index')
       else:
           form = ItemForm(instance=item)
       return render(request, 'appSuper/edit_item.html', {'form': form})

   def delete_item(request, pk):
       item = get_object_or_404(Item, pk=pk)
       if request.method == 'POST':
           item.delete()
           return redirect('index')
       return render(request, 'appSuper/delete_item.html', {'item': item})

   def toggle_check(request, pk):
       item = get_object_or_404(Item, pk=pk)
       item.b_checked = not item.b_checked
       item.save()
       return redirect('index')

   ```

6) Creamos appSuper/urls.py

   ```python
   from django.urls import path
   from . import views

   urlpatterns = [
       path('', views.index, name='index'),
       path('edit/<int:pk>/', views.edit_item, name='edit_item'),
       path('delete/<int:pk>/', views.delete_item, name='delete_item'),
       path('toggle/<int:pk>/', views.toggle_check, name='toggle_check'),
   ]

   ```

7) Modificamos proyectoSuper/urls.py

   ```python
   from django.contrib import admin
   from django.urls import include, path

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('', include('appSuper.urls')),
   ]

   ```

8) Creamos las plantillas: appSuper/templates/appSuper/

   ```python
   INDEX.HTML

   <!DOCTYPE html>
   <html>
   <head>
    <title>Lista compra</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .checked { text-decoration: line-through; }
    </style>
   </head>
   <body>
    <div class="container">
        <h1>Lista compra</h1>
        <div class="row">
            <div class="col-md-4">
                <h2>Formulario</h2>
                <form method="post">
                    {% csrf_token %}
                    <div class="form-group">
                        {{ form.s_name }}
                    </div>
                    <div class="form-group">
                        {{ form.d_price }}
                    </div>
                    <div class="form-group">
                        {{ form.i_quantity }}
                    </div>
                    <button type="submit" class="btn btn-primary">Aceptar</button>
                </form>
            </div>
            <div class="col-md-8">
                <h2>Lista</h2>
                <ul class="list-group">
                    {% for item in items %}
                    <li class="list-group-item {% if item.b_checked %}checked{% endif %}">
                        <form method="post" action="{% url 'toggle_check' item.pk %}">
                            {% csrf_token %}
                            <input type="checkbox" class="form-check-input" onclick="this.form.submit();" {% if item.b_checked %}checked{% endif %}>
                            Nombre: {{ item.s_name }} | Precio: ${{ item.d_price }} | Cantidad: {{ item.i_quantity }}
                        </form>
                        <span class="float-right">
                            <a href="{% url 'edit_item' item.pk %}" class="btn btn-secondary btn-sm">Editar</a>
                            <a href="{% url 'delete_item' item.pk %}" class="btn btn-danger btn-sm">Borrar</a>
                        </span>
                    </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    </div>
   </body>
   </html>

   ```

   ```python
   EDIT_ITEM.HTML

   <!DOCTYPE html>
   <html>
   <head>
       <title>Editar artículo</title>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
   </head>
   <body>
       <div class="container">
           <h1>Editar artículo</h1>
           <form method="post">
               {% csrf_token %}
               {{ form.as_p }}
               <button type="submit" class="btn btn-primary">Grabar</button>
               <a href="{% url 'index' %}" class="btn btn-secondary">Cancelar</a>
           </form>
       </div>
   </body>
   </html>

   ```

   ```python
   DELETE_ITEM.HTML

   <!DOCTYPE html>
   <html>
   <head>
     <title>Borrar artículo</title>
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
   </head>
   <body>
     <div class="container">
         <h1>Borrar artículo</h1>
         <p>Estás seguro que quieres borrar "{{ item.s_name }}"?</p>
         <form method="post">
             {% csrf_token %}
             <button type="submit" class="btn btn-danger">Borrar</button>
             <a href="{% url 'index' %}" class="btn btn-secondary">Cancelar</a>
         </form>
     </div>
   </body>
   </html>

   ```

9. Hacemos las migraciones, etc...

   ```python
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver

   ```
