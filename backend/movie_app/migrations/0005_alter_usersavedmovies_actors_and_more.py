# Generated by Django 4.2.3 on 2023-07-30 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie_app', '0004_alter_usersavedmovies_boxoffice_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Actors',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Awards',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='BoxOffice',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Country',
            field=models.CharField(blank=True, max_length=80),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='DVD',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Director',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Genre',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Language',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Metascore',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Production',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Rated',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Ratings',
            field=models.CharField(blank=True, max_length=700),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Released',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Response',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Runtime',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Type',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Website',
            field=models.CharField(blank=True, max_length=25),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Writer',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Year',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='imdbID',
            field=models.CharField(blank=True, max_length=25),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='imdbRating',
            field=models.FloatField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='imdbVotes',
            field=models.FloatField(blank=True, max_length=50),
        ),
    ]