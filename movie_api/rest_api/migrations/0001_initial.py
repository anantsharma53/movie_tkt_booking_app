# Generated by Django 4.1.9 on 2023-08-14 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('mobile_number', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=100)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]