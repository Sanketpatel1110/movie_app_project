from django.db import models

class MovieApp(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    
class UserSavedMovies(models.Model):
    Actors = models.CharField(max_length=500, blank=True)
    Awards = models.CharField(max_length=500,blank=True)
    BoxOffice = models.CharField(max_length=50, blank=True)
    Country = models.CharField(max_length=80, blank=True)
    DVD = models.CharField(max_length=20,blank=True)
    Director = models.CharField(max_length=100, blank=True)
    Genre = models.CharField(max_length=200, blank=True)
    Language = models.CharField(max_length=200, blank=True)
    Metascore = models.CharField(max_length=20, blank=True)
    Plot = models.CharField(max_length=2000)
    Poster = models.CharField(max_length=200)
    Production = models.CharField(max_length=100, blank=True)
    Rated = models.CharField(max_length=10, blank=True)
    Ratings = models.CharField(max_length=700, blank=True)
    Released = models.CharField(max_length=20, blank=True)
    Response = models.BooleanField(default=False, blank=True)
    Runtime = models.CharField(max_length=10,blank=True)
    Title = models.CharField(max_length=225)
    Type = models.CharField(max_length=50, blank=True)
    Website = models.CharField(max_length=25, blank=True)
    Writer = models.CharField(max_length=100, blank=True)
    Year = models.CharField(max_length=10,blank=True)
    imdbID = models.CharField(max_length=25, blank=True)
    imdbRating = models.CharField(max_length=100,blank=True)
    imdbVotes = models.CharField(max_length=50, blank=True)
    isSaved = models.BooleanField(default=False)


    def __str__(self) -> str:
        return self.Title