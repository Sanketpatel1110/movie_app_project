# Generated by Django 4.2.3 on 2023-07-30 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie_app', '0003_usersavedmovies'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersavedmovies',
            name='BoxOffice',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Metascore',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='usersavedmovies',
            name='Year',
            field=models.IntegerField(),
        ),
    ]
