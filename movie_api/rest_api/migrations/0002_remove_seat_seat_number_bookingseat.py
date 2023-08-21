# Generated by Django 4.1.9 on 2023-08-21 09:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seat',
            name='seat_number',
        ),
        migrations.CreateModel(
            name='BookingSeat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seat_number', models.CharField(max_length=10)),
                ('seat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.seat')),
            ],
        ),
    ]