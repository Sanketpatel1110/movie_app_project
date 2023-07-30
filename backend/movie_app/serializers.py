from rest_framework import serializers
from .models import MovieApp, UserSavedMovies
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class MovieSerializers(serializers.ModelSerializer):
    class Meta:
        model = MovieApp
        fields = ('id', 'title', 'description', 'completed')

class UserSavedMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSavedMovies
        fields = ('id', 'Actors', 'Awards', 'BoxOffice', 'Country', 'DVD',
                  'Director', 'Genre', 'Language', 'Metascore', 'Plot', 'Poster', 'Production', 'Rated', 'Ratings', 'Released',
                  'Response', 'Runtime', 'Title', 'Type', 'Website', 'Writer', 'Year', 'imdbID', 'imdbRating', 'imdbVotes',
                  'isSaved')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user    