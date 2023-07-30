from django.db import models

class MovieApp(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    
class UserSavedMovies(models.Model):
    Actors = models.CharField(max_length=500)
    Awards = models.CharField(max_length=500)
    BoxOffice = models.IntegerField()
    Country = models.CharField(max_length=80)
    DVD = models.DateTimeField()
    Director = models.CharField(max_length=100)
    Genre = models.CharField(max_length=200)
    Language = models.CharField(max_length=200)
    Metascore = models.IntegerField()
    Plot = models.CharField(max_length=700)
    Poster = models.CharField(max_length=200)
    Production = models.CharField(max_length=100)
    Rated = models.CharField(max_length=10)
    Ratings = models.CharField(max_length=700)
    Released = models.DateTimeField()
    Response = models.BooleanField(default=False)
    Runtime = models.CharField(max_length=10)
    Title = models.CharField(max_length=225)
    Type = models.CharField(max_length=50)
    Website = models.CharField(max_length=25)
    Writer = models.CharField(max_length=100)
    Year = models.IntegerField()
    imdbID = models.CharField(max_length=25)
    imdbRating = models.FloatField(max_length=100)
    imdbVotes = models.FloatField(max_length=50)
    isSaved = models.BooleanField(default=False)


    def __str__(self) -> str:
        return self.Title