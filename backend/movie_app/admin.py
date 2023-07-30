from django.contrib import admin
from .models import MovieApp

class MovieAppAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")

#Register Model
admin.site.register(MovieApp, MovieAppAdmin)