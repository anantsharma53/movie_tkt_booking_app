# Generated by Django 4.1.9 on 2023-08-22 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='theater',
            name='first_show',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='theater',
            name='second_show',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='theater',
            name='third_show',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
