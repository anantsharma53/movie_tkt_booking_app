# Generated by Django 4.1.9 on 2023-08-21 11:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0005_delete_bookingseat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seat',
            name='seat_numbers',
        ),
        migrations.CreateModel(
            name='BookingSeat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat_numbers', models.CharField(max_length=10)),
                ('seat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.seat')),
            ],
        ),
    ]