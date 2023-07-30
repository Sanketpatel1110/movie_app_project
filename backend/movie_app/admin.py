from django.contrib import admin
from .models import MovieApp, UserSavedMovies

class MovieAppAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")

class UserSavedMoviesAdmin(admin.ModelAdmin):
    list_display = ('Actors', 'Awards', 'BoxOffice', 'Country', 'DVD',
                  'Director', 'Genre', 'Language', 'Metascore', 'Plot', 'Poster', 'Production', 'Rated', 'Ratings', 'Released',
                  'Response', 'Runtime', 'Title', 'Type', 'Website', 'Writer', 'Year', 'imdbID', 'imdbRating', 'imdbVotes',
                  'isSaved')

#Register Model
admin.site.register(MovieApp, MovieAppAdmin)
admin.site.register(UserSavedMovies, UserSavedMoviesAdmin)