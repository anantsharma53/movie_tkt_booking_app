# Generated by Django 4.1.9 on 2023-08-21 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0002_remove_seat_seat_number_bookingseat'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookingseat',
            old_name='seat_number',
            new_name='seat_numbers',
        ),
    ]